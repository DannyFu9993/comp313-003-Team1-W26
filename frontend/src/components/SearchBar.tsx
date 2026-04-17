import { Search, MapPin, CalendarDays, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [budgetRange, setBudgetRange] = useState([0, 500]); // ADDED: Budget slider state
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (city.trim()) params.set("city", city.trim());
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    
    // ADDED: Add budget parameters
    if (budgetRange[0] > 0) params.set("minBudget", budgetRange[0].toString());
    if (budgetRange[1] < 500) params.set("maxBudget", budgetRange[1].toString());

    const query = params.toString();
    navigate(`/stays${query ? `?${query}` : ""}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto w-full max-w-6xl rounded-[28px] bg-white/95 p-4 shadow-2xl backdrop-blur-md"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
          <MapPin className="h-5 w-5 shrink-0 text-emerald-500" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Where are you going?"
            className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
          <CalendarDays className="h-5 w-5 shrink-0 text-emerald-500" />
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            placeholder="Check-in"
            className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
          <CalendarDays className="h-5 w-5 shrink-0 text-emerald-500" />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            placeholder="Check-out"
            className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
          <Users className="h-5 w-5 shrink-0 text-emerald-500" />
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Guests"
            className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-400 outline-none"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="min-h-[56px] rounded-2xl bg-emerald-500 px-8 text-base font-semibold text-white shadow-md hover:bg-emerald-600"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </Button>
      </div>

      {/* ADDED: Budget Slider Section */}
      <div className="mt-4 rounded-2xl bg-slate-50 px-5 py-4">
        <div className="flex items-center gap-3 mb-3">
          <DollarSign className="h-5 w-5 shrink-0 text-emerald-500" />
          <span className="text-base font-medium text-slate-700">
            Budget per night: ${budgetRange[0]} - ${budgetRange[1] === 500 ? "500+" : budgetRange[1]}
          </span>
        </div>
        <Slider
          min={0}
          max={500}
          step={10}
          value={budgetRange}
          onValueChange={setBudgetRange}
          className="w-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-black [&_[role=slider]]:border-2 [&_[role=slider]]:border-black [&_.relative]:h-2 [&_.relative]:bg-blue-500"
        />
      </div>
    </form>
  );
};

export default SearchBar;
