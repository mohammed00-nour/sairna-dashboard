import { useState } from 'react'
import { Users, UserRound, ShieldCheck } from 'lucide-react'

import { useUsers } from '../features/users/hooks/useUsers'
import UsersTable from '../features/users/components/UsersTable'
import UserDetails from '../features/users/components/UserDetails'

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(null)

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useUsers()

  if (isLoading) {
    return (
      <div className="py-10 text-center text-[var(--muted)]">
        جاري تحميل المستخدمين...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        {error?.response?.data?.message ||
          'حدث خطأ أثناء جلب المستخدمين'}
      </div>
    )
  }

  const totalUsers = users?.length || 0

  const regularUsers =
    users?.filter((user) => user.role === 'USER').length || 0

  const adminUsers =
    users?.filter((user) => user.role === 'ADMIN').length || 0

  const stats = [
    {
      title: 'إجمالي المستخدمين',
      value: totalUsers,
      icon: Users,
      iconStyle: 'bg-[var(--soft-teal)] text-[var(--primary)]',
    },
    {
      title: 'المستخدمون العاديون',
      value: regularUsers,
      icon: UserRound,
      iconStyle: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'المديرون',
      value: adminUsers,
      icon: ShieldCheck,
      iconStyle: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">
          المستخدمون
        </h1>

        <p className="mt-2 text-sm text-[var(--muted)]">
          إدارة ومتابعة حسابات المستخدمين
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

      <UsersTable
        users={users || []}
        onView={(user) => setSelectedUser(user)}
      />

      {selectedUser && (
        <UserDetails
          userId={selectedUser.id}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </section>
  )
}