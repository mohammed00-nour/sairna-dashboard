import { X, MapPin, Hash, Map } from 'lucide-react'

export default function CityDetails({ city, onClose }) {
  if (!city) return null

  const googleMapsUrl = `https://www.google.com/maps?q=${city.latitude},${city.longitude}`

  return (
    <div
      className="fixed inset-y-0 left-0 right-64 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--text)]">
              تفاصيل المدينة
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              معلومات المدينة وموقعها الجغرافي
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--surface-alt)] hover:text-[var(--text)]"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-5 flex items-center gap-3 rounded-xl bg-[var(--soft-teal)] p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <MapPin size={24} />
          </div>

          <div>
            <h3 className="font-bold text-[var(--text)]">{city.name}</h3>
            <p className="mt-1 text-xs text-[var(--muted)]">
              بيانات المدينة
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4">
            <div className="flex items-center gap-3">
              <Hash size={18} className="text-[var(--muted)]" />
              <span className="text-sm text-[var(--muted)]">رقم المدينة</span>
            </div>
            <span className="font-semibold text-[var(--text)]">{city.id}</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4">
            <div className="flex items-center gap-3">
              <Map size={18} className="text-[var(--muted)]" />
              <span className="text-sm text-[var(--muted)]">خط العرض</span>
            </div>
            <span className="font-semibold text-[var(--text)]">
              {city.latitude ?? '—'}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4">
            <div className="flex items-center gap-3">
              <Map size={18} className="text-[var(--muted)]" />
              <span className="text-sm text-[var(--muted)]">خط الطول</span>
            </div>
            <span className="font-semibold text-[var(--text)]">
              {city.longitude ?? '—'}
            </span>
          </div>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-deep)]"
        >
          <MapPin size={18} />
          عرض الموقع على خرائط Google
        </a>
      </div>
    </div>
  )
}