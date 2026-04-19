import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

type User = {
  name?: string;
  username?: string;
  email?: string;
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
          <Leaf className="h-7 w-7 text-primary" />
          <span className="text-2xl font-display font-bold tracking-tight text-foreground">
            Travelo
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/stays"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Stays
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>

        <div className="group relative rounded-2xl border border-transparent bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.35)] hover:border-emerald-400/50">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white text-sm font-semibold text-emerald-700 shadow-sm transition hover:shadow-md"
              aria-label="Go to dashboard"
              title="Dashboard"
            >
              {displayInitial}
            </Link>
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