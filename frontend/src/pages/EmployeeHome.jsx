import React, { useState, useEffect } from "react";
import axios from "axios";
import { LogOut, Plus, Leaf, Building, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import AccommodationCard from "@/components/AccommodationCard";
import stay1 from "@/assets/stay-1.jpg";
import { getApiUrl } from "../config"; // ADDED: Import config helper

const AMENITY_OPTIONS = [
  "WiFi", "Pool", "Kitchen", "Parking", "Air Conditioning",
  "Washer", "Dryer", "TV", "Hot Tub", "Gym", "Pet Friendly", "Fireplace",
];

const DEFAULT_FORM = {
  title: "",
  location: "",
  pricePerNight: "",
  propertyType: "Apartment",
  description: "",
  imageUrl: "",
  imageGallery: "",
  guests: "1",
  bedrooms: "1",
  beds: "1",
  bathrooms: "1",
  amenities: [],
  cleaningFee: "0",
  serviceFee: "0",
  taxes: "0",
  checkIn: "3:00 PM",
  checkOut: "11:00 AM",
  cancellationPolicy: "Free cancellation within 24 hours",
  externalUrl: "",
  isFeatured: false,
};

const EmployeeHome = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(DEFAULT_FORM);

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
        getApiUrl("/api/employee/accommodations"), // CHANGED: Use getApiUrl
        { headers: { "x-auth-token": token } },
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const buildPayload = () => ({
    ...formData,
    imageGallery: formData.imageGallery
      ? formData.imageGallery.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = buildPayload();
      if (editingId) {
        await axios.put(
          getApiUrl(`/api/employee/accommodations/${editingId}`), // CHANGED: Use getApiUrl
          payload,
          { headers: { "x-auth-token": token } },
        );
      } else {
        await axios.post(
          getApiUrl("/api/employee/accommodations"), // CHANGED: Use getApiUrl
          payload,
          { headers: { "x-auth-token": token } },
        );
      }
      setFormData(DEFAULT_FORM);
      setEditingId(null);
      fetchAccommodations();
    } catch (err) {
      console.error(err);
      alert(editingId ? "Failed to update listing" : "Failed to create listing");
    }
  };

  const handleEditStart = (acc) => {
    setEditingId(acc._id);
    setFormData({
      title: acc.title || "",
      location: acc.location || "",
      pricePerNight: String(acc.pricePerNight || ""),
      propertyType: acc.propertyType || "Apartment",
      description: acc.description || "",
      imageUrl: acc.imageUrl || "",
      imageGallery: (acc.imageGallery || []).join(", "),
      guests: String(acc.guests || 1),
      bedrooms: String(acc.bedrooms || 1),
      beds: String(acc.beds || 1),
      bathrooms: String(acc.bathrooms || 1),
      amenities: acc.amenities || [],
      cleaningFee: String(acc.cleaningFee || 0),
      serviceFee: String(acc.serviceFee || 0),
      taxes: String(acc.taxes || 0),
      checkIn: acc.checkIn || "3:00 PM",
      checkOut: acc.checkOut || "11:00 AM",
      cancellationPolicy: acc.cancellationPolicy || "Free cancellation within 24 hours",
      externalUrl: acc.externalUrl || "",
      isFeatured: acc.isFeatured || false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeactivate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        getApiUrl(`/api/employee/accommodations/${id}/deactivate`), // CHANGED: Use getApiUrl
        {},
        { headers: { "x-auth-token": token } },
      );
      fetchAccommodations();
    } catch (err) {
      console.error(err);
      alert("Failed to deactivate listing");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-card p-8 rounded-2xl shadow-sm border max-w-md w-full text-center">
          <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={32} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button onClick={handleLogout} className="w-full">Return to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      <main className="flex-1">
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="max-w-4xl mb-16">
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                Management Dashboard
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mt-3 leading-tight">
                List a New Property
              </h1>
              <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
                Create or update accommodation listings. All required fields must be completed before publishing.
              </p>
            </div>

            {/* Listing Form */}
            <div className="mb-20">
              <div className="bg-card rounded-3xl border shadow-sm p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* ── Basic Info ── */}
                  <fieldset className="space-y-4">
                    <legend className="text-base font-semibold text-foreground border-b pb-2 w-full">
                      Basic Information
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Title *</label>
                        <Input
                          required
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Cozy Downtown Apartment"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Location *</label>
                        <Input
                          required
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Toronto, ON"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Price per Night ($) *</label>
                        <Input
                          type="number"
                          required
                          min="0"
                          name="pricePerNight"
                          value={formData.pricePerNight}
                          onChange={handleChange}
                          placeholder="150"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Property Type</label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="Apartment">Apartment</option>
                          <option value="House">House</option>
                          <option value="Condo">Condo</option>
                          <option value="Villa">Villa</option>
                          <option value="Cabin">Cabin</option>
                          <option value="Studio">Studio</option>
                        </select>
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Description ── */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your property, its features, and what makes it special..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    />
                  </div>

                  {/* ── Images ── */}
                  <fieldset className="space-y-4">
                    <legend className="text-base font-semibold text-foreground border-b pb-2 w-full">
                      Images
                    </legend>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Featured Image URL</label>
                      <Input
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Additional Images (comma-separated URLs)
                      </label>
                      <Input
                        name="imageGallery"
                        value={formData.imageGallery}
                        onChange={handleChange}
                        placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                      />
                    </div>
                  </fieldset>

                  {/* ── Capacity ── */}
                  <fieldset className="space-y-4">
                    <legend className="text-base font-semibold text-foreground border-b pb-2 w-full">
                      Capacity & Rooms
                    </legend>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: "Max Guests", name: "guests" },
                        { label: "Bedrooms", name: "bedrooms" },
                        { label: "Beds", name: "beds" },
                        { label: "Bathrooms", name: "bathrooms" },
                      ].map(({ label, name }) => (
                        <div key={name} className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{label}</label>
                          <Input
                            type="number"
                            min="1"
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  {/* ── Amenities ── */}
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-foreground border-b pb-2">
                      Amenities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {AMENITY_OPTIONS.map((amenity) => {
                        const selected = formData.amenities.includes(amenity);
                        return (
                          <button
                            key={amenity}
                            type="button"
                            onClick={() => handleAmenityToggle(amenity)}
                            style={{
                              backgroundColor: selected ? "#4b7a65" : "#f4f4f5",
                              color: selected ? "#ffffff" : "#4b7a65",
                              padding: "4px 14px",
                              borderRadius: "9999px",
                              fontSize: "0.875rem",
                              border: "none",
                              outline: "none",
                              transition: "background-color 0.15s, color 0.15s",
                            }}
                          >
                            {amenity}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Pricing Details ── */}
                  <fieldset className="space-y-4">
                    <legend className="text-base font-semibold text-foreground border-b pb-2 w-full">
                      Additional Fees
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: "Cleaning Fee ($)", name: "cleaningFee" },
                        { label: "Service Fee ($)", name: "serviceFee" },
                        { label: "Taxes ($)", name: "taxes" },
                      ].map(({ label, name }) => (
                        <div key={name} className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{label}</label>
                          <Input
                            type="number"
                            min="0"
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  {/* ── Policies ── */}
                  <fieldset className="space-y-4">
                    <legend className="text-base font-semibold text-foreground border-b pb-2 w-full">
                      Policies
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Check-in Time</label>
                        <Input
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          placeholder="3:00 PM"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Check-out Time</label>
                        <Input
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          placeholder="11:00 AM"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Cancellation Policy</label>
                      <Input
                        name="cancellationPolicy"
                        value={formData.cancellationPolicy}
                        onChange={handleChange}
                        placeholder="Free cancellation within 24 hours"
                      />
                    </div>
                  </fieldset>

                  {/* ── Booking ── */}
                  <fieldset className="space-y-4">
                    <legend className="text-base font-semibold text-foreground border-b pb-2 w-full">
                      Booking
                    </legend>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">External Booking URL</label>
                      <Input
                        name="externalUrl"
                        value={formData.externalUrl}
                        onChange={handleChange}
                        placeholder="https://www.airbnb.com/rooms/..."
                      />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer w-fit">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-input accent-primary"
                      />
                      <span className="text-sm font-medium text-foreground">Mark as Featured Property</span>
                    </label>
                  </fieldset>

                  {/* ── Actions ── */}
                  <div className="pt-2 flex justify-end gap-3">
                    {editingId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setFormData(DEFAULT_FORM);
                        }}
                      >
                        Cancel Edit
                      </Button>
                    )}
                    <Button type="submit" size="lg" className="gap-2">
                      <Plus className="h-4 w-4" />
                      {editingId ? "Update Listing" : "Publish Listing"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="h-px w-full bg-border mb-20" />

            {/* Active Listings */}
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
                  <div className="w-10 h-10 border-4 border-muted border-t-primary rounded-full animate-spin" />
                  <p className="text-muted-foreground font-medium">Loading properties...</p>
                </div>
              ) : accommodations.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center bg-card rounded-2xl border shadow-sm p-8 max-w-2xl mx-auto">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Building className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No properties yet</h3>
                  <p className="text-muted-foreground">
                    You haven't listed any accommodations. Use the form above to add your first property.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {accommodations.map((acc) => (
                    <div key={acc._id} className="space-y-3">
                      <AccommodationCard
                        stay={{
                          ...acc,
                          id: acc._id,
                          price: acc.pricePerNight,
                          rating: acc.rating || 5.0,
                          image: acc.imageUrl || stay1,
                          badge: acc.status === "inactive" ? "Inactive Listing" : "Active Listing",
                        }}
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleEditStart(acc)}
                        >
                          Edit Listing
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          className="flex-1"
                          disabled={acc.status === "inactive"}
                          onClick={() => handleDeactivate(acc._id)}
                        >
                          Deactivate
                        </Button>
                      </div>
                    </div>
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