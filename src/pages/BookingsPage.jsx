
import { useState } from 'react'
import { Ticket, CheckCircle2, XCircle } from 'lucide-react'

import { useBookings } from '../features/bookings/hooks/useBookings'
import BookingsTable from '../features/bookings/components/BookingsTable'
import BookingDetails from '../features/bookings/components/BookingDetails'

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState(null)

  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useBookings()

  if (isLoading) {
    return (
      <div className="py-10 text-center text-[var(--muted)]">
        جاري تحميل الحجوزات...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        {error?.response?.data?.message || 'حدث خطأ أثناء جلب الحجوزات'}
      </div>
    )
  }

  const totalBookings = bookings?.length || 0

  const confirmedBookings =
    bookings?.filter((booking) => booking.status === 'CONFIRMED').length || 0

  const cancelledBookings =
    bookings?.filter((booking) => booking.status === 'CANCELLED').length || 0

  const stats = [
    {
      title: 'إجمالي الحجوزات',
      value: totalBookings,
      icon: Ticket,
      iconStyle: 'bg-[var(--soft-teal)] text-[var(--primary)]',
    },
    {
      title: 'الحجوزات المؤكدة',
      value: confirmedBookings,
      icon: CheckCircle2,
      iconStyle: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'الحجوزات الملغاة',
      value: cancelledBookings,
      icon: XCircle,
      iconStyle: 'bg-red-100 text-red-500',
    },
  ]

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">
          الحجوزات
        </h1>

        <p className="mt-2 text-sm text-[var(--muted)]">
          إدارة ومتابعة حجوزات العملاء
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div>
                <p className="text-sm font-medium text-[var(--muted)]">
                  {stat.title}
                </p>

                <p className="mt-3 text-2xl font-bold text-[var(--text)]">
                  {stat.value.toLocaleString('en-US')}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={23} />
              </div>
            </div>
          )
        })}
      </div>

      <BookingsTable
        bookings={bookings || []}
        onView={(booking) => setSelectedBooking(booking)}
      />

      {selectedBooking && (
        <BookingDetails
          bookingId={selectedBooking.id}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </section>
  )
}
