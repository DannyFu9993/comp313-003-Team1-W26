import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import TraveloMascot from "@/assets/birdotravelo.png";


type User = {
  name?: string;
  username?: string;
  email?: string;
  profileImage?: string;
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const displayInitial =
    user?.name?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
  src={TraveloMascot}
  alt="Travelo mascot"
  className="h-20 w-20 object-contain transition-transform duration-300 hover:scale-110"
/>
          <span className="text-2xl font-display font-bold tracking-tight text-foreground">
            Travelo
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="group relative px-3 py-1.5 rounded-md text-base font-semibold text-muted-foreground transition-all duration-300 hover:text-emerald-600 hover:bg-emerald-50/60 hover:-translate-y-[1px]"
          >
            Home
          </Link>
          <Link
            to="/stays"
            className="group relative px-3 py-1.5 rounded-md text-base font-semibold text-muted-foreground transition-all duration-300 hover:text-emerald-600 hover:bg-emerald-50/60 hover:-translate-y-[1px]"
          >
            Stays
          </Link>
          <Link
            to="/about"
           className="group relative px-3 py-1.5 rounded-md text-base font-semibold text-muted-foreground transition-all duration-300 hover:text-emerald-600 hover:bg-emerald-50/60 hover:-translate-y-[1px]"
          >
            About
          </Link>
          <Link
            to="/contact"
          className="group relative px-3 py-1.5 rounded-md text-base font-semibold text-muted-foreground transition-all duration-300 hover:text-emerald-600 hover:bg-emerald-50/60 hover:-translate-y-[1px]"
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
  {user ? (
 <div className="group relative">
  <button
    type="button"
    className="relative h-12 w-12 overflow-hidden rounded-full border border-white/60 bg-white shadow-sm transition hover:shadow-md"
    aria-label="Open profile menu"
    title="Profile menu"
  >
    {user?.profileImage ? (
      <img
        src={user.profileImage}
        alt="Profile"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    ) : (
      <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-emerald-700">
        {displayInitial}
      </span>
    )}
  </button>

      <div className="invisible absolute right-0 top-14 z-50 w-44 translate-y-2 rounded-2xl border bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <Link
          to="/dashboard"
          className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-slate-100"
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-slate-100"
        >
          Profile
        </Link>
      </div>
    </div>
  ) : (
    <>
      <Button variant="ghost" asChild>
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link to="/register">Create Account</Link>
      </Button>
    </>
  )}
</div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="animate-in slide-in-from-top-2 space-y-3 border-b bg-card px-4 pb-4 md:hidden">
          <Link
            to="/"
            className="block py-2 text-sm font-medium text-foreground"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/stays"
            className="block py-2 text-sm font-medium text-muted-foreground"
            onClick={() => setOpen(false)}
          >
            Stays
          </Link>
          <Link
            to="/about"
            className="block py-2 text-sm font-medium text-muted-foreground"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-sm font-medium text-muted-foreground"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

          {user ? (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-foreground"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                {displayInitial}
              </div>
              <span className="text-sm font-medium">My Dashboard</span>
            </Link>
          ) : (
            <div className="flex gap-3 pt-2">
              <Button variant="ghost" className="flex-1" asChild>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link to="/register" onClick={() => setOpen(false)}>
                  Create Account
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;