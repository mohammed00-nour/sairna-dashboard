
import {
  X,
  BusFront,
  Hash,
  MapPin,
  CalendarDays,
  Wallet,
  Armchair,
  CheckCircle2,
  Ticket,
} from 'lucide-react'

import { useTrip } from '../hooks/useTrip'
import CompanyLogo from '../../companies/components/CompanyLogo'

const TRIP_STATUS = {
  AVAILABLE: 'متاحة',
  CANCELLED: 'ملغاة',
}

const formatDate = (date) => {
  if (!date) return '—'

  return new Date(date).toLocaleString('ar-SY', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Damascus',
  })
}

const formatPrice = (price) => {
  if (price == null) return '—'

  return `${Number(price).toLocaleString('en-US')} ل.س`
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--primary)]">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[var(--muted)]">{label}</p>

        <p className="mt-1 break-words text-sm font-semibold text-[var(--text)]">
          {value ?? '—'}
        </p>
      </div>
    </div>
  )
}

export default function TripDetails({ tripId, onClose }) {
  const {
    data: trip,
    isLoading,
    isError,
    error,
  } = useTrip(tripId)

  const availableSeats = trip?.availableSeats
  const bookedSeats = trip
    ? trip._count?.bookingSeats ??
      (trip.totalSeats - (availableSeats ?? 0))
    : 0

  return (
    <div
      className="fixed inset-y-0 left-0 right-64 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        dir="rtl"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[var(--text)]">
              تفاصيل الرحلة
            </h2>

            {trip && (
              <p className="mt-1 text-sm text-[var(--muted)]" dir="ltr">
                {trip.code || '—'}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق التفاصيل"
            className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--surface-alt)] hover:text-[var(--text)]"
          >
            <X size={21} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {isLoading && (
            <div className="py-12 text-center text-[var(--muted)]">
              جاري تحميل تفاصيل الرحلة...
            </div>
          )}

          {isError && (
            <div className="py-12 text-center text-red-500">
              {error?.response?.data?.message ||
                'حدث خطأ أثناء جلب تفاصيل الرحلة'}
            </div>
          )}

          {trip && !isLoading && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--surface-alt)] p-4">
                <div className="flex items-center gap-3">
                  <Ticket size={22} className="text-[var(--primary)]" />

                  <div>
                    <p className="text-xs text-[var(--muted)]">
                      رمز الرحلة
                    </p>

                    <p className="mt-1 font-bold text-[var(--text)]" dir="ltr">
                      {trip.code || '—'}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    trip.status === 'AVAILABLE'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {TRIP_STATUS[trip.status] || trip.status || '—'}
                </span>
              </div>

              <section className="space-y-4">
                <h3 className="font-bold text-[var(--text)]">
                  شركة النقل
                </h3>

                <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-alt)] p-4">
                  <CompanyLogo
                    logoUrl={trip.company?.logoUrl}
                    name={trip.company?.name}
                  />

                  <div>
                    <p className="font-bold text-[var(--text)]">
                      {trip.company?.name || '—'}
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      رقم الشركة: {trip.company?.id ?? '—'}
                    </p>
                  </div>
                </div>
              </section>

              <div className="border-t border-[var(--border)]" />

              <section className="space-y-4">
                <h3 className="font-bold text-[var(--text)]">
                  مسار الرحلة
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <DetailItem
                    icon={MapPin}
                    label="مدينة الانطلاق"
                    value={trip.origin?.name}
                  />

                  <DetailItem
                    icon={MapPin}
                    label="مدينة الوصول"
                    value={trip.destination?.name}
                  />

                  <DetailItem
                    icon={Hash}
                    label="رقم مدينة الانطلاق"
                    value={trip.originId}
                  />

                  <DetailItem
                    icon={Hash}
                    label="رقم مدينة الوصول"
                    value={trip.destinationId}
                  />
                </div>
              </section>

              <div className="border-t border-[var(--border)]" />

              <section className="space-y-4">
                <h3 className="font-bold text-[var(--text)]">
                  المواعيد
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <DetailItem
                    icon={CalendarDays}
                    label="موعد الانطلاق"
                    value={formatDate(trip.departureAt)}
                  />

                  <DetailItem
                    icon={CalendarDays}
                    label="موعد الوصول"
                    value={formatDate(trip.arrivalAt)}
                  />
                </div>
              </section>

              <div className="border-t border-[var(--border)]" />

              <section className="space-y-4">
                <h3 className="font-bold text-[var(--text)]">
                  المقاعد والتكلفة
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <DetailItem
                    icon={Wallet}
                    label="سعر المقعد"
                    value={formatPrice(trip.price)}
                  />

                  <DetailItem
                    icon={Armchair}
                    label="إجمالي المقاعد"
                    value={trip.totalSeats}
                  />

                  <DetailItem
                    icon={CheckCircle2}
                    label="المقاعد المتاحة"
                    value={availableSeats ?? '—'}
                  />

                  <DetailItem
                    icon={Ticket}
                    label="المقاعد المحجوزة"
                    value={bookedSeats}
                  />
                </div>
              </section>

              <div className="flex justify-end border-t border-[var(--border)] pt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl bg-[var(--soft-teal)] px-5 py-3 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
                >
                  إغلاق
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
