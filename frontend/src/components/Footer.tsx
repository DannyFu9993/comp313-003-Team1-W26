import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/70 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-display font-bold text-primary-foreground">Travelo</span>
            </div>
            <p className="text-sm leading-relaxed">Budget-friendly accommodations with transparent pricing for everyday travelers.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4 text-sm">Explore</h4>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block hover:text-primary transition-colors">Home</Link>
              <Link to="/stays" className="block hover:text-primary transition-colors">Stays</Link>
              <Link to="/about" className="block hover:text-primary transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4 text-sm">Support</h4>
            <div className="space-y-2 text-sm">
              <Link to="/contact" className="block hover:text-primary transition-colors">Contact Us</Link>
              <Link to="/faq" className="block hover:text-primary transition-colors">FAQ</Link>
              <Link to="/help" className="block hover:text-primary transition-colors">Help Center</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4 text-sm">Contact</h4>
            <div className="space-y-2 text-sm">
              <p>hello@travelo.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Travelo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
