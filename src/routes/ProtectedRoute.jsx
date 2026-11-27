
import { Navigate, Outlet } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'

import useAuthStore from '../stores/authStore'
import { useMe } from '../features/auth/hooks/useMe'

export default function ProtectedRoute() {
    const accessToken = useAuthStore((state) => state.accessToken)

    const { isPending, isError, error } = useMe()

    if (!accessToken) {
        return <Navigate to="/login" replace />
    }

    if (isPending) {
        return (
            <div
                dir="rtl"
                className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-5"
            >
                <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-8 py-12 text-center shadow-sm">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--soft-teal)]">
                        <LoaderCircle
                            size={42}
                            className="animate-spin text-[var(--primary)]"
                        />
                    </div>

                    <h2 className="text-xl font-bold text-[var(--text)]">
                        جاري التحقق من الجلسة
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                        نتحقق من بيانات حسابك لتجهيز لوحة التحكم بأمان...
                    </p>

                    <div className="mt-7 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-alt)]">
                        <div className="h-full w-1/3 animate-pulse rounded-full bg-[var(--primary)]" />
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        const status = error?.response?.status

        if (status === 401) {
            return <Navigate to="/login" replace />
        }

        return (
            <div
                dir="rtl"
                className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-5"
            >
                <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[var(--surface)] p-8 text-center">
                    <h2 className="text-lg font-bold text-red-500">
                        تعذر التحقق من الجلسة
                    </h2>

                    <p className="mt-3 text-sm text-[var(--muted)]">
                        حاول تحديث الصفحة أو تسجيل الدخول مجدداً.
                    </p>
                </div>
            </div>
        )
    }

    return <Outlet />
}
