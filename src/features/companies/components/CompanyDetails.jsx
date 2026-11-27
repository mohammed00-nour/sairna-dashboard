import { X, Building2, Hash, Globe } from 'lucide-react'
import CompanyLogo from './CompanyLogo'

export default function CompanyDetails({ company, onClose }) {
  if (!company) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-y-0 left-0 right-64 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <div
        dir="rtl"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--text)]">
              تفاصيل الشركة
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              معلومات شركة النقل
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--surface-alt)]"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        {/* Company Info */}
        <div className="mb-5 flex items-center gap-4 rounded-xl bg-[var(--surface-alt)] p-4">
          <CompanyLogo
            logoUrl={company.logoUrl}
            name={company.name}
          />

          <div>
            <h3 className="font-bold text-[var(--text)]">
              {company.name}
            </h3>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                company.isActive
                  ? 'bg-emerald-500/10 text-emerald-600'
                  : 'bg-red-500/10 text-red-500'
              }`}
            >
              {company.isActive ? 'نشطة' : 'غير نشطة'}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4">
            <div className="flex items-center gap-3">
              <Hash size={18} className="text-[var(--muted)]" />
              <span className="text-sm text-[var(--muted)]">
                رقم الشركة
              </span>
            </div>

            <span className="font-semibold text-[var(--text)]">
              {company.id}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4">
            <div className="flex items-center gap-3">
              <Building2 size={18} className="text-[var(--muted)]" />
              <span className="text-sm text-[var(--muted)]">
                اسم الشركة
              </span>
            </div>

            <span className="font-semibold text-[var(--text)]">
              {company.name}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-[var(--muted)]" />
              <span className="text-sm text-[var(--muted)]">
                رابط الشعار
              </span>
            </div>

            {company.logoUrl ? (
              <a
                href={company.logoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[var(--primary)] hover:underline"
              >
                عرض الشعار
              </a>
            ) : (
              <span className="text-sm text-[var(--muted)]">غير متوفر</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}