import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, MapPin } from "lucide-react";
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
      } catch (error) {
        console.error("Error fetching stay:", error);
        setStay(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStay();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Loading stay...
          </h1>
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
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Stay not found
          </h1>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all stays
        </Link>

        <div className="rounded-2xl overflow-hidden mb-8">
          <img
            src={stay.imageUrl}
            alt={stay.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              {stay.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" /> {stay.location}
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-foreground">
              ${stay.pricePerNight}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / night
              </span>
            </div>
            <div className="flex items-center gap-1 text-warm justify-end mt-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium text-foreground">
                {stay.rating}
              </span>
            </div>
          </div>
        </div>

        {stay.badge && (
          <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {stay.badge}
          </span>
        )}

        <p className="text-muted-foreground leading-relaxed mb-8">
          {stay.description}
        </p>

        <Button size="lg" className="rounded-full px-8">
          Book Now
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default StayDetail;