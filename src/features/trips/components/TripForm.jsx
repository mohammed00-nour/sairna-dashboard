
import { useState } from 'react'

const toDamascusInput = (date) => {
  if (!date) return ''

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Damascus',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(date))

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  )

  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`
}

export default function TripForm({
  companies = [],
  cities = [],
  onSubmit,
  isPending = false,
  initialData = null,
}) {
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setValidationError('')

    const formData = new FormData(event.currentTarget)

    const originId = Number(formData.get('originId'))
    const destinationId = Number(formData.get('destinationId'))

    const departureValue = formData.get('departureAt')
    const arrivalValue = formData.get('arrivalAt')

    const departureDate = new Date(`${departureValue}:00+03:00`)
    const arrivalDate = new Date(`${arrivalValue}:00+03:00`)

    if (originId === destinationId) {
      setValidationError('مدينة الانطلاق يجب أن تختلف عن مدينة الوصول')
      return
    }

    if (arrivalDate <= departureDate) {
      setValidationError('موعد الوصول يجب أن يكون بعد موعد الانطلاق')
      return
    }

    const tripData = {
      companyId: Number(formData.get('companyId')),
      originId,
      destinationId,
      departureAt: departureDate.toISOString(),
      arrivalAt: arrivalDate.toISOString(),
      price: Number(formData.get('price')),
      totalSeats: Number(formData.get('totalSeats')),
    }

    if (initialData) {
      tripData.status = formData.get('status')
    }

    onSubmit(tripData)
  }

  const activeCompanies = companies.filter(
    (company) => company.isActive
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text)]">
            شركة النقل
          </label>

          <select
            name="companyId"
            required
            defaultValue={initialData?.companyId ?? ''}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
          >
            <option value="" disabled>اختر شركة النقل</option>

            {activeCompanies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text)]">
            مدينة الانطلاق
          </label>

          <select
            name="originId"
            required
            defaultValue={initialData?.originId ?? ''}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
          >
            <option value="" disabled>اختر مدينة الانطلاق</option>

            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text)]">
            مدينة الوصول
          </label>

          <select
            name="destinationId"
            required
            defaultValue={initialData?.destinationId ?? ''}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
          >
            <option value="" disabled>اختر مدينة الوصول</option>

            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {initialData && (
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text)]">
              حالة الرحلة
            </label>

            <select
              name="status"
              required
              defaultValue={initialData.status}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
            >
              <option value="AVAILABLE">متاحة</option>
              <option value="CANCELLED">ملغاة</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text)]">
            موعد الانطلاق
          </label>

          <input
            type="datetime-local"
            name="departureAt"
            required
            defaultValue={toDamascusInput(initialData?.departureAt)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text)]">
            موعد الوصول
          </label>

          <input
            type="datetime-local"
            name="arrivalAt"
            required
            defaultValue={toDamascusInput(initialData?.arrivalAt)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text)]">
            سعر المقعد (ل.س)
          </label>

          <input
            type="number"
            name="price"
            min="1"
            required
            defaultValue={initialData?.price ?? ''}
            placeholder="مثلاً 140000"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text)]">
            عدد المقاعد
          </label>

          <input
            type="number"
            name="totalSeats"
            min="1"
            required
            defaultValue={initialData?.totalSeats ?? ''}
            placeholder="مثلاً 40"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {validationError && (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {validationError}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--primary-deep)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? initialData
            ? 'جاري حفظ التعديلات...'
            : 'جاري إنشاء الرحلة...'
          : initialData
            ? 'حفظ التعديلات'
            : 'إضافة الرحلة'}
      </button>
    </form>
  )
}
