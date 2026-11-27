
import { Link } from 'react-router-dom'
import { BusFront, ArrowLeft, Clock3, Ticket } from 'lucide-react'

import { useTrips } from '../hooks/useTrips'
import { getUpcomingTrips } from '../utils/overviewHelpers'

const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ar-SY', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Damascus',
    })
}

const formatRemainingTime = (departureAt) => {
    const difference = new Date(departureAt).getTime() - Date.now()

    if (difference <= 0) return 'انطلقت الرحلة'

    const minutes = Math.ceil(difference / (1000 * 60))

    if (minutes < 60) {
        return `بعد ${minutes} دقيقة`
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours < 24) {
        return remainingMinutes
            ? `بعد ${hours} ساعة و ${remainingMinutes} دقيقة`
            : `بعد ${hours} ساعة`
    }

    const days = Math.floor(hours / 24)

    return `بعد ${days} يوم`
}

const formatPrice = (price) => {
    return `${Number(price || 0).toLocaleString('en-US')} ل.س`
}

const getStatus = (status) => {
    const statuses = {
        AVAILABLE: {
            label: 'متاحة',
            className: 'bg-emerald-500/10 text-emerald-600',
        },
        CANCELLED: {
            label: 'ملغاة',
            className: 'bg-red-500/10 text-red-500',
        },
        COMPLETED: {
            label: 'مكتملة',
            className: 'bg-blue-500/10 text-blue-600',
        },
    }

    return statuses[status] || {
        label: status || 'غير محددة',
        className: 'bg-gray-500/10 text-gray-500',
    }
}

export default function UpcomingTrips() {
    const {
        data: tripsData,
        isPending,
        isError,
    } = useTrips()

    const upcomingTrips = getUpcomingTrips(tripsData).slice(0, 5)

    return (
        <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] p-5">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
                        <BusFront size={21} />
                    </div>

                    <div className="min-w-0">
                        <h3 className="font-bold text-[var(--text)]">
                            أقرب الرحلات
                        </h3>

                        <p className="mt-1 text-xs text-[var(--muted)]">
                            الرحلات القادمة على المنصة
                        </p>
                    </div>
                </div>

                <Link
                    to="/trips"
                    className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--primary-deep)]"
                >
                    عرض الكل
                    <ArrowLeft size={16} />
                </Link>
            </div>

            {/* Loading */}
            {isPending && (
                <div className="p-10 text-center text-sm text-[var(--muted)]">
                    جاري تحميل الرحلات القادمة...
                </div>
            )}

            {/* Error */}
            {isError && (
                <div className="p-10 text-center text-sm text-red-500">
                    حدث خطأ أثناء تحميل الرحلات
                </div>
            )}

            {/* Empty State */}
            {!isPending && !isError && upcomingTrips.length === 0 && (
                <div className="p-10 text-center">
                    <BusFront
                        size={35}
                        className="mx-auto mb-3 text-[var(--muted)]"
                    />

                    <p className="font-semibold text-[var(--text)]">
                        لا توجد رحلات قادمة حالياً
                    </p>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                        ستظهر الرحلات المجدولة هنا
                    </p>
                </div>
            )}

            {/* Trips List */}
            {!isPending && !isError && upcomingTrips.length > 0 && (
                <div className="divide-y divide-[var(--border)]">
                    {upcomingTrips.map((trip) => {
                        const status = getStatus(trip.status)

                        return (
                            <div
                                key={trip.id}
                                className="flex min-w-0 flex-col gap-4 p-4 transition-colors hover:bg-[var(--surface-alt)] lg:flex-row lg:items-center lg:justify-between"
                            >
                                {/* Route */}
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
                                        <BusFront size={22} />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 font-bold text-[var(--text)]">
                                            <span>{trip.origin?.name || '—'}</span>

                                            <ArrowLeft
                                                size={15}
                                                className="shrink-0 text-[var(--primary)]"
                                            />

                                            <span>{trip.destination?.name || '—'}</span>
                                        </div>

                                        <p className="mt-1 text-xs text-[var(--muted)]">
                                            {trip.company?.name || '—'}
                                        </p>

                                        <p className="mt-1 text-[11px] text-[var(--muted)]">
                                            {trip.code || `رحلة #${trip.id}`}
                                        </p>
                                    </div>
                                </div>

                                {/* Trip Details */}
                                <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
                                    <div>
                                        <p className="mb-1 text-xs text-[var(--muted)]">
                                            موعد الانطلاق
                                        </p>

                                        <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text)]">
                                            <Clock3
                                                size={14}
                                                className="shrink-0 text-[var(--primary)]"
                                            />
                                            {formatTime(trip.departureAt)}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-xs text-[var(--muted)]">
                                            الوقت المتبقي
                                        </p>

                                        <span className="inline-flex whitespace-nowrap rounded-full bg-[var(--soft-teal)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                                            {formatRemainingTime(trip.departureAt)}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-xs text-[var(--muted)]">
                                            السعر
                                        </p>

                                        <p className="whitespace-nowrap text-sm font-bold text-[var(--text)]">
                                            {formatPrice(trip.price)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-xs text-[var(--muted)]">
                                            إجمالي المقاعد
                                        </p>

                                        <div className="flex items-center gap-1 text-sm font-semibold text-[var(--text)]">
                                            <Ticket
                                                size={14}
                                                className="text-[var(--muted)]"
                                            />
                                            {trip.totalSeats ?? '—'}
                                        </div>
                                    </div>

                                    <span
                                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                                    >
                                        {status.label}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}
