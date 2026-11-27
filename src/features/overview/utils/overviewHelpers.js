
const getDamascusDateKey = (date) => {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Damascus',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(date)

    const values = Object.fromEntries(
        parts.map((part) => [part.type, part.value]),
    )

    return `${values.year}-${values.month}-${values.day}`
}

export const getLastSevenDaysBookings = (bookings = []) => {
    const todayKey = getDamascusDateKey(new Date())
    const [year, month, day] = todayKey.split('-').map(Number)

    const today = new Date(Date.UTC(year, month - 1, day))

    const days = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(today)

        date.setUTCDate(date.getUTCDate() - (6 - index))

        return {
            key: date.toISOString().slice(0, 10),
            day: new Intl.DateTimeFormat('ar-SY', {
                day: 'numeric',
                month: 'short',
                timeZone: 'UTC',
            }).format(date),
            bookings: 0,
        }
    })

    const counts = new Map(
        days.map((item) => [item.key, 0]),
    )

    bookings.forEach((booking) => {
        if (!booking.createdAt) return

        const date = new Date(booking.createdAt)

        if (Number.isNaN(date.getTime())) return

        const key = getDamascusDateKey(date)

        if (counts.has(key)) {
            counts.set(key, counts.get(key) + 1)
        }
    })

    return days.map(({ key, day }) => ({
        day,
        bookings: counts.get(key),
    }))
}

export const getBookingStatusData = (bookings = []) => {
    const counts = bookings.reduce(
        (acc, booking) => {
            if (booking.status === 'CONFIRMED') {
                acc.CONFIRMED += 1
            }

            if (booking.status === 'CANCELLED') {
                acc.CANCELLED += 1
            }

            return acc
        },
        {
            CONFIRMED: 0,
            CANCELLED: 0,
        },
    )

    return [
        {
            name: 'مؤكدة',
            status: 'CONFIRMED',
            value: counts.CONFIRMED,
        },
        {
            name: 'ملغاة',
            status: 'CANCELLED',
            value: counts.CANCELLED,
        },
    ]
}

export const getRecentBookings = (bookings = []) => {
    return [...bookings]
        .sort(
            (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt),
        )
        .slice(0, 5)
}

export const getUpcomingTrips = (trips = []) => {
  const now = Date.now()

  return trips
    .filter((trip) => {
      const departureTime = new Date(trip.departureAt).getTime()

      return departureTime > now && trip.status !== 'CANCELLED'
    })
    .sort(
      (a, b) =>
        new Date(a.departureAt) - new Date(b.departureAt),
    )
}