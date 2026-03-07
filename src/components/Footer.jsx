import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-travelo-green-soft text-travelo-green">
                <span className="text-base font-semibold">T</span>
              </div>
              <span className="text-base font-semibold text-slate-900">
                Travelo
              </span>
            </div>
            <p className="mt-2 max-w-sm text-xs text-slate-500 sm:text-sm">
              Helping everyday travelers find comfortable, fairly-priced
              accommodations across cities and nature getaways.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <h4 className="font-semibold text-slate-900">Explore</h4>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link to="/stays" className="hover:text-travelo-green">
                    Stays
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-travelo-green">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-travelo-green">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Contact</h4>
              <ul className="mt-2 space-y-1">
                <li className="text-slate-500">support@travelo.app</li>
                <li className="text-slate-500">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-emerald-100 pt-4 text-xs text-slate-400 sm:flex sm:items-center sm:justify-between">
          <p>© {year} Travelo. All rights reserved.</p>
          <div className="mt-2 flex gap-4 sm:mt-0">
            <button type="button" className="hover:text-travelo-green">
              Terms
            </button>
            <button type="button" className="hover:text-travelo-green">
              Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

