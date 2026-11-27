
const STATUS_LABELS = {
  CONFIRMED: 'مؤكد',
  CANCELLED: 'ملغى',
}

export default function BookingsTable({ bookings = [], onView }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-[var(--surface-alt)] text-sm text-[var(--muted)]">
            <tr>
              <th className="whitespace-nowrap px-5 py-4">رمز الحجز</th>
              <th className="whitespace-nowrap px-5 py-4">العميل</th>
              <th className="whitespace-nowrap px-5 py-4">شركة النقل</th>
              <th className="whitespace-nowrap px-5 py-4">المسار</th>
              <th className="whitespace-nowrap px-5 py-4">المقاعد</th>
              <th className="whitespace-nowrap px-5 py-4">الحالة</th>
              <th className="whitespace-nowrap px-5 py-4">الإجراءات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="text-sm text-[var(--text)] transition hover:bg-[var(--surface-alt)]"
              >
                <td className="whitespace-nowrap px-5 py-4 font-semibold" dir="ltr">
                  {booking.code || '—'}
                </td>

                <td className="px-5 py-4">
                  {booking.user?.name || '—'}
                </td>

                <td className="px-5 py-4">
                  {booking.trip?.company?.name || '—'}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  {booking.trip?.origin?.name || '—'}
                  <span className="mx-2 text-[var(--muted)]">←</span>
                  {booking.trip?.destination?.name || '—'}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  {booking.seats?.length
                    ? booking.seats.map((seat) => seat.seatNumber).join(' ، ')
                    : '—'}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                      booking.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {STATUS_LABELS[booking.status] || booking.status || '—'}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => onView?.(booking)}
                    className="whitespace-nowrap rounded-lg bg-[var(--soft-teal)] px-3 py-2 text-xs font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
                  >
                    عرض التفاصيل
                  </button>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-[var(--muted)]"
                >
                  لا توجد حجوزات لعرضها
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
