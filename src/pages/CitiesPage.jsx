
import { useState } from 'react'
import { MapPin, MapPinned, MapPinOff } from 'lucide-react'

import { useCities } from '../features/cities/hooks/useCities'
import CitiesTable from '../features/cities/components/CitiesTable'
import CityDetails from '../features/cities/components/CityDetails'

export default function CitiesPage() {
  const [cityToView, setCityToView] = useState(null)

  const {
    data: cities,
    isLoading,
    isError,
    error,
  } = useCities()

  if (isLoading) {
    return (
      <div className="py-10 text-center text-[var(--muted)]">
        جاري تحميل المدن...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        {error?.response?.data?.message ||
          'حدث خطأ أثناء جلب المدن'}
      </div>
    )
  }

  const totalCities = cities?.length || 0

  const citiesWithLocation =
    cities?.filter(
      (city) => city.latitude != null && city.longitude != null,
    ).length || 0

  const citiesWithoutLocation = totalCities - citiesWithLocation

  const stats = [
    {
      title: 'إجمالي المدن',
      value: totalCities,
      icon: MapPin,
      iconStyle: 'bg-[var(--soft-teal)] text-[var(--primary)]',
    },
    {
      title: 'مدن ذات إحداثيات مكتملة',
      value: citiesWithLocation,
      icon: MapPinned,
      iconStyle: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'مدن ينقصها موقع',
      value: citiesWithoutLocation,
      icon: MapPinOff,
      iconStyle: 'bg-amber-100 text-amber-600',
    },
  ]

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">
          المدن
        </h1>

        <p className="mt-2 text-sm text-[var(--muted)]">
          عرض المدن المسجلة وإحداثيات مواقعها الجغرافية
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

      <CitiesTable
        cities={cities || []}
        onView={setCityToView}
      />

      {cityToView && (
        <CityDetails
          city={cityToView}
          onClose={() => setCityToView(null)}
        />
      )}
    </section>
  )
}
