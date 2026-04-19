import heroBg from "@/assets/hero-bg.jpg";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <section className="relative min-h-[720px] lg:min-h-[860px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Beautiful eco-lodge by a turquoise lake"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 flex min-h-[720px] lg:min-h-[860px] items-center justify-center px-6">
        <div className="mx-auto w-full max-w-7xl text-center">
          <span className="mb-6 inline-block rounded-full border border-white/30 bg-emerald-900/40 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            Budget Friendly · Transparent Pricing
          </span>

          <h1 className="mx-auto mb-6 max-w-5xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-8xl">
            Find Your Perfect Stay
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-lg font-light text-white/90 md:text-2xl">
            Discover hand picked accommodations from different platforms. Comfortable, budget-friendly accommodations with no hidden fees.
            Your next adventure starts here.
          </p>

          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Hero;