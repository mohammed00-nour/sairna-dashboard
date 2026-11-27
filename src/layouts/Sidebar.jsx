
import { NavLink, useNavigate } from 'react-router-dom'

import {
  LayoutDashboard,
  Building2,
  BusFront,
  Ticket,
  Users,
  MapPin,
  LogOut,
  ChevronLeft,
} from 'lucide-react'

import useAuthStore from '../stores/authStore'

const navLinks = [
  { title: 'لوحة المعلومات', path: '/', icon: LayoutDashboard },
  { title: 'شركات النقل', path: '/companies', icon: Building2 },
  { title: 'الرحلات', path: '/trips', icon: BusFront },
  { title: 'الحجوزات', path: '/bookings', icon: Ticket },
  { title: 'المستخدمون', path: '/users', icon: Users },
  { title: 'المدن', path: '/cities', icon: MapPin },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const handleLogout = () => {
    clearAuth()
    navigate('/login', { replace: true })
  }

  return (
    <aside
      dir="rtl"
      className="fixed right-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-l border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition-colors duration-300"
    >
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-[var(--border)] px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
            <BusFront size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              سيرنا
            </h1>
            <p className="text-xs text-[var(--muted)]">
              لوحة التحكم
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3 py-7">
        {navLinks.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-teal-900/15'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text)]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon size={19} />
                <span className="text-sm font-medium">
                  {item.title}
                </span>
              </div>

              <ChevronLeft size={15} className="opacity-50" />
            </NavLink>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[var(--border)] p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[var(--muted)] transition-colors hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut size={19} />
          <span className="text-sm font-medium">
            تسجيل الخروج
          </span>
        </button>
      </div>
    </aside>
  )
}
