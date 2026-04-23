import AccommodationCard from "@/components/AccommodationCard";
import { useRecommendations } from "@/hooks/useRecommendations";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "@/services/api";
import type { Stay } from "@/data/mockStays";
import { useEffect, useState } from "react";

type RecommendationSectionProps = {
  city?: string;
  guests?: string;
  minBudget?: string;
  maxBudget?: string;
};

const RecommendationSection = ({
  city,
  guests,
  minBudget,
  maxBudget,
}: RecommendationSectionProps) => {
  const { items, loading, error, meta } = useRecommendations({
    city,
    guests,
    minBudget,
    maxBudget,
    limit: 8,
  });

  const isLoggedIn = Boolean(
    typeof window !== "undefined" && localStorage.getItem("token"),
  );
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(new Set());

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

  const subtitle = meta.personalized
    ? "Inspired by your browsing, searches, and saved stays — powered by Travelo’s weighted similarity engine."
    : "Popular, highly rated stays — refined with your current search when you explore listings.";

  return (
    <section className="border-y bg-slate-50/60 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Smart picks
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            Recommended for you
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground">Curating recommendations…</p>
        )}

        {error && <p className="text-center text-destructive">{error}</p>}

        {!loading && !error && items.length === 0 && (
          <p className="text-center text-muted-foreground">
            No recommendations yet — try exploring a few stays first.
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </section>
  );
};

export default RecommendationSection;
