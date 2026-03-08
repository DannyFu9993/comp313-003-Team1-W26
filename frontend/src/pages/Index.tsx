import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedStays from "@/components/FeaturedStays";
import BenefitsSection from "@/components/BenefitsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedStays />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
