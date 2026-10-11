export default function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName = 'bg-indigo-50 text-indigo-600',
  note = '',
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 break-words text-2xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-3 ${iconClassName}`}>
          {Icon && <Icon size={22} />}
        </div>
      </div>

      {note && (
        <p className="mt-4 text-xs text-slate-500">
          {note}
        </p>
      )}
    </div>
  )
}