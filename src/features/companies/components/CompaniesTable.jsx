
import { Eye, Pencil, Trash2 } from 'lucide-react'

import CompanyLogo from './CompanyLogo'

export default function CompaniesTable({
  companies = [],
  onEdit,
  onDelete,
  onView,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-right">
          <thead className="border-b border-[var(--border)] bg-[var(--surface-alt)]">
            <tr className="text-sm text-[var(--muted)]">
              <th className="px-6 py-4 font-semibold">الشركة</th>
              <th className="px-6 py-4 font-semibold">رقم الشركة</th>
              <th className="px-6 py-4 font-semibold">الحالة</th>
              <th className="px-6 py-4 text-center font-semibold">
                الإجراءات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {companies.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-sm text-[var(--muted)]"
                >
                  لا توجد شركات لعرضها
                </td>
              </tr>
            ) : (
              companies.map((company) => (
                <tr
                  key={company.id}
                  className="transition-colors hover:bg-[var(--surface-alt)]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CompanyLogo
                        logoUrl={company.logoUrl}
                        name={company.name}
                      />

                      <span className="font-semibold text-[var(--text)]">
                        {company.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[var(--muted)]">
                    #{company.id}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        company.isActive
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg-gray-500/10 text-gray-500'
                      }`}
                    >
                      {company.isActive ? 'مفعّلة' : 'غير مفعّلة'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onView?.(company)}
                        className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                        aria-label="عرض تفاصيل الشركة"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit?.(company)}
                        className="rounded-lg p-2 text-[var(--primary)] transition hover:bg-[var(--primary)]/10"
                        aria-label="تعديل الشركة"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete?.(company)}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
                        aria-label="أرشفة الشركة"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
