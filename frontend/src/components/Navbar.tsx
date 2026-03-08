import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <span className="text-2xl font-display font-bold text-foreground tracking-tight">Travelo</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/stays" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Stays</Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Create Account</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b px-4 pb-4 space-y-3 animate-in slide-in-from-top-2">
          <Link to="/" className="block text-sm font-medium py-2 text-foreground" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/stays" className="block text-sm font-medium py-2 text-muted-foreground" onClick={() => setOpen(false)}>Stays</Link>
          <Link to="/about" className="block text-sm font-medium py-2 text-muted-foreground" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" className="block text-sm font-medium py-2 text-muted-foreground" onClick={() => setOpen(false)}>Contact</Link>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" asChild><Link to="/login">Login</Link></Button>
            <Button className="flex-1" asChild><Link to="/register">Create Account</Link></Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
