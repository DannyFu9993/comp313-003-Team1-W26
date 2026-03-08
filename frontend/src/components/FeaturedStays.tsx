import { mockStays } from "@/data/mockStays";
import AccommodationCard from "./AccommodationCard";

const FeaturedStays = () => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStays.map((stay) => (
            <AccommodationCard key={stay.id} stay={stay} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStays;
