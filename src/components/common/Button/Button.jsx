export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary:
      'bg-slate-100 text-slate-700 hover:bg-slate-200',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700',
  }

  return (
    <button
      type={type}
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}