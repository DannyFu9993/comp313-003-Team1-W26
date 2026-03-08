import { CalendarCheck, ShieldCheck, BedDouble, Globe } from "lucide-react";

const benefits = [
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description: "Book your perfect stay in just a few clicks with our simple, streamlined process.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    description: "What you see is what you pay. No hidden fees, no surprise charges—ever.",
  },
  {
    icon: BedDouble,
    title: "Comfortable Stays",
    description: "Every listing is vetted for comfort and quality, so you can relax with confidence.",
  },
  {
    icon: Globe,
    title: "Great Destinations",
    description: "From tropical beaches to mountain retreats, find stays in the world's best spots.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">Why travelers love us</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">Why Choose Travelo</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-card rounded-2xl p-8 text-center shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent text-primary mb-5">
                <b.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
