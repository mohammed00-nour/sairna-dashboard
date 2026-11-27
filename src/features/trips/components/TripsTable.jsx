
import { Eye, Pencil, Trash2 } from 'lucide-react'

const STATUS_LABELS = {
  AVAILABLE: 'متاحة',
  CANCELLED: 'ملغاة',
}

const formatPrice = (price) => {
  if (price == null) return '—'

  return `${Number(price).toLocaleString('en-US')} ل.س`
}

export default function TripsTable({
  trips = [],
  onView,
  onEdit,
  onCancel,
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <table className="w-full min-w-[850px] text-right">
        <thead className="bg-[var(--surface-alt)] text-sm text-[var(--muted)]">
          <tr>
            <th className="px-5 py-4">رمز الرحلة</th>
            <th className="px-5 py-4">الشركة</th>
            <th className="px-5 py-4">المسار</th>
            <th className="px-5 py-4">السعر</th>
            <th className="px-5 py-4">الحالة</th>
            <th className="px-5 py-4">الإجراءات</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[var(--border)]">
          {trips.map((trip) => (
            <tr
              key={trip.id}
              className="text-sm text-[var(--text)]"
            >
              <td className="px-5 py-4 font-semibold" dir="ltr">
                {trip.code || '—'}
              </td>

              <td className="px-5 py-4">
                {trip.company?.name || '—'}
              </td>

              <td className="whitespace-nowrap px-5 py-4">
                {trip.origin?.name || '—'}
                <span className="mx-2 text-[var(--muted)]">←</span>
                {trip.destination?.name || '—'}
              </td>

              <td className="whitespace-nowrap px-5 py-4">
                {formatPrice(trip.price)}
              </td>

              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    trip.status === 'AVAILABLE'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {STATUS_LABELS[trip.status] || trip.status}
                </span>
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onView?.(trip)}
                    title="عرض التفاصيل"
                    aria-label={`عرض تفاصيل الرحلة ${trip.code || trip.id}`}
                    className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--surface-alt)] hover:text-[var(--text)]"
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit?.(trip)}
                    title="تعديل الرحلة"
                    aria-label={`تعديل الرحلة ${trip.code || trip.id}`}
                    className="rounded-lg p-2 text-[var(--primary)] transition hover:bg-[var(--soft-teal)]"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onCancel?.(trip)}
                    title="إلغاء الرحلة"
                    aria-label={`إلغاء الرحلة ${trip.code || trip.id}`}
                    disabled={trip.status === 'CANCELLED'}
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {trips.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-5 py-10 text-center text-[var(--muted)]"
              >
                لا توجد رحلات لعرضها
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
