import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-travelo-green-soft text-travelo-green">
            <span className="text-lg font-semibold">T</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold text-slate-900">Travelo</span>
            <span className="text-xs text-slate-500">Budget-friendly stays</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors hover:text-travelo-green ${
                isActive ? 'text-travelo-green' : 'text-slate-600'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/stays"
            className="transition-colors hover:text-travelo-green"
          >
            Stays
          </NavLink>
          <NavLink
            to="/about"
            className="transition-colors hover:text-travelo-green"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="transition-colors hover:text-travelo-green"
          >
            Contact
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-full border border-emerald-100 px-4 py-2 text-sm font-medium text-travelo-green transition hover:border-emerald-200 hover:bg-emerald-50 sm:inline-flex"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex rounded-full bg-travelo-green px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-travelo-green-dark"
          >
            Create Account
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

