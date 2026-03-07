function SearchBar() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 max-w-4xl rounded-2xl bg-white p-4 shadow-soft-card ring-1 ring-emerald-50"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Destination
          </label>
          <input
            type="text"
            placeholder="Where are you going?"
            className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-200 placeholder:text-slate-400 focus:bg-white focus:ring-2"
          />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-4 md:flex md:flex-[1.2]">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Check-in
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-200 placeholder:text-slate-400 focus:bg-white focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Check-out
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-200 placeholder:text-slate-400 focus:bg-white focus:ring-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:w-44 md:flex-none">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Guests
            </label>
            <input
              type="number"
              min="1"
              defaultValue="2"
              className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-200 placeholder:text-slate-400 focus:bg-white focus:ring-2"
            />
          </div>
          <button
            type="submit"
            className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-travelo-green px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-travelo-green-dark"
          >
            Search stays
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar

