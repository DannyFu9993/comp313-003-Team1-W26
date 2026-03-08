import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Stay } from "@/data/mockStays";

const AccommodationCard = ({ stay }: { stay: Stay }) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={stay.image}
          alt={stay.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {stay.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {stay.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-semibold text-lg text-foreground leading-tight">{stay.title}</h3>
          <div className="flex items-center gap-1 text-warm shrink-0">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium text-foreground">{stay.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-3.5 w-3.5" />
          {stay.location}
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{stay.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-foreground">${stay.price}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
          <Button variant="outline" size="sm" asChild className="rounded-full">
            <Link to={`/stays/${stay.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
