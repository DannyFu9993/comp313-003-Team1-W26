import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccommodationCard from "@/components/AccommodationCard";
import { getAccommodations, getFavourites, addFavourite, removeFavourite } from "@/services/api";
import { trackSearchForRecommendations } from "@/services/recommendationService";
import type { Stay } from "@/data/mockStays";

const AllStays = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(new Set());
  const [searchParams] = useSearchParams();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Load stays based on search filters
  useEffect(() => {
    const city = searchParams.get("city") || "";
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";
    const guests = searchParams.get("guests") || "";
    const minBudget = searchParams.get("minBudget") || ""; // ADDED: Extract minBudget from URL
    const maxBudget = searchParams.get("maxBudget") || ""; // ADDED: Extract maxBudget from URL

    setLoading(true);
    setError("");

    getAccommodations({ city, checkIn, checkOut, guests, minBudget, maxBudget }) // ADDED: Pass budget params to API
      .then((res) => {
        setStays(res.data);
        if (localStorage.getItem("token")) {
          trackSearchForRecommendations({
            city,
            guests,
            minBudget,
            maxBudget,
          }).catch(() => {});
        }
      })
      .catch(() => setError("Failed to load stays."))
      .finally(() => setLoading(false));
  }, [searchParams]);

  // Load current user's favourites if logged in
  useEffect(() => {
    if (!isLoggedIn) return;
    getFavourites()
      .then((res) => {
        const ids = new Set<string>(res.data.map((s: Stay) => s._id));
        setFavouriteIds(ids);
      })
      .catch(() => {
        // Not critical — heart buttons still render, just won't show saved state
      });
  }, [isLoggedIn]);

  const handleToggleFavourite = async (id: string) => {
    const wasFavourited = favouriteIds.has(id);

    // Optimistic update
    setFavouriteIds((prev) => {
      const next = new Set(prev);
      if (wasFavourited) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    try {
      if (wasFavourited) {
        await removeFavourite(id);
      } else {
        await addFavourite(id);
      }
    } catch {
      // Revert on failure
      setFavouriteIds((prev) => {
        const next = new Set(prev);
        if (wasFavourited) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-foreground">All Stays</h1>
            <p className="mt-3 text-muted-foreground">
              Explore all available budget-friendly accommodations on Travelo.
            </p>
            {(searchParams.get("city") ||
              searchParams.get("checkIn") ||
              searchParams.get("checkOut") ||
              searchParams.get("guests") ||
              searchParams.get("minBudget") || // ADDED: Include budget in filter check
              searchParams.get("maxBudget")) && ( // ADDED: Include budget in filter check
              <p className="mt-3 text-sm text-muted-foreground">
                Showing results for your search filters.
              </p>
            )}
          </div>

          {loading && (
            <p className="text-center text-muted-foreground">Loading stays...</p>
          )}

          {error && (
            <p className="text-center text-destructive">{error}</p>
          )}

          {!loading && !error && stays.length === 0 && (
            <p className="text-center text-muted-foreground">
              No stays available yet.
            </p>
          )}

          {!loading && !error && stays.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stays.map((stay) => (
                <AccommodationCard
                  key={stay._id}
                  stay={stay}
                  isFavourited={favouriteIds.has(stay._id)}
                  onToggleFavourite={isLoggedIn ? handleToggleFavourite : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllStays;
