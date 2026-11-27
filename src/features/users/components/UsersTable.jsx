const ROLE_LABELS = {
  USER: 'مستخدم',
  ADMIN: 'مدير',
}

export default function UsersTable({ users = [], onView }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-[var(--surface-alt)] text-sm text-[var(--muted)]">
            <tr>
              <th className="whitespace-nowrap px-5 py-4">المستخدم</th>
              <th className="whitespace-nowrap px-5 py-4">البريد الإلكتروني</th>
              <th className="whitespace-nowrap px-5 py-4">الصلاحية</th>
              <th className="whitespace-nowrap px-5 py-4">تاريخ التسجيل</th>
              <th className="whitespace-nowrap px-5 py-4">الإجراءات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {users.map((user) => (
              <tr
                key={user.id}
                className="text-sm text-[var(--text)] transition hover:bg-[var(--surface-alt)]"
              >
                <td className="whitespace-nowrap px-5 py-4 font-semibold">
                  {user.name || '—'}
                </td>

                <td className="whitespace-nowrap px-5 py-4" dir="ltr">
                  {user.email || '—'}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {ROLE_LABELS[user.role] || user.role || '—'}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('ar-SY', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'Asia/Damascus',
                      })
                    : '—'}
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => onView?.(user)}
                    className="whitespace-nowrap rounded-lg bg-[var(--soft-teal)] px-3 py-2 text-xs font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
                  >
                    عرض التفاصيل
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-[var(--muted)]"
                >
                  لا يوجد مستخدمون لعرضهم
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}