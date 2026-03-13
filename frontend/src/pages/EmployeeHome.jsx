import React, { useState, useEffect } from "react";
import axios from "axios";
import { LogOut, Plus, Leaf, Building, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import AccommodationCard from "@/components/AccommodationCard";
import stay1 from "@/assets/stay-1.jpg";

const EmployeeHome = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    pricePerNight: "",
    propertyType: "Apartment",
  });

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please login");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "http://localhost:5001/api/employee/accommodations",
        {
          headers: { "x-auth-token": token },
        },
      );
      setAccommodations(res.data);
    } catch (err) {
      setError("Failed to fetch listings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/employee-login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5001/api/employee/accommodations",
        formData,
        {
          headers: { "x-auth-token": token },
        },
      );
      setShowModal(false);
      setFormData({
        title: "",
        location: "",
        pricePerNight: "",
        propertyType: "Apartment",
      });
      fetchAccommodations();
    } catch (err) {
      console.error(err);
      alert("Failed to create listing");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-card p-8 rounded-2xl shadow-sm border max-w-md w-full text-center">
          <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={32} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button onClick={handleLogout} className="w-full">
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar matched from landing page */}
      <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-primary" />
            <span className="text-2xl font-display font-bold text-foreground tracking-tight">
              Travelo
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground hidden sm:block">
              Employee Panel
            </span>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content using Landing Page structure */}
      <main className="flex-1">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {/* Create Listing Section */}
            <div className="mb-20">
              <div className="mb-8">
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  Management
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
                  Create Accommodation
                </h2>
                <p className="text-muted-foreground mt-3">
                  Add a new property to the company catalog.
                </p>
              </div>

              <div className="bg-card rounded-xl border shadow-sm p-6 md:p-8 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Property Title
                      </label>
                      <Input
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Modern Loft Downtown"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Location
                      </label>
                      <Input
                        required
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Toronto, ON"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Price / Night ($)
                      </label>
                      <Input
                        required
                        type="number"
                        min="0"
                        name="pricePerNight"
                        value={formData.pricePerNight}
                        onChange={handleChange}
                        placeholder="150"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Property Type
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Cabin">Cabin</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button type="submit" size="lg" className="gap-2">
                      <Plus className="h-4 w-4" /> Publish Listing
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-border mb-20"></div>

            {/* Active Listings Section */}
            <div>
              <div className="mb-12">
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  Catalog
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
                  Active Listings
                </h2>
                <p className="text-muted-foreground mt-3">
                  Currently published accommodations on the platform.
                </p>
              </div>

              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-4">
                  <div className="w-10 h-10 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
                  <p className="text-muted-foreground font-medium">
                    Loading properties...
                  </p>
                </div>
              ) : accommodations.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center bg-card rounded-2xl border shadow-sm p-8 max-w-2xl mx-auto">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Building className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    No properties yet
                  </h3>
                  <p className="text-muted-foreground">
                    You haven't listed any accommodations. Use the form above to
                    add your first property.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {accommodations.map((acc) => (
                    <AccommodationCard
                      key={acc._id}
                      stay={{
                        ...acc,
                        id: acc._id,
                        title: acc.title,
                        location: acc.location,
                        price: acc.pricePerNight,
                        rating: 5.0,
                        description: `${acc.propertyType} property.`,
                        image: stay1,
                        badge: "Active Listing",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EmployeeHome;
