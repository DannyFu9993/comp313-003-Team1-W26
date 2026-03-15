import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccommodationCard from "@/components/AccommodationCard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // temporary mock until favorites API is connected
    setFavorites([]);
    setLoadingFavorites(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome{user?.name ? `, ${user.name}` : ""} 👋
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore your saved stays, recent searches, and account tools.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                My Favorites
              </h2>
              <Link
                to="/stays"
                className="text-sm font-medium text-emerald-600 hover:underline"
              >
                Browse stays
              </Link>
            </div>

            {loadingFavorites ? (
              <p className="text-muted-foreground">Loading favorites...</p>
            ) : favorites.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-6 text-center">
                <p className="mb-4 text-muted-foreground">No favorites yet.</p>
                <Link
                  to="/stays"
                  className="inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                >
                  Browse stays
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {favorites.map((stay) => (
                  <AccommodationCard key={stay._id} stay={stay} />
                ))}
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Account Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/profile"
                  className="block rounded-xl bg-slate-50 px-4 py-3 text-foreground hover:bg-slate-100"
                >
                  Profile
                </Link>
                <button
                  className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </button>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Recent Searches
              </h2>
              <p className="text-muted-foreground">
                No recent searches yet.
              </p>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;