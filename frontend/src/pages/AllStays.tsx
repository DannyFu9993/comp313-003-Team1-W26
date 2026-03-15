import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccommodationCard from "@/components/AccommodationCard";
import { getAccommodations } from "@/services/api";
import type { Stay } from "@/data/mockStays";

const AllStays = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAccommodations()
      .then((res) => setStays(res.data))
      .catch(() => setError("Failed to load stays."))
      .finally(() => setLoading(false));
  }, []);

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
                <AccommodationCard key={stay._id} stay={stay} />
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