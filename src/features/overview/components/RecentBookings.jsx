
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const STATUS_LABELS = {
    CONFIRMED: 'مؤكد',
    CANCELLED: 'ملغى',
}

const formatDate = (date) => {
    if (!date) return '—'

    return new Date(date).toLocaleDateString('ar-SY', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Damascus',
    })
}

const formatPrice = (price) => {
    return `${Number(price || 0).toLocaleString('en-US')} ل.س`
}

export default function RecentBookings({ data = [] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] p-5">
                <div>
                    <h3 className="text-lg font-bold text-[var(--text)]">
                        أحدث الحجوزات
                    </h3>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                        آخر 5 حجوزات تم إنشاؤها على المنصة
                    </p>
                </div>

                <Link
                    to="/bookings"
                    className="flex items-center gap-1 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--primary-deep)]"
                >
                    عرض الكل
                    <ArrowLeft size={16} />
                </Link>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className="p-10 text-center text-sm text-[var(--muted)]">
                    لا توجد حجوزات حتى الآن
                </div>
            ) : (
                /* Bookings Table */
                <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <table className="w-full min-w-[850px] text-right">
                        <thead className="bg-[var(--surface-alt)] text-sm text-[var(--muted)]">
                            <tr>
                                <th className="px-5 py-4 font-medium">رقم الحجز</th>
                                <th className="px-5 py-4 font-medium">العميل</th>
                                <th className="px-5 py-4 font-medium">الرحلة</th>
                                <th className="px-5 py-4 font-medium">شركة النقل</th>
                                <th className="px-5 py-4 font-medium">تاريخ الحجز</th>
                                <th className="px-5 py-4 font-medium">السعر</th>
                                <th className="px-5 py-4 font-medium">الحالة</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[var(--border)]">
                            {data.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="transition-colors hover:bg-[var(--surface-alt)]"
                                >
                                    <td className="px-5 py-4 text-sm font-semibold text-[var(--primary)]">
                                        {booking.code || '—'}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-medium text-[var(--text)]">
                                        {booking.user?.name || '—'}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-[var(--text)]">
                                        {booking.trip?.origin?.name || '—'}
                                        {' → '}
                                        {booking.trip?.destination?.name || '—'}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-[var(--text)]">
                                        {booking.trip?.company?.name || '—'}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-[var(--muted)]">
                                        {formatDate(booking.createdAt)}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-semibold text-[var(--text)]">
                                        {formatPrice(booking.totalPrice)}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                booking.status === 'CONFIRMED'
                                                    ? 'bg-emerald-500/10 text-emerald-600'
                                                    : 'bg-red-500/10 text-red-500'
                                            }`}
                                        >
                                            {STATUS_LABELS[booking.status] || 'غير معروف'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
