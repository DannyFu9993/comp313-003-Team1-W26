import { Search, MapPin, CalendarDays, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(500);
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (city.trim()) params.set("city", city.trim());
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    
    // ADDED: Add budget parameters
    if (minBudget > 0) params.set("minBudget", minBudget.toString());
    if (maxBudget < 500) params.set("maxBudget", maxBudget.toString());

    const query = params.toString();
    navigate(`/stays${query ? `?${query}` : ""}`);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= maxBudget - 10) {
      setMinBudget(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= minBudget + 10) {
      setMaxBudget(value);
    }
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

      {/* ADDED: Budget Slider Section - Custom Dual Range */}
      <div className="mt-4 rounded-2xl bg-slate-50 px-5 py-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 shrink-0 text-emerald-500" />
            <span className="text-base font-medium text-slate-700">
              Budget per night
            </span>
          </div>
          <span className="text-base font-semibold text-slate-900">
            ${minBudget} - ${maxBudget === 500 ? "500+" : maxBudget}
          </span>
        </div>

        {/* Custom Range Slider Container */}
        <div className="relative h-8 flex items-center">
          {/* Background track */}
          <div className="absolute w-full h-1 bg-gray-300 rounded"></div>
          
          {/* Progress/Active track */}
          <div 
            className="absolute h-1 bg-blue-500 rounded"
            style={{
              left: `${(minBudget / 500) * 100}%`,
              width: `${((maxBudget - minBudget) / 500) * 100}%`
            }}
          ></div>

          {/* Min Range Input */}
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={minBudget}
            onChange={handleMinChange}
            className="absolute w-full appearance-none bg-transparent pointer-events-none
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-black
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-white
              [&::-webkit-slider-thumb]:shadow-md
              [&::-moz-range-thumb]:pointer-events-auto
              [&::-moz-range-thumb]:appearance-none
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-black
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-white
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:border-0"
          />

          {/* Max Range Input */}
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={maxBudget}
            onChange={handleMaxChange}
            className="absolute w-full appearance-none bg-transparent pointer-events-none
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-black
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-white
              [&::-webkit-slider-thumb]:shadow-md
              [&::-moz-range-thumb]:pointer-events-auto
              [&::-moz-range-thumb]:appearance-none
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-black
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-white
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:border-0"
          />
        </div>

        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>$0</span>
          <span>$500+</span>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
