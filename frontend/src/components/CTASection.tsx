import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
          Ready to Find Your Next Stay?
        </h2>
        <p className="text-primary-foreground/80 max-w-md mx-auto mb-8 text-lg">
          Join thousands of travelers enjoying budget-friendly stays with transparent pricing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="rounded-full px-8 text-base font-semibold" asChild>
            <Link to="/register">Create Account</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
