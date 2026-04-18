import api from "./api";

export type RecommendationQuery = {
  city?: string;
  guests?: string | number;
  minBudget?: string | number;
  maxBudget?: string | number;
  limit?: number;
};

export const getRecommendations = (params: RecommendationQuery = {}) =>
  api.get("/recommendations", { params });

export const getSimilarAccommodations = (
  id: string,
  params: { limit?: number } = {},
) => api.get(`/recommendations/similar/${id}`, { params });

export const trackAccommodationView = (accommodationId: string) =>
  api.post("/recommendations/track-view", { accommodationId });

export const trackSearchForRecommendations = (payload: {
  city?: string;
  guests?: string | number;
  minBudget?: string | number;
  maxBudget?: string | number;
}) => api.post("/recommendations/track-search", payload);

export const addFavoriteViaRecommendations = (id: string) =>
  api.post(`/recommendations/favorite/${id}`);
