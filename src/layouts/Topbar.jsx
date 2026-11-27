
import { Sun, Moon } from 'lucide-react'
import useThemeStore from '../stores/themeStore'
import GlobalSearch from '../../src/components/GlobalSearch'

export default function Topbar() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-30 flex h-20 shrink-0 items-center justify-between gap-6 border-b border-[var(--border)] bg-[var(--surface)] px-6 transition-colors duration-300"
    >
      <div className="shrink-0">
        <h1 className="text-xl font-bold text-[var(--text)]">
          لوحة المعلومات
        </h1>
        <p className="mt-1 text-xs text-[var(--muted)]">
          أهلاً بك في لوحة تحكم سيرنا
        </p>
      </div>

      <GlobalSearch />

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-2.5 text-[var(--text)] transition hover:border-[var(--primary)]"
          aria-label={
            theme === 'dark'
              ? 'تفعيل الوضع النهاري'
              : 'تفعيل الوضع الليلي'
          }
          title={
            theme === 'dark'
              ? 'الوضع النهاري'
              : 'الوضع الليلي'
          }
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  )
}
    