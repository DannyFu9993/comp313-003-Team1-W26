function BenefitsSection() {
  const benefits = [
    {
      title: 'Easy booking',
      description:
        'Search, compare, and reserve your stay in just a few clicks with a clear, simple flow.',
    },
    {
      title: 'Transparent pricing',
      description:
        'See the full price upfront, including taxes and fees, so you can plan with confidence.',
    },
    {
      title: 'Comfortable stays',
      description:
        'From private rooms to whole apartments, find clean, cozy spaces that feel like home.',
    },
    {
      title: 'Great destinations',
      description:
        'Stay close to transit, attractions, and green spaces across cities and hidden gems.',
    },
  ]

  return (
    <section className="bg-travelo-green-soft/60 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Why travelers choose Travelo
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
              Built for everyday travelers who want the right balance of comfort,
              value, and ease, without compromising on quality.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col gap-2 rounded-2xl bg-white/70 p-4 text-sm text-slate-700 ring-1 ring-emerald-50 backdrop-blur sm:p-5"
            >
              <div className="h-9 w-9 rounded-xl bg-emerald-50" />
              <h3 className="text-base font-semibold text-slate-900">
                {benefit.title}
              </h3>
              <p className="text-xs text-slate-600 sm:text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection

