
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../features/auth/hooks/useLogin'

export default function LoginPage() {
  const navigate = useNavigate()
  const loginMutation = useLogin()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    loginMutation.mutate(formData, {
      onSuccess: () => {
        navigate('/', { replace: true })
      },
    })
  }

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[var(--bg)] p-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--text)]">
            سيرنا
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            تسجيل الدخول إلى لوحة التحكم
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm text-[var(--text)]">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
            placeholder="admin@gmail.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-[var(--text)]">
            كلمة المرور
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
            placeholder="أدخل كلمة المرور"
          />
        </div>

        {loginMutation.isError && (
          <p className="text-sm text-red-500">
            {loginMutation.error?.response?.data?.message ||
              'حدث خطأ أثناء تسجيل الدخول'}
          </p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-xl bg-[var(--primary)] p-3 font-semibold text-white transition hover:bg-[var(--primary-deep)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loginMutation.isPending
            ? 'جاري تسجيل الدخول...'
            : 'تسجيل الدخول'}
        </button>
      </form>
    </div>
  )
}
