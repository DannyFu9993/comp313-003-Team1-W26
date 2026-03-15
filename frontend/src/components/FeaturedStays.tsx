import { useEffect, useState } from "react";
import { getFeaturedAccommodations } from "@/services/api"; 
import AccommodationCard from "./AccommodationCard";
import type { Stay } from "@/data/mockStays";

const FeaturedStays = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  getFeaturedAccommodations()
    .then((res) => {
      console.log("featured frontend response:", res.data);
      setStays(Array.isArray(res.data) ? res.data : []);
    })
    .catch(() => setError("Failed to load accommodations."))
    .finally(() => setLoading(false));
}, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">Handpicked for you</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">Featured Stays</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Explore our top-rated budget-friendly accommodations around the world.
          </p>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground">Loading stays...</p>
        )}

        {error && (
          <p className="text-center text-destructive">{error}</p>
        )}

        {!loading && !error && stays.length === 0 && (
          <p className="text-center text-muted-foreground">No accommodations available yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(stays) &&
  stays.map((stay) => (
    <AccommodationCard key={stay._id} stay={stay} />
  ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStays;
