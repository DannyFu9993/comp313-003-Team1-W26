import { Link } from "react-router-dom";
import { Star, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Stay } from "@/data/mockStays";

interface AccommodationCardProps {
  stay: Stay;
  isFavourited?: boolean;
  onToggleFavourite?: (id: string) => void;
}

const AccommodationCard = ({
  stay,
  isFavourited = false,
  onToggleFavourite,
}: AccommodationCardProps) => {
  return (
    <div className="group relative rounded-2xl border border-transparent bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.35)] hover:border-emerald-400/50">
      {onToggleFavourite && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(stay._id);
          }}
          className="absolute left-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center bg-transparent p-0 outline-none hover:bg-transparent active:bg-transparent focus:bg-transparent focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={isFavourited}
        >
          <Heart
            className={`h-6 w-6 drop-shadow-md transition-all ${
              isFavourited
                ? "fill-rose-500 text-rose-500"
                : "fill-transparent text-white"
            }`}
          />
        </button>
      )}

      {stay.badge && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {stay.badge}
        </span>
      )}

      <Link to={`/accommodations/${stay._id}`} className="block">
        <div className="relative overflow-hidden rounded-t-2xl aspect-[4/3]">
          <img
            src={stay.imageUrl || "https://placehold.co/400x300?text=No+Image"}
            alt={stay.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold leading-tight text-foreground">
              {stay.title}
            </h3>
            {stay.rating > 0 && (
              <div className="shrink-0 flex items-center gap-1 text-warm">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium text-foreground">
                  {stay.rating}
                </span>
              </div>
            )}
          </div>

          <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {stay.location}
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {stay.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-foreground">
                ${stay.pricePerNight}
              </span>
              <span className="text-sm text-muted-foreground"> / night</span>
            </div>

            <Button variant="outline" size="sm" className="rounded-full" asChild>
              <span>View Details</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AccommodationCard;
