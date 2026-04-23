const mongoose = require("mongoose");
const Accommodation = require("../models/Accommodation");
const User = require("../models/User");
const UserActivity = require("../models/UserActivity");

/**
 * Central place to tune the “AI-inspired” rule engine for demos and iteration.
 */
const WEIGHTS = {
  SAME_LOCATION: 30,
  SAME_PROPERTY_TYPE: 20,
  SIMILAR_PRICE: 15,
  GUEST_CAPACITY: 10,
  PER_SHARED_AMENITY: 5,
  HIGH_RATING_FULL: 10,
  HIGH_RATING_PARTIAL: 5,
  FEATURED: 5,
};

const MAX_CANDIDATES = 200;
const MAX_RECENT_VIEWS = 25;
const MAX_SEARCH_EVENTS = 15;
const PRICE_TOLERANCE = 0.25;

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function locationsMatch(a, b) {
  const na = normalizeText(a);
  const nb = normalizeText(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  return na.includes(nb) || nb.includes(na);
}

function propertyTypesMatch(a, b) {
  return normalizeText(a) === normalizeText(b) && normalizeText(a).length > 0;
}

function similarPrice(refPrice, candPrice) {
  const ref = Number(refPrice);
  const cand = Number(candPrice);
  if (!Number.isFinite(ref) || ref <= 0) {
    return Number.isFinite(cand) && cand > 0;
  }
  const low = ref * (1 - PRICE_TOLERANCE);
  const high = ref * (1 + PRICE_TOLERANCE);
  return cand >= low && cand <= high;
}

function guestsCompatible(refGuests, candGuests) {
  const r = Number(refGuests) || 1;
  const c = Number(candGuests) || 1;
  if (Math.abs(r - c) <= 1) return true;
  if (r >= 5 && c >= 5) return true;
  return false;
}

function sharedAmenityCount(refAmenities, candAmenities) {
  const refSet = new Set(
    (refAmenities || []).map((x) => normalizeText(x)).filter(Boolean),
  );
  let count = 0;
  for (const a of candAmenities || []) {
    const key = normalizeText(a);
    if (key && refSet.has(key)) count += 1;
  }
  return count;
}

function ratingBonus(rating) {
  const r = Number(rating) || 0;
  if (r >= 4.5) return WEIGHTS.HIGH_RATING_FULL;
  if (r >= 4.0) return WEIGHTS.HIGH_RATING_PARTIAL;
  return 0;
}

function featuredBonus(isFeatured) {
  return isFeatured ? WEIGHTS.FEATURED : 0;
}

/**
 * Scores how well candidate matches a single reference profile (real listing or search-derived stub).
 */
function scoreAgainstReference(candidate, reference) {
  let score = 0;
  const reasons = [];

  if (reference.location && locationsMatch(reference.location, candidate.location)) {
    score += WEIGHTS.SAME_LOCATION;
    reasons.push("location");
  }
  if (
    reference.propertyType &&
    propertyTypesMatch(reference.propertyType, candidate.propertyType)
  ) {
    score += WEIGHTS.SAME_PROPERTY_TYPE;
    reasons.push("propertyType");
  }
  if (
    Number.isFinite(Number(reference.pricePerNight)) &&
    similarPrice(reference.pricePerNight, candidate.pricePerNight)
  ) {
    score += WEIGHTS.SIMILAR_PRICE;
    reasons.push("price");
  }
  if (guestsCompatible(reference.guests, candidate.guests)) {
    score += WEIGHTS.GUEST_CAPACITY;
    reasons.push("guests");
  }

  const amenityMatches = sharedAmenityCount(reference.amenities, candidate.amenities);
  if (amenityMatches > 0) {
    const pts = amenityMatches * WEIGHTS.PER_SHARED_AMENITY;
    score += pts;
    reasons.push(`amenities:${amenityMatches}`);
  }

  return { score, reasons };
}

function bestScoreAcrossReferences(candidate, references) {
  let best = 0;
  let bestReasons = [];
  for (const ref of references) {
    const { score, reasons } = scoreAgainstReference(candidate, ref);
    if (score > best) {
      best = score;
      bestReasons = reasons;
    }
  }
  return { score: best, reasons: bestReasons };
}

function toPlainAccommodation(doc) {
  return doc.toObject ? doc.toObject() : doc;
}

function buildSearchReference(event) {
  const minB = Number(event.minBudget);
  const maxB = Number(event.maxBudget);
  let midPrice;
  if (Number.isFinite(minB) && Number.isFinite(maxB) && maxB >= minB) {
    midPrice = (minB + maxB) / 2;
  } else if (Number.isFinite(minB)) {
    midPrice = minB;
  } else if (Number.isFinite(maxB)) {
    midPrice = maxB;
  } else {
    midPrice = undefined;
  }

  return {
    location: event.city || "",
    propertyType: "",
    pricePerNight: midPrice,
    guests: Number.isFinite(Number(event.guests)) ? Number(event.guests) : undefined,
    amenities: [],
  };
}

async function loadReferencesForUser(userId) {
  const references = [];

  const user = await User.findById(userId).populate({
    path: "favourites",
    match: { status: "active" },
  });

  if (user && Array.isArray(user.favourites)) {
    for (const fav of user.favourites) {
      if (fav && fav._id) references.push(toPlainAccommodation(fav));
    }
  }

  const activity = await UserActivity.findOne({ user: userId })
    .populate({
      path: "recentViews.accommodation",
      match: { status: "active" },
    })
    .lean();

  if (activity && Array.isArray(activity.recentViews)) {
    const seen = new Set(references.map((r) => String(r._id)));
    for (const row of activity.recentViews) {
      const acc = row.accommodation;
      if (!acc || !acc._id) continue;
      const id = String(acc._id);
      if (seen.has(id)) continue;
      seen.add(id);
      references.push(acc);
    }
  }

  if (activity && Array.isArray(activity.searchHistory)) {
    for (const ev of activity.searchHistory.slice(0, 8)) {
      references.push(buildSearchReference(ev));
    }
  }

  return references;
}

async function fetchActiveCandidates(extraFilter = {}) {
  return Accommodation.find({ status: "active", ...extraFilter })
    .sort({ rating: -1, createdAt: -1 })
    .limit(MAX_CANDIDATES)
    .lean();
}

function attachScores(candidates, references, excludeIds = new Set()) {
  const rows = [];
  for (const c of candidates) {
    const id = String(c._id);
    if (excludeIds.has(id)) continue;

    if (!references.length) {
      const popularity =
        (Number(c.rating) || 0) * 8 +
        featuredBonus(Boolean(c.isFeatured)) +
        ratingBonus(c.rating);
      rows.push({
        ...c,
        recommendationScore: Math.round(popularity * 10) / 10,
        matchReasons: ["popular"],
      });
      continue;
    }

    const { score, reasons } = bestScoreAcrossReferences(c, references);
    const quality =
      ratingBonus(c.rating) +
      featuredBonus(Boolean(c.isFeatured)) +
      (Number(c.rating) || 0) * 1.5;
    const boosted = score + quality;

    const mergedReasons = [...reasons];
    if (ratingBonus(c.rating) > 0) mergedReasons.push("rating");
    if (featuredBonus(Boolean(c.isFeatured)) > 0) mergedReasons.push("featured");

    rows.push({
      ...c,
      recommendationScore: Math.round(boosted * 10) / 10,
      matchReasons: mergedReasons,
    });
  }

  rows.sort((a, b) => b.recommendationScore - a.recommendationScore);
  return rows;
}

function parseLimit(raw, fallback = 8) {
  const n = parseInt(String(raw ?? ""), 10);
  if (Number.isNaN(n) || n <= 0) return fallback;
  return Math.min(n, 24);
}

/**
 * Guest session: featured + highly rated + optional query alignment.
 */
async function getGuestRecommendations({
  city,
  guests,
  minBudget,
  maxBudget,
  limit,
}) {
  const references = [];
  const cityStr = city && String(city).trim();
  if (cityStr) {
    references.push(
      buildSearchReference({
        city: cityStr,
        guests,
        minBudget,
        maxBudget,
      }),
    );
  }

  const guestNum = Number(guests);
  const filter = {};
  if (Number.isFinite(guestNum) && guestNum > 0) {
    filter.guests = { $gte: guestNum };
  }

  const candidates = await fetchActiveCandidates(filter);
  const scored = attachScores(candidates, references, new Set());
  return scored.slice(0, limit);
}

/**
 * Logged-in customer: blend favourites, recent views, and search history.
 */
async function getPersonalizedRecommendations(userId, { limit }) {
  const references = await loadReferencesForUser(userId);

  if (!references.length) {
    return getGuestRecommendations({ limit });
  }

  const candidates = await fetchActiveCandidates({});
  const exclude = new Set();
  const user = await User.findById(userId).select("favourites").lean();
  if (user && Array.isArray(user.favourites)) {
    for (const id of user.favourites) exclude.add(String(id));
  }

  const scored = attachScores(candidates, references, exclude);
  return scored.slice(0, limit);
}

async function getSimilarListings(accommodationId, { limit }) {
  if (!mongoose.Types.ObjectId.isValid(accommodationId)) {
    return { error: "invalid_id" };
  }

  const base = await Accommodation.findById(accommodationId).lean();
  if (!base) {
    return { error: "not_found" };
  }

  const references = [base];
  const exclude = new Set([String(base._id)]);

  const candidates = await fetchActiveCandidates({});
  const scored = attachScores(candidates, references, exclude);
  return { items: scored.slice(0, limit) };
}

async function recordView(userId, accommodationId) {
  if (!mongoose.Types.ObjectId.isValid(accommodationId)) return;

  const acc = await Accommodation.findById(accommodationId).select("status").lean();
  if (!acc || acc.status !== "active") return;

  let activity = await UserActivity.findOne({ user: userId });
  if (!activity) {
    activity = new UserActivity({ user: userId, recentViews: [], searchHistory: [] });
  }

  const filtered = activity.recentViews.filter(
    (v) => String(v.accommodation) !== String(accommodationId),
  );

  activity.recentViews = [
    { accommodation: accommodationId, viewedAt: new Date() },
    ...filtered,
  ].slice(0, MAX_RECENT_VIEWS);

  await activity.save();
}

async function recordSearch(userId, payload) {
  const city = payload.city ? String(payload.city).trim() : "";
  const guests = Number(payload.guests);
  const minBudget = Number(payload.minBudget);
  const maxBudget = Number(payload.maxBudget);

  let activity = await UserActivity.findOne({ user: userId });
  if (!activity) {
    activity = new UserActivity({ user: userId, recentViews: [], searchHistory: [] });
  }

  activity.searchHistory.unshift({
    city,
    guests: Number.isFinite(guests) && guests > 0 ? guests : undefined,
    minBudget: Number.isFinite(minBudget) ? minBudget : undefined,
    maxBudget: Number.isFinite(maxBudget) ? maxBudget : undefined,
    searchedAt: new Date(),
  });
  activity.searchHistory = activity.searchHistory.slice(0, MAX_SEARCH_EVENTS);
  await activity.save();
}

module.exports = {
  WEIGHTS,
  getGuestRecommendations,
  getPersonalizedRecommendations,
  getSimilarListings,
  recordView,
  recordSearch,
  parseLimit,
};
