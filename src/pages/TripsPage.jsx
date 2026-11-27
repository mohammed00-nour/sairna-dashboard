
import { useState } from 'react'
import { Plus, X, Trash2, AlertTriangle } from 'lucide-react'

import { useTrips } from '../features/trips/hooks/useTrips'
import { useCities } from '../features/cities/hooks/useCities'
import { useCompanies } from '../features/companies/hooks/useCompanies'
import { useCreateTrip } from '../features/trips/hooks/useCreateTrip'
import { useUpdateTrip } from '../features/trips/hooks/useUpdateTrip'
import { useCancelTrip } from '../features/trips/hooks/useCancelTrip'

import TripsTable from '../features/trips/components/TripsTable'
import TripForm from '../features/trips/components/TripForm'
import TripDetails from '../features/trips/components/TripDetails'

export default function TripsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [tripToView, setTripToView] = useState(null)
  const [tripToCancel, setTripToCancel] = useState(null)

  const { data: trips, isLoading, isError, error } = useTrips()

  const {
    data: cities = [],
    isLoading: isCitiesLoading,
    isError: isCitiesError,
  } = useCities()

  const {
    data: companies = [],
    isLoading: isCompaniesLoading,
    isError: isCompaniesError,
  } = useCompanies()

  const createTripMutation = useCreateTrip()
  const updateTripMutation = useUpdateTrip()
  const cancelTripMutation = useCancelTrip()

  const totalTrips = trips?.length || 0

  const availableTrips =
    trips?.filter((trip) => trip.status === 'AVAILABLE').length || 0

  const cancelledTrips =
    trips?.filter((trip) => trip.status === 'CANCELLED').length || 0

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTrip(null)
    createTripMutation.reset()
    updateTripMutation.reset()
  }

  const handleCreateTrip = (tripData) => {
    createTripMutation.mutate(tripData, {
      onSuccess: closeModal,
    })
  }

  const handleEditTrip = (trip) => {
    createTripMutation.reset()
    updateTripMutation.reset()

    setSelectedTrip(trip)
    setIsModalOpen(true)
  }

  const handleViewTrip = (trip) => {
    setTripToView(trip)
  }

  const handleUpdateTrip = (tripData) => {
    updateTripMutation.mutate(
      {
        id: selectedTrip.id,
        tripData,
      },
      {
        onSuccess: closeModal,
      }
    )
  }

  const openCreateModal = () => {
    createTripMutation.reset()
    updateTripMutation.reset()

    setSelectedTrip(null)
    setIsModalOpen(true)
  }

  const handleCancelTrip = (trip) => {
    if (trip.status === 'CANCELLED') return

    cancelTripMutation.reset()
    setTripToCancel(trip)
  }

  const confirmCancelTrip = () => {
    if (!tripToCancel || cancelTripMutation.isPending) return

    cancelTripMutation.mutate(tripToCancel.id, {
      onSuccess: () => {
        setTripToCancel(null)
      },
    })
  }

  const closeCancelModal = () => {
    if (cancelTripMutation.isPending) return

    setTripToCancel(null)
    cancelTripMutation.reset()
  }

  if (isLoading) {
    return (
      <p className="text-[var(--muted)]">
        جاري تحميل الرحلات...
      </p>
    )
  }

  if (isError) {
    return (
      <p className="text-red-500">
        {error?.response?.data?.message || 'حدث خطأ أثناء جلب الرحلات'}
      </p>
    )
  }

  const stats = [
    {
      title: 'إجمالي الرحلات',
      value: totalTrips,
      color: 'text-[var(--text)]',
      bg: 'bg-[var(--surface-alt)]',
    },
    {
      title: 'الرحلات المتاحة',
      value: availableTrips,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'الرحلات الملغاة',
      value: cancelledTrips,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ]

  const isEditing = Boolean(selectedTrip)

  const activeMutation = isEditing
    ? updateTripMutation
    : createTripMutation

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">
            إدارة الرحلات
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            عرض وإدارة جميع الرحلات المسجلة في النظام
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-deep)]"
        >
          <Plus size={18} />
          إضافة رحلة
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <p className="text-sm text-[var(--muted)]">
              {stat.title}
            </p>

            <div
              className={`mt-3 inline-flex min-w-14 items-center justify-center rounded-xl px-4 py-2 text-2xl font-bold ${stat.color} ${stat.bg}`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Trips Table */}
      <TripsTable
        trips={trips || []}
        onView={handleViewTrip}
        onEdit={handleEditTrip}
        onCancel={handleCancelTrip}
      />

      {/* Trip Details Modal */}
      {tripToView && (
        <TripDetails
          tripId={tripToView.id}
          onClose={() => setTripToView(null)}
        />
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[var(--surface)] p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--text)]">
                {isEditing ? 'تعديل الرحلة' : 'إضافة رحلة جديدة'}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--surface-alt)]"
              >
                <X size={20} />
              </button>
            </div>

            {isCitiesLoading || isCompaniesLoading ? (
              <p className="py-8 text-center text-[var(--muted)]">
                جاري تحميل بيانات النموذج...
              </p>
            ) : isCitiesError || isCompaniesError ? (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                حدث خطأ أثناء تحميل المدن أو الشركات
              </p>
            ) : (
              <TripForm
                key={selectedTrip?.id || 'new-trip'}
                cities={cities}
                companies={companies}
                initialData={selectedTrip}
                onSubmit={isEditing ? handleUpdateTrip : handleCreateTrip}
                isPending={activeMutation.isPending}
              />
            )}

            {activeMutation.isError && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {activeMutation.error?.response?.data?.message ||
                  (isEditing
                    ? 'حدث خطأ أثناء تعديل الرحلة'
                    : 'حدث خطأ أثناء إنشاء الرحلة')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Cancel Trip Confirmation Modal */}
      {tripToCancel && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !cancelTripMutation.isPending
            ) {
              closeCancelModal()
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-trip-title"
            className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl"
          >
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <AlertTriangle size={30} />
            </div>

            {/* Title and Description */}
            <div className="mt-5 text-center">
              <h2
                id="cancel-trip-title"
                className="text-xl font-bold text-[var(--text)]"
              >
                تأكيد إلغاء الرحلة
              </h2>

              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                هل أنت متأكد من إلغاء هذه الرحلة؟
                ستتغير حالتها ولن تبقى متاحة للحجز.
              </p>
            </div>

            {/* Trip Information */}
            <div className="mt-5 space-y-3 rounded-xl bg-[var(--surface-alt)] p-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">
                  رمز الرحلة
                </span>

                <span
                  dir="ltr"
                  className="font-semibold text-[var(--text)]"
                >
                  {tripToCancel.code || `#${tripToCancel.id}`}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">
                  الشركة
                </span>

                <span className="font-semibold text-[var(--text)]">
                  {tripToCancel.company?.name || '—'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">
                  المسار
                </span>

                <span className="font-semibold text-[var(--text)]">
                  {tripToCancel.origin?.name || '—'}
                  {' ← '}
                  {tripToCancel.destination?.name || '—'}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {cancelTripMutation.isError && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm leading-6 text-red-600">
                {cancelTripMutation.error?.response?.data?.message ||
                  'حدث خطأ أثناء إلغاء الرحلة، يرجى المحاولة مجدداً'}
              </p>
            )}

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={confirmCancelTrip}
                disabled={cancelTripMutation.isPending}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cancelTripMutation.isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    جاري الإلغاء...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    تأكيد الإلغاء
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={closeCancelModal}
                disabled={cancelTripMutation.isPending}
                className="flex-1 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-alt)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                تراجع
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
