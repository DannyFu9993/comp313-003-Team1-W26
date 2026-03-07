import { Link } from 'react-router-dom'

function AccommodationCard({ stay }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft-card ring-1 ring-emerald-50">
      <div
        className="h-44 w-full bg-cover bg-center sm:h-52"
        style={{
          backgroundImage: `url('${stay.imageUrl}')`,
        }}
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              {stay.title}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">{stay.location}</p>
          </div>
          <div className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
            ★ {stay.rating.toFixed(1)}
          </div>
        </div>
        <p className="line-clamp-2 text-xs text-slate-600 sm:text-sm">
          {stay.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <div>
            <p className="text-sm font-semibold text-slate-900 sm:text-base">
              ${stay.pricePerNight}
              <span className="text-xs font-normal text-slate-500">
                {' '}
                / night
              </span>
            </p>
            <p className="text-[11px] text-slate-500">
              Taxes and fees shown upfront
            </p>
          </div>
          <Link
            to={`/stays/${stay.id}`}
            className="inline-flex items-center justify-center rounded-full bg-travelo-green px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-travelo-green-dark sm:px-4 sm:text-sm"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default AccommodationCard

