import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimilarAccommodations from "@/components/SimilarAccommodations";
import { trackAccommodationView } from "@/services/recommendationService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mountain, Waves, Snowflake, Flame, Trees, UtensilsCrossed, Star, MapPin, Wifi, BedDouble, Bath, Users, PawPrint, Tent, Droplet, Dumbbell, Heater, Kayak, Cigarette, Cannabis, CircleParking, Utensils, Building, Monitor } from "lucide-react";
import type { Stay } from "@/data/mockStays"; 

const StayDetail = () => {
  const { id } = useParams();
  const [stay, setStay] = useState<Stay | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStay = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/accommodations/${id}`);
        if (!response.ok) {
          throw new Error("Stay not found");
        }
        const data = await response.json();
        setStay(data);
        trackAccommodationView(String(data._id)).catch(() => {});
      } catch (error) {
        console.error("Error fetching stay:", error);
        setStay(null);
      } finally {
        setLoading(false);
      }
    };

    

    if (id) fetchStay();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Loading stay...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  if (!stay) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Stay not found</h1>
          <Button asChild>
            <Link to="/accommodations">Back to Stays</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }


const amenityIcons: Record<string, React.ElementType[]> = {
  Wifi: [Wifi],
  "Mountain View": [Mountain],
  "River View": [Waves],
  "Bathroom Essentials": [Bath],
  "Bathtub": [Bath],
  "Indoor Fireplace": [Flame],
  "Fire pit": [Flame],
  "Fire Pit": [Flame],
  "Hot water kettle": [UtensilsCrossed],
  "Hot Water": [Droplet],
  "Pets allowed": [PawPrint],
  "Pets Allowed": [PawPrint],
  AC: [Snowflake],
  Heating: [Flame],
  "Exercise Equipment": [Dumbbell],
  "Shower Products": [Bath],
  "Central Heating": [Heater],
  "Hair Dryer": [Bath],
  "Bedroom Essentials": [BedDouble],
  "Free Resort Access": [Waves],
  Hammock: [Tent],
  "Private backyard": [Trees],
  "Private Backyard": [Trees],
  "BBQ Grill": [UtensilsCrossed],
  "Kitchen Supplies": [UtensilsCrossed],
  "Shared Indoor Pool": [Waves],
  Kayak: [Kayak],
  "Smoking Allowed": [Cigarette, Cannabis],
  "Free Parking": [CircleParking],
  "Breakfast": [Utensils],
  "Balcony": [Trees],
  "Lake Access": [Kayak],
  "Kitchen": [UtensilsCrossed],
  "Cooking basics": [UtensilsCrossed],
  "Private rooftop": [Building],
  "TV": [Monitor],

};


  const subtotal = stay.pricePerNight ?? 0;
  const cleaningFee = stay.cleaningFee ?? 0;
  const serviceFee = stay.serviceFee ?? 0;
  const taxes = stay.taxes ?? 0;
  const total =
    stay.totalPrice ?? subtotal + cleaningFee + serviceFee + taxes;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto max-w-7xl px-4 py-10">
        <Link
          to="/stays"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all stays
        </Link>

        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {stay.title}
            </h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {stay.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                {stay.rating}
              </span>
            </div>
          </div>

          {stay.badge && (
            <span className="inline-block rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
              {stay.badge}
            </span>
          )}
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 overflow-hidden rounded-3xl bg-slate-100">
            {stay.imageUrl ? (
              <img
                src={stay.imageUrl}
                alt={stay.title}
                className="h-[420px] w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center");
                }}
              />
            ) : (
              <div className="h-[420px] w-full flex flex-col items-center justify-center text-slate-400 gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">No image available</span>
              </div>
            )}
          </div>

          <div className="grid gap-4">
            {(stay.imageGallery ?? []).length > 0
              ? (stay.imageGallery ?? []).slice(0, 2).map((img, index) => (
                  <div key={index} className="overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={img}
                      alt={`${stay.title} ${index + 1}`}
                      className="h-[200px] w-full object-cover"
                      onError={(e) => {
                        const el = e.target as HTMLImageElement;
                        el.style.display = "none";
                      }}
                    />
                  </div>
                ))
              : [0, 1].map((i) => (
                  <div key={i} className="overflow-hidden rounded-2xl bg-slate-100 h-[200px] flex items-center justify-center text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                ))}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                About this stay
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {stay.description}
              </p>
            </div>

            <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                Property details
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-foreground md:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <Users className="mb-2 h-5 w-5 text-emerald-600" />
                  <p className="font-medium">{stay.guests ?? "-" } guests</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <BedDouble className="mb-2 h-5 w-5 text-emerald-600" />
                  <p className="font-medium">{stay.bedrooms ?? "-" } bedroom(s)</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <BedDouble className="mb-2 h-5 w-5 text-emerald-600" />
                  <p className="font-medium">{stay.beds ?? "-" } bed(s)</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <Bath className="mb-2 h-5 w-5 text-emerald-600" />
                  <p className="font-medium">{stay.bathrooms ?? "-" } bathroom(s)</p>
                </div>
              </div>
            </div>

           <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
  <h2 className="mb-4 text-2xl font-semibold text-foreground">
    Amenities
  </h2>

  <div className="grid gap-3 sm:grid-cols-2">
    {(stay.amenities ?? []).map((amenity, index) => {
      const icons = amenityIcons[amenity] || [Wifi];

      return (
        <div
          key={index}
          className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-foreground"
        >
          <div className="flex items-center gap-1">
            {icons.map((Icon, i) => (
              <Icon key={i} className="h-4 w-4 text-emerald-600" />
            ))}
          </div>
          <span>{amenity}</span>
        </div>
      );
    })}
  </div>
</div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                Policies
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p><span className="font-medium text-foreground">Check-in:</span> {stay.checkIn ?? "3:00 PM"}</p>
                <p><span className="font-medium text-foreground">Check-out:</span> {stay.checkOut ?? "11:00 AM"}</p>
                <p><span className="font-medium text-foreground">Cancellation:</span> {stay.cancellationPolicy ?? "Policy not specified"}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                Price details
              </h2>

              <div className="mb-4 text-3xl font-bold text-foreground">
                ${stay.pricePerNight}
                <span className="text-base font-normal text-muted-foreground"> / night</span>
              </div>

              <div className="space-y-3 border-b border-slate-200 pb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base price</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cleaning fee</span>
                  <span>${cleaningFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>${taxes}</span>
                </div>
              </div>

              <div className="my-4 flex justify-between text-base font-semibold text-foreground">
                <span>Total</span>
                <span>${total}</span>
              </div>

              {stay.externalUrl ? (
                <a
                  href={stay.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700">
                    Book Now
                  </Button>
                </a>
              ) : (
                <Button className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700">
                  Book Now
                </Button>
              )}
            </div>
          </div>
        </div>

        {id && <SimilarAccommodations accommodationId={id} />}
      </div>

      <Footer />
    </div>
  );
};

export default StayDetail;