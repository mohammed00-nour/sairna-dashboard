
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Search,
  Building2,
  BusFront,
  Ticket,
  Users,
  MapPin,
  X,
} from 'lucide-react'

import { useCompanies } from '../features/companies/hooks/useCompanies'
import { useTrips } from '../features/trips/hooks/useTrips'
import { useBookings } from '../features/bookings/hooks/useBookings'
import { useUsers } from '../features/users/hooks/useUsers'
import { useCities } from '../features/cities/hooks/useCities'

import CompanyDetails from '../features/companies/components/CompanyDetails'
import TripDetails from '../features/trips/components/TripDetails'
import BookingDetails from '../features/bookings/components/BookingDetails'
import UserDetails from '../features/users/components/UserDetails'
import CityDetails from '../features/cities/components/CityDetails'

const normalize = (value) => String(value ?? '').toLowerCase().trim()

const matchesSearch = (searchTerm, ...values) => {
  const term = normalize(searchTerm)

  return values.some((value) => normalize(value).includes(term))
}

const RESULT_LIMIT = 5

const GROUPS = [
  {
    type: 'companies',
    title: 'الشركات',
    icon: Building2,
  },
  {
    type: 'trips',
    title: 'الرحلات',
    icon: BusFront,
  },
  {
    type: 'bookings',
    title: 'الحجوزات',
    icon: Ticket,
  },
  {
    type: 'users',
    title: 'المستخدمون',
    icon: Users,
  },
  {
    type: 'cities',
    title: 'المدن',
    icon: MapPin,
  },
]

export default function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedResult, setSelectedResult] = useState(null)
  const [isFocused, setIsFocused] = useState(false)

  const searchRef = useRef(null)

  const isSearchActive = searchTerm.trim().length >= 2

  const { data: companies = [] } = useCompanies(isSearchActive)
  const { data: trips = [] } = useTrips(isSearchActive)
  const { data: bookings = [] } = useBookings(isSearchActive)
  const { data: users = [] } = useUsers(isSearchActive)
  const { data: cities = [] } = useCities(isSearchActive)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setIsFocused(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsFocused(false)
        setSelectedResult(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const results = useMemo(() => {
    if (!isSearchActive) return []

    const companyResults = companies
      .filter((company) =>
        matchesSearch(searchTerm, company.name, company.id)
      )
      .slice(0, RESULT_LIMIT)
      .map((company) => ({
        type: 'companies',
        id: company.id,
        title: company.name,
        subtitle: `رقم الشركة: ${company.id}`,
        item: company,
      }))

    const tripResults = trips
      .filter((trip) =>
        matchesSearch(
          searchTerm,
          trip.code,
          trip.company?.name,
          trip.origin?.name,
          trip.destination?.name,
          trip.id
        )
      )
      .slice(0, RESULT_LIMIT)
      .map((trip) => ({
        type: 'trips',
        id: trip.id,
        title: trip.code || `الرحلة رقم ${trip.id}`,
        subtitle: `${trip.origin?.name || '—'} ← ${trip.destination?.name || '—'}`,
        item: trip,
      }))

    const bookingResults = bookings
      .filter((booking) =>
        matchesSearch(
          searchTerm,
          booking.code,
          booking.user?.name,
          booking.trip?.company?.name,
          booking.trip?.origin?.name,
          booking.trip?.destination?.name,
          booking.id
        )
      )
      .slice(0, RESULT_LIMIT)
      .map((booking) => ({
        type: 'bookings',
        id: booking.id,
        title: booking.code || `الحجز رقم ${booking.id}`,
        subtitle: booking.user?.name || 'بدون اسم عميل',
        item: booking,
      }))

    const userResults = users
      .filter((user) =>
        matchesSearch(searchTerm, user.name, user.email, user.id)
      )
      .slice(0, RESULT_LIMIT)
      .map((user) => ({
        type: 'users',
        id: user.id,
        title: user.name || `المستخدم رقم ${user.id}`,
        subtitle: user.email || 'بدون بريد إلكتروني',
        item: user,
      }))

    const cityResults = cities
      .filter((city) =>
        matchesSearch(searchTerm, city.name, city.id)
      )
      .slice(0, RESULT_LIMIT)
      .map((city) => ({
        type: 'cities',
        id: city.id,
        title: city.name,
        subtitle: `رقم المدينة: ${city.id}`,
        item: city,
      }))

    return [
      ...companyResults,
      ...tripResults,
      ...bookingResults,
      ...userResults,
      ...cityResults,
    ]
  }, [searchTerm, isSearchActive, companies, trips, bookings, users, cities])

  const groupedResults = GROUPS.map((group) => ({
    ...group,
    results: results.filter((result) => result.type === group.type),
  })).filter((group) => group.results.length > 0)

  const handleSelectResult = (result) => {
    setSelectedResult(result)
    setIsFocused(false)
  }

  const handleCloseDetails = () => {
    setSelectedResult(null)
  }

  return (
    <>
      <div ref={searchRef} className="relative w-full max-w-md">
        <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3 transition-colors duration-200 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
          <Search size={19} className="shrink-0 text-[var(--muted)]" />

          <input
            type="text"
            value={searchTerm}
            onFocus={() => setIsFocused(true)}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="ابحث عن أي شيء..."
            className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setIsFocused(true)
              }}
              className="shrink-0 rounded-md p-1 text-[var(--muted)] transition hover:bg-[var(--border)] hover:text-[var(--text)]"
              aria-label="مسح البحث"
            >
              <X size={16} />
            </button>
          )}

          {!searchTerm && (
            <span className="shrink-0 rounded-md border border-[var(--border)] px-2 py-1 text-[10px] text-[var(--muted)]">
              Ctrl K
            </span>
          )}
        </div>

        {isFocused && searchTerm.trim().length > 0 && (
          <div className="absolute right-0 top-full z-50 mt-3 max-h-[420px] w-full overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-xl">
            {!isSearchActive ? (
              <p className="px-3 py-5 text-center text-sm text-[var(--muted)]">
                اكتب حرفين على الأقل للبحث
              </p>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
                <Search size={24} className="text-[var(--muted)]" />
                <p className="text-sm font-semibold text-[var(--text)]">
                  لا توجد نتائج
                </p>
                <p className="text-xs text-[var(--muted)]">
                  جرّب البحث بكلمة مختلفة
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {groupedResults.map((group) => {
                  const Icon = group.icon

                  return (
                    <section key={group.type}>
                      <div className="mb-2 flex items-center gap-2 px-2">
                        <Icon size={15} className="text-[var(--primary)]" />
                        <h3 className="text-xs font-bold text-[var(--muted)]">
                          {group.title}
                        </h3>
                        <span className="text-[10px] text-[var(--muted)]">
                          ({group.results.length})
                        </span>
                      </div>

                      <div className="space-y-1">
                        {group.results.map((result) => (
                          <button
                            key={`${result.type}-${result.id}`}
                            type="button"
                            onClick={() => handleSelectResult(result)}
                            className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-right transition hover:bg-[var(--surface-alt)]"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-[var(--text)]">
                                {result.title || '—'}
                              </p>
                              <p className="mt-1 truncate text-xs text-[var(--muted)]">
                                {result.subtitle}
                              </p>
                            </div>

                            <span className="shrink-0 text-xs text-[var(--primary)]">
                              عرض التفاصيل
                            </span>
                          </button>
                        ))}
                      </div>
                    </section>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedResult?.type === 'companies' && (
        <CompanyDetails
          company={selectedResult.item}
          onClose={handleCloseDetails}
        />
      )}

      {selectedResult?.type === 'trips' && (
        <TripDetails
          tripId={selectedResult.id}
          onClose={handleCloseDetails}
        />
      )}

      {selectedResult?.type === 'bookings' && (
        <BookingDetails
          bookingId={selectedResult.id}
          onClose={handleCloseDetails}
        />
      )}

      {selectedResult?.type === 'users' && (
        <UserDetails
          userId={selectedResult.id}
          onClose={handleCloseDetails}
        />
      )}

      {selectedResult?.type === 'cities' && (
        <CityDetails
          city={selectedResult.item}
          onClose={handleCloseDetails}
        />
      )}
    </>
  )
}
    