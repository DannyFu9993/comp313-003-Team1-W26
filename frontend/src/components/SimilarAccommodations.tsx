import { useEffect, useState } from "react";
import AccommodationCard from "@/components/AccommodationCard";
import { getSimilarAccommodations } from "@/services/recommendationService";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "@/services/api";
import type { Stay } from "@/data/mockStays";

type SimilarAccommodationsProps = {
  accommodationId: string;
};

const SimilarAccommodations = ({ accommodationId }: SimilarAccommodationsProps) => {
  const [items, setItems] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isLoggedIn = Boolean(
    typeof window !== "undefined" && localStorage.getItem("token"),
  );
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!accommodationId) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    getSimilarAccommodations(accommodationId, { limit: 6 })
      .then((res) => {
        if (cancelled) return;
        const payload = res.data;
        setItems(Array.isArray(payload?.data) ? payload.data : []);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load similar stays.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [accommodationId]);

  useEffect(() => {
    if (!isLoggedIn) return;
    getFavourites()
      .then((res) => {
        const ids = new Set<string>(res.data.map((s: Stay) => s._id));
        setFavouriteIds(ids);
      })
      .catch(() => {});
  }, [isLoggedIn]);

  const handleToggleFavourite = async (id: string) => {
    const wasFavourited = favouriteIds.has(id);
    setFavouriteIds((prev) => {
      const next = new Set(prev);
      if (wasFavourited) next.delete(id);
      else next.add(id);
      return next;
    });
    try {
      if (wasFavourited) await removeFavourite(id);
      else await addFavourite(id);
    } catch {
      setFavouriteIds((prev) => {
        const next = new Set(prev);
        if (wasFavourited) next.add(id);
        else next.delete(id);
        return next;
      });
    }
  };

  if (loading) {
    return (
      <div className="mt-12 rounded-3xl bg-white p-8 text-center text-muted-foreground shadow-sm">
        Finding similar places…
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 rounded-3xl bg-white p-8 text-center text-destructive shadow-sm">
        {error}
      </div>
    );
  }

  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
          Similar places you may like
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Weighted matches on location, property type, budget band, guest capacity, amenities, and
          quality signals — excluding the stay you are viewing.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((stay) => (
          <AccommodationCard
            key={stay._id}
            stay={stay}
            isFavourited={favouriteIds.has(stay._id)}
            onToggleFavourite={isLoggedIn ? handleToggleFavourite : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarAccommodations;
