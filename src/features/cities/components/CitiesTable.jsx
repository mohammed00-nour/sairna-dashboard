
import { Eye, MapPin } from 'lucide-react'

export default function CitiesTable({
  cities = [],
  onView,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-[var(--surface-alt)] text-sm text-[var(--muted)]">
            <tr>
              <th className="whitespace-nowrap px-5 py-4">المدينة</th>
              <th className="whitespace-nowrap px-5 py-4">رقم المدينة</th>
              <th className="whitespace-nowrap px-5 py-4">خط العرض</th>
              <th className="whitespace-nowrap px-5 py-4">خط الطول</th>
              <th className="whitespace-nowrap px-5 py-4">الموقع</th>
              <th className="whitespace-nowrap px-5 py-4">الإجراءات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {cities.map((city) => (
              <tr
                key={city.id}
                className="text-sm text-[var(--text)] transition hover:bg-[var(--surface-alt)]"
              >
                <td className="whitespace-nowrap px-5 py-4 font-semibold">
                  {city.name || '—'}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  {city.id}
                </td>

                <td className="whitespace-nowrap px-5 py-4" dir="ltr">
                  {city.latitude ?? '—'}
                </td>

                <td className="whitespace-nowrap px-5 py-4" dir="ltr">
                  {city.longitude ?? '—'}
                </td>

                <td className="px-5 py-4">
                  <a
                    href={`https://www.google.com/maps?q=${city.latitude},${city.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-[var(--soft-teal)] px-3 py-2 text-xs font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
                  >
                    <MapPin size={15} />
                    عرض على الخريطة
                  </a>
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => onView?.(city)}
                    title="عرض التفاصيل"
                    aria-label={`عرض تفاصيل مدينة ${city.name || city.id}`}
                    className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--surface-alt)] hover:text-[var(--text)]"
                  >
                    <Eye size={17} />
                  </button>
                </td>
              </tr>
            ))}

            {cities.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-[var(--muted)]"
                >
                  لا توجد مدن لعرضها
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
