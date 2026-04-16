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
    <div className="group bg-card rounded-2xl shadow-sm hover:shadow-lg border transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3] rounded-t-2xl">
        <img
          src={stay.imageUrl || "https://placehold.co/400x300?text=No+Image"}
          alt={stay.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {onToggleFavourite && (
          <button
            type="button"
            onClick={() => onToggleFavourite(stay._id)}
            className="absolute top-3 left-3 z-10 inline-flex h-8 w-8 items-center justify-center bg-transparent p-0 select-none touch-manipulation outline-none hover:bg-transparent active:bg-transparent focus:bg-transparent focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent hover:[&>svg]:scale-110 hover:[&>svg]:text-rose-400 [-webkit-tap-highlight-color:transparent]"
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
          <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {stay.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-semibold text-lg text-foreground leading-tight">{stay.title}</h3>
          {stay.rating > 0 && (
            <div className="flex items-center gap-1 text-warm shrink-0">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium text-foreground">{stay.rating}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-3.5 w-3.5" />
          {stay.location}
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{stay.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-foreground">${stay.pricePerNight}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
          <Button variant="outline" size="sm" asChild className="rounded-full">
            <Link to={`/accommodations/${stay._id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
