
import { useState } from 'react'
import {
  X,
  Ticket,
  UserRound,
  BusFront,
  MapPin,
  Armchair,
  Wallet,
  CalendarDays,
  Mail,
  AlertTriangle,
  LoaderCircle,
} from 'lucide-react'

import { useBooking } from '../hooks/useBooking'
import { useCancelBooking } from '../hooks/useCancelBooking'

const BOOKING_STATUS = {
  CONFIRMED: 'مؤكد',
  CANCELLED: 'ملغى',
}

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
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

export default function BookingDetails({ bookingId, onClose }) {
  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useBooking(bookingId)

  const cancelMutation = useCancelBooking()

  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [cancelMessage, setCancelMessage] = useState('')

  const trip = booking?.trip
  const seats = booking?.seats || []

  const handleCancel = () => {
    setCancelMessage('')

    cancelMutation.mutate(bookingId, {
      onSuccess: () => {
        setShowCancelConfirm(false)
        setCancelMessage('تم إلغاء الحجز بنجاح')
      },
      onError: (error) => {
        setCancelMessage(
          error?.response?.data?.message ||
            'حدث خطأ أثناء إلغاء الحجز، يرجى المحاولة مرة أخرى',
        )
      },
    })
  }

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
              تفاصيل الحجز
            </h2>

            {booking && (
              <p className="mt-1 text-sm text-[var(--muted)]" dir="ltr">
                {booking.code}
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
              جاري تحميل تفاصيل الحجز...
            </div>
          )}

          {isError && (
            <div className="py-12 text-center text-red-500">
              {error?.response?.data?.message ||
                'حدث خطأ أثناء جلب تفاصيل الحجز'}
            </div>
          )}

          {booking && !isLoading && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--surface-alt)] p-4">
                <div className="flex items-center gap-3">
                  <Ticket size={22} className="text-[var(--primary)]" />

                  <div>
                    <p className="text-xs text-[var(--muted)]">
                      رمز الحجز
                    </p>

                    <p
                      className="mt-1 font-bold text-[var(--text)]"
                      dir="ltr"
                    >
                      {booking.code || '—'}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    booking.status === 'CONFIRMED'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {BOOKING_STATUS[booking.status] || booking.status || '—'}
                </span>
              </div>

              {cancelMessage && (
                <div
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    cancelMutation.isError
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {cancelMessage}
                </div>
              )}

              <section className="space-y-4">
                <h3 className="font-bold text-[var(--text)]">
                  بيانات العميل
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <DetailItem
                    icon={UserRound}
                    label="اسم العميل"
                    value={booking.user?.name}
                  />

                  <DetailItem
                    icon={Mail}
                    label="البريد الإلكتروني"
                    value={booking.user?.email}
                  />
                </div>
              </section>

              <div className="border-t border-[var(--border)]" />

              <section className="space-y-4">
                <h3 className="font-bold text-[var(--text)]">
                  بيانات الرحلة
                </h3>

                <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-alt)] p-4">
                  {trip?.company?.logoUrl ? (
                    <img
                      src={trip.company.logoUrl}
                      alt={trip.company.name || 'شركة النقل'}
                      className="h-12 w-12 rounded-xl border border-[var(--border)] bg-white object-contain p-1"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
                      <BusFront size={23} />
                    </div>
                  )}

                  <div>
                    <p className="font-bold text-[var(--text)]">
                      {trip?.company?.name || '—'}
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted)]" dir="ltr">
                      {trip?.code || '—'}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <DetailItem
                    icon={MapPin}
                    label="مدينة الانطلاق"
                    value={trip?.origin?.name}
                  />

                  <DetailItem
                    icon={MapPin}
                    label="مدينة الوصول"
                    value={trip?.destination?.name}
                  />

                  <DetailItem
                    icon={CalendarDays}
                    label="موعد الانطلاق"
                    value={formatDate(trip?.departureAt)}
                  />

                  <DetailItem
                    icon={CalendarDays}
                    label="موعد الوصول"
                    value={formatDate(trip?.arrivalAt)}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm text-[var(--muted)]">
                    حالة الرحلة
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      trip?.status === 'AVAILABLE'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {TRIP_STATUS[trip?.status] || trip?.status || '—'}
                  </span>
                </div>
              </section>

              <div className="border-t border-[var(--border)]" />

              <section className="space-y-4">
                <h3 className="font-bold text-[var(--text)]">
                  المقاعد والمسافرون
                </h3>

                {seats.length > 0 ? (
                  <div className="space-y-3">
                    {seats.map((seat) => (
                      <div
                        key={seat.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
                            <Armchair size={20} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-[var(--text)]">
                              {seat.passengerName || '—'}
                            </p>

                            <p
                              className="mt-1 text-xs text-[var(--muted)]"
                              dir="ltr"
                            >
                              {seat.passengerPhone || '—'}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-lg bg-[var(--surface-alt)] px-3 py-2 text-sm font-semibold text-[var(--text)]">
                          المقعد {seat.seatNumber}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl bg-[var(--surface-alt)] px-4 py-6 text-center text-sm text-[var(--muted)]">
                    لا توجد مقاعد مرتبطة بهذا الحجز
                  </p>
                )}
              </section>

              <div className="border-t border-[var(--border)]" />

              <section className="space-y-4">
                <h3 className="font-bold text-[var(--text)]">
                  ملخص الحجز
                </h3>

                <DetailItem
                  icon={Armchair}
                  label="عدد المقاعد"
                  value={seats.length}
                />

                <DetailItem
                  icon={Wallet}
                  label="الإجمالي"
                  value={formatPrice(booking.totalPrice)}
                />

                <DetailItem
                  icon={CalendarDays}
                  label="تاريخ إنشاء الحجز"
                  value={formatDate(booking.createdAt)}
                />

                {booking.cancelledAt && (
                  <DetailItem
                    icon={CalendarDays}
                    label="تاريخ إلغاء الحجز"
                    value={formatDate(booking.cancelledAt)}
                  />
                )}
              </section>

              {booking.status === 'CONFIRMED' && (
                <>
                  <div className="border-t border-[var(--border)]" />

                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => {
                        setCancelMessage('')
                        setShowCancelConfirm(true)
                      }}
                      disabled={cancelMutation.isPending}
                      className="rounded-xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      إلغاء الحجز
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {showCancelConfirm && (
        <div
          className="fixed inset-y-0 left-0 right-64 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => {
            if (!cancelMutation.isPending) {
              setShowCancelConfirm(false)
            }
          }}
        >
          <div
            dir="rtl"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle size={25} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[var(--text)]">
              تأكيد إلغاء الحجز
            </h3>

            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              هل أنت متأكد من إلغاء هذا الحجز؟ لا يمكن التراجع عن هذه العملية
              بعد تنفيذها.
            </p>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCancelConfirm(false)}
                disabled={cancelMutation.isPending}
                className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-alt)] disabled:opacity-50"
              >
                تراجع
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelMutation.isPending}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cancelMutation.isPending && (
                  <LoaderCircle size={17} className="animate-spin" />
                )}

                {cancelMutation.isPending
                  ? 'جاري الإلغاء...'
                  : 'تأكيد الإلغاء'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
