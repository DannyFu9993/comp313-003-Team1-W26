import SearchBar from './SearchBar'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-travelo-green-soft via-white to-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8 lg:py-16">
        <div className="relative z-10 max-w-xl space-y-6">
          <p className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-travelo-green ring-1 ring-emerald-100 backdrop-blur">
            Budget-friendly stays with a boutique feel
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Find your perfect stay,
            <span className="block text-travelo-green">without the stress.</span>
          </h1>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Discover cozy rooms, city apartments, and nature escapes picked for
            comfort and value. With transparent pricing and flexible options,
            Travelo makes planning your next trip feel easy.
          </p>
          <ul className="flex flex-wrap gap-4 text-xs text-slate-600 sm:text-sm">
            <li className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-travelo-green" />
              No hidden resort fees
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-travelo-green" />
              Trusted hosts & verified stays
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-travelo-green" />
              Flexible cancellation options
            </li>
          </ul>
        </div>

        <div className="relative mt-4 w-full md:mt-0 md:max-w-md lg:max-w-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-travelo-green-soft/70 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-100/70 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl bg-slate-900/5 shadow-soft-card">
            <div
              className="h-64 bg-cover bg-center sm:h-72"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(15,23,42,0.65), rgba(15,23,42,0.1)), url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="space-y-3 bg-white px-5 pb-5 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Tonight&apos;s highlights
                </p>
                <p className="text-xs text-slate-500">From $42/night</p>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                Handpicked homes and rooms for every budget.
              </p>
              <p className="text-xs text-slate-500">
                Stay in walkable neighborhoods, near transit, or close to
                nature—without breaking your budget.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-8 pb-4">
        <SearchBar />
      </div>
    </section>
  )
}

export default Hero

