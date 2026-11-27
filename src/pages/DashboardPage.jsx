
import {
    Users,
    Building2,
    BusFront,
    Ticket,
    BadgeCheck,
} from 'lucide-react'

import { useOverview } from '../features/overview/hooks/useOverview'
import { useBookings } from '../features/bookings/hooks/useBookings'

import BookingsChart from '../features/overview/components/BookingsChart'
import BookingStatusChart from '../features/overview/components/BookingStatusChart'
import RecentBookings from '../features/overview/components/RecentBookings'
import UpcomingTrips from '../features/overview/components/UpcomingTrips'

import {
    getLastSevenDaysBookings,
    getBookingStatusData,
    getRecentBookings,
} from '../features/overview/utils/overviewHelpers'

export default function DashboardPage() {
    const {
        data,
        isError,
        error,
    } = useOverview()

    const {
        data: bookingsData,
        isError: isBookingsError,
    } = useBookings()

    // Prepare Data
    const chartData = getLastSevenDaysBookings(bookingsData)
    const statusData = getBookingStatusData(bookingsData)
    const recentBookings = getRecentBookings(bookingsData)

    // Statistics Cards
    const stats = [
        {
            title: 'إجمالي العملاء',
            value: data?.customers,
            icon: Users,
        },
        {
            title: 'شركات النقل',
            value: data?.companies,
            icon: Building2,
        },
        {
            title: 'الرحلات القادمة',
            value: data?.upcomingTrips,
            icon: BusFront,
        },
        {
            title: 'إجمالي الحجوزات',
            value: data?.totalBookings,
            icon: Ticket,
        },
        {
            title: 'الحجوزات المؤكدة',
            value: data?.confirmedBookings,
            icon: BadgeCheck,
        },
    ]

    // Error State
    if (isError) {
        return (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-red-500">
                {error?.response?.data?.message ||
                    'حدث خطأ أثناء تحميل إحصائيات لوحة التحكم'}
            </div>
        )
    }

    return (
        <div className="space-y-7">
            {/* Page Heading */}
            <div>
                <h2 className="text-2xl font-bold text-[var(--text)]">
                    نظرة عامة
                </h2>

                <p className="mt-2 text-sm text-[var(--muted)]">
                    إليك ملخصاً عن نشاط منصة سيرنا
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-colors duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[var(--muted)]">
                                        {stat.title}
                                    </p>

                                    <h3 className="mt-3 text-3xl font-bold text-[var(--text)]">
                                        {stat.value ?? 0}
                                    </h3>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
                                    <Icon size={23} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
                {/* Bookings Chart */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm xl:col-span-2">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-[var(--text)]">
                            الحجوزات خلال آخر 7 أيام
                        </h3>

                        <p className="mt-1 text-sm text-[var(--muted)]">
                            إحصائيات الحجوزات اليومية
                        </p>
                    </div>

                    {isBookingsError ? (
                        <div className="flex h-80 items-center justify-center text-red-500">
                            تعذر تحميل بيانات الحجوزات
                        </div>
                    ) : (
                        <BookingsChart data={chartData} />
                    )}
                </div>

                {/* Booking Status Chart */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-[var(--text)]">
                            حالات الحجوزات
                        </h3>

                        <p className="mt-1 text-sm text-[var(--muted)]">
                            توزيع الحجوزات حسب الحالة
                        </p>
                    </div>

                    {isBookingsError ? (
                        <div className="flex h-72 items-center justify-center text-red-500">
                            تعذر تحميل البيانات
                        </div>
                    ) : (
                        <BookingStatusChart data={statusData} />
                    )}
                </div>
            </div>

            {/* Recent Bookings */}
            {isBookingsError ? (
                <div className="flex min-h-40 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-red-500">
                    تعذر تحميل أحدث الحجوزات
                </div>
            ) : (
                <RecentBookings data={recentBookings} />
            )}

            {/* Upcoming Trips */}
            <UpcomingTrips />
        </div>
    )
}
