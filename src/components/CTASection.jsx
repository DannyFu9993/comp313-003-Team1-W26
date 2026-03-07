import { Link } from 'react-router-dom'

function CTASection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex rounded-full bg-travelo-green-soft px-3 py-1 text-xs font-medium text-travelo-green ring-1 ring-emerald-100">
          Ready to plan your next escape?
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Create your free Travelo account
        </h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          Save your favorite stays, compare options easily, and book with
          transparent pricing every time. Join in a minute and start exploring.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-full bg-travelo-green px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-travelo-green-dark"
          >
            Create account
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full border border-emerald-100 bg-white px-6 py-2.5 text-sm font-semibold text-travelo-green transition hover:border-emerald-200 hover:bg-emerald-50"
          >
            Login instead
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection

