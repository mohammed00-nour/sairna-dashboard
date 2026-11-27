import {
  X,
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  Hash,
} from 'lucide-react'

import { useUser } from '../hooks/useUser'

const ROLE_LABELS = {
  USER: 'مستخدم',
  ADMIN: 'مدير',
}

const formatDate = (date) => {
  if (!date) return '—'

  return new Date(date).toLocaleString('ar-SY', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Damascus',
  })
}

function DetailItem({ icon: Icon, label, value, dir }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--primary)]">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[var(--muted)]">{label}</p>

        <p
          dir={dir}
          className="mt-1 break-words text-sm font-semibold text-[var(--text)]"
        >
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

export default function UserDetails({ userId, onClose }) {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useUser(userId)

  return (
    <div
      className="fixed inset-y-0 left-0 right-64 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        dir="rtl"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[var(--text)]">
              تفاصيل المستخدم
            </h2>

            {user && (
              <p className="mt-1 text-sm text-[var(--muted)]">
                {user.name}
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
              جاري تحميل تفاصيل المستخدم...
            </div>
          )}

          {isError && (
            <div className="py-12 text-center text-red-500">
              {error?.response?.data?.message ||
                'حدث خطأ أثناء جلب تفاصيل المستخدم'}
            </div>
          )}

          {user && !isLoading && (
            <>
              <div className="flex items-center gap-4 rounded-xl bg-[var(--surface-alt)] p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--soft-teal)] text-[var(--primary)]">
                  <UserRound size={28} />
                </div>

                <div className="min-w-0">
                  <h3 className="break-words text-lg font-bold text-[var(--text)]">
                    {user.name || '—'}
                  </h3>

                  <p className="mt-1 break-all text-sm text-[var(--muted)]" dir="ltr">
                    {user.email || '—'}
                  </p>
                </div>
              </div>

              <section className="space-y-5">
                <h3 className="font-bold text-[var(--text)]">
                  المعلومات الأساسية
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <DetailItem
                    icon={Hash}
                    label="رقم المستخدم"
                    value={user.id}
                  />

                  <DetailItem
                    icon={UserRound}
                    label="الاسم الكامل"
                    value={user.name}
                  />

                  <DetailItem
                    icon={Mail}
                    label="البريد الإلكتروني"
                    value={user.email}
                    dir="ltr"
                  />

                  <DetailItem
                    icon={ShieldCheck}
                    label="الصلاحية"
                    value={ROLE_LABELS[user.role] || user.role}
                  />

                  <DetailItem
                    icon={CalendarDays}
                    label="تاريخ إنشاء الحساب"
                    value={formatDate(user.createdAt)}
                  />
                </div>
              </section>

              <div className="border-t border-[var(--border)]" />

              <div className="flex justify-end">
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