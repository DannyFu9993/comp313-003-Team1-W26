import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  User,
  MapPin,
  Wallet,
  Home as HomeIcon,
  Search,
  LogOut,
  PencilLine,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccommodationCard from "@/components/AccommodationCard";
import { getFavourites, removeFavourite } from "@/services/api";
import type { Stay } from "@/data/mockStays";
import road1 from "@/assets/road1.jpg";

type UserType = {
  username?: string;
  name?: string;
  email?: string;
  preferredDestination?: string;
  budgetRange?: string;
  favoriteStayType?: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [favourites, setFavourites] = useState<Stay[]>([]);
  const [loadingFavourites, setLoadingFavourites] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setLoadingFavourites(false);
      return;
    }

    getFavourites()
      .then((res) => setFavourites(res.data))
      .catch(() => setFavourites([]))
      .finally(() => setLoadingFavourites(false));
  }, []);

  const handleToggleFavourite = async (id: string) => {
    setFavourites((prev) => prev.filter((s) => s._id !== id));
    try {
      await removeFavourite(id);
    } catch {
      getFavourites().then((res) => setFavourites(res.data));
    }
  };

  const displayName = user?.name || user?.username || "Traveler";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative min-h-screen">
  {/* Background */}
  <div className="absolute inset-0">
    <img
      src={road1
      }
      alt=""
      className="h-full w-full object-cover opacity-25"
    />
    <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />
  </div>
  

  {/* Content */}
  <div className="relative z-10">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Left side */}
          <div className="space-y-8">
            {/* Welcome Card */}
            <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-bold backdrop-blur-sm">
                    {userInitial}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      Welcome, {displayName} 👋
                    </h1>
                    <p className="mt-1 text-sm text-white/90">
                      Explore your saved stays, recent searches, and account tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 px-8 py-6 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Favourites
                  </p>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {favourites.length}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Preferred Destination
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {user?.preferredDestination || "Not set"}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Favorite Stay Type
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {user?.favoriteStayType || "Not set"}
                  </p>
                </div>
              </div>
            </section>

            {/* Favourites */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50">
                    <Heart className="h-5 w-5 text-rose-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      My Favourites
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your saved budget-friendly stays
                    </p>
                  </div>
                </div>

                <Link
                  to="/stays"
                  className="text-sm font-medium text-emerald-600 hover:underline"
                >
                  Browse stays
                </Link>
              </div>

              {loadingFavourites ? (
                <p className="text-muted-foreground">Loading favourites...</p>
              ) : favourites.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="mb-4 text-muted-foreground">
                    No favourites yet. Start saving stays you love.
                  </p>
                  <Link
                    to="/stays"
                    className="inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-700"
                  >
                    Browse stays
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {favourites.map((stay) => (
                    <AccommodationCard
                      key={stay._id}
                      stay={stay}
                      isFavourited={true}
                      onToggleFavourite={handleToggleFavourite}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            {/* Profile Summary */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                  <User className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Profile Summary
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your travel preferences
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <User className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="font-medium text-foreground">Name</p>
                    <p className="text-muted-foreground">{user?.name || "Not set"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="font-medium text-foreground">Preferred Destination</p>
                    <p className="text-muted-foreground">
                      {user?.preferredDestination || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <Wallet className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="font-medium text-foreground">Budget</p>
                    <p className="text-muted-foreground">
                      {user?.budgetRange || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <HomeIcon className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="font-medium text-foreground">Favorite Stay Type</p>
                    <p className="text-muted-foreground">
                      {user?.favoriteStayType || "Not set"}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/profile"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-slate-200"
              >
                <PencilLine className="h-4 w-4" />
                Edit Profile
              </Link>
            </section>

            {/* Account Actions */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Account Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/profile"
                  className="block rounded-xl bg-slate-50 px-4 py-3 text-foreground transition hover:bg-slate-100"
                >
                  Profile
                </Link>
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-white transition hover:bg-emerald-700"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </section>

            {/* Recent Searches */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50">
                  <Search className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Recent Searches
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your latest browsing activity
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-muted-foreground">No recent searches yet.</p>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
    </div>
  );
};

export default Dashboard;