export default function CompanyLogo({ logoUrl, name }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-alt)]">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`شعار ${name}`}
          className="h-full w-full object-contain p-1"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      ) : (
        <span className="text-lg font-bold text-[var(--muted)]">
          {name?.charAt(0) || '?'}
        </span>
      )}
    </div>
  )
}