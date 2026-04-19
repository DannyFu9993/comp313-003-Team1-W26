import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wallet, MapPinned, Heart, Building2, GraduationCap, Compass, Globe2 } from "lucide-react";
import TraveloMascot from "@/assets/birdotravelo.png";
import Agodalogo from "@/assets/Agoda_logo.png";

const bookingLogos = [
  {
    name: "Airbnb",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  },
  {
    name: "Booking.com",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg",
  },
  {
    name: "Agoda",
    src: Agodalogo,
  },
  {
    name: "Airbnb",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  },
  {
    name: "Booking.com",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg",
  },
  {
    name: "Agoda",
    src: Agodalogo,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Hero */}
        <section className="relative border-b bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                About Travelo
                
              </span>

                 <div className="hidden justify-center lg:flex">
                <div className="relative">
                 <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl" />
                <img
                 src={TraveloMascot}
                 alt="Travelo mascot"
                className="relative h-[260px] w-auto object-contain drop-shadow-2xl"
                 />
             </div>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Handpicked affordable stays, built by students for travelers
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                Travelo is a student-built platform designed to help users discover
                budget-friendly and affordable accommodation options in a cleaner,
                simpler, and more inspiring way. We wanted to create an experience
                that feels practical for booking exploration while still being
                visually engaging and traveler-focused.
              </p>
            </div>

         
        </div>
        </section>

        {/* Intro / Mission */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <Compass className="h-6 w-6 text-emerald-600" />
              </div>

              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                We created Travelo to make stay discovery feel more approachable for
                travelers who care about budget, comfort, and different travel styles.
                Instead of overwhelming users, Travelo focuses on curated stay
                browsing, personalization, and a modern user experience.
              </p>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                As a team of students, we wanted to build a platform that combines
                functionality with visual storytelling. Travelo helps users explore
                different types of accommodations, save favorites, personalize their
                profile, and navigate to external booking platforms with ease.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <GraduationCap className="h-6 w-6 text-emerald-600" />
              </div>

              <h2 className="text-2xl font-bold text-foreground">Who We Are</h2>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                We are a group of students who designed and developed Travelo as a
                travel discovery platform focused on affordability, clarity, and user
                experience.
              </p>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                This project reflects our work across UI design, frontend
                development, backend integration, database management, and
                user-centered thinking.
              </p>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-foreground">
                  Built with modern web technologies and designed with accessibility,
                  responsiveness, and simplicity in mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Logo strip */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Booking platforms represented in our stay links
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Travelo helps users explore stays that may connect to widely used
                booking platforms for further viewing and booking.
              </p>
            </div>

            <div className="relative mt-12 overflow-hidden rounded-3xl border bg-white py-8 shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

              <div className="marquee flex min-w-max items-center gap-16">
                {bookingLogos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="flex h-14 min-w-[140px] items-center justify-center opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="max-h-10 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* What we offer */}
        <section className="bg-white/60 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                What Travelo offers
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Travelo is designed to support travelers looking for affordable stays
                across different preferences, moods, and accommodation types.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                  <Heart className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Handpicked stays
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We focus on curated and visually appealing accommodation options
                  rather than cluttered browsing.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                  <Wallet className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Affordable options
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Our platform highlights budget-friendly and accessible stay options
                  for travelers who want value without sacrificing experience.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                  <Building2 className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Different stay types
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  From cabins and apartments to villas and unique stays, Travelo
                  supports different travel styles and accommodation preferences.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                  <MapPinned className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Simple browsing
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We designed Travelo to help users browse, save favorites, and
                  explore details in a more intuitive and less overwhelming way.
                </p>
              </div>
            </div>
          </div>
        </section>

        
        {/* Vision */}
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] bg-gradient-to-r from-emerald-700 to-teal-600 px-8 py-12 text-white shadow-sm sm:px-12">
              <div className="max-w-4xl">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Globe2 className="h-6 w-6 text-white" />
                </div>

                <h2 className="text-3xl font-bold sm:text-4xl">
                  Our vision for Travelo
                </h2>

                <p className="mt-4 max-w-3xl leading-relaxed text-white/90">
                  We want Travelo to continue growing into a more personalized and
                  user-friendly travel discovery platform, where travelers can save
                  preferences, manage favorites, and find stays that truly match how
                  they want to travel.
                </p>

                <p className="mt-4 max-w-3xl leading-relaxed text-white/85">
                  This project represents our first release and a strong foundation
                  for future features in travel personalization, stay exploration,
                  and affordable trip planning.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .marquee {
          animation: marquee-scroll 22s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
};

export default About;