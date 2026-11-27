
import { useState } from 'react'
import { Plus, X, AlertTriangle } from 'lucide-react'

import { useCompanies } from '../features/companies/hooks/useCompanies'
import { useCreateCompany } from '../features/companies/hooks/useCreateCompany'
import { useUpdateCompany } from '../features/companies/hooks/useUpdateCompany'
import { useArchiveCompany } from '../features/companies/hooks/useArchiveCompany'

import CompaniesTable from '../features/companies/components/CompaniesTable'
import CompanyForm from '../features/companies/components/CompanyForm'
import CompanyDetails from '../features/companies/components/CompanyDetails'

export default function CompaniesPage() {
  const {
    data: companies,
    isLoading,
    isError,
  } = useCompanies()

  // Create Company
  const {
    mutate: createCompany,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
    reset: resetCreate,
  } = useCreateCompany()

  // Update Company
  const {
    mutate: updateCompany,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
    reset: resetUpdate,
  } = useUpdateCompany()

  // Archive Company
  const {
    mutate: archiveCompany,
    isPending: isArchiving,
    isError: isArchiveError,
    error: archiveError,
    reset: resetArchive,
  } = useArchiveCompany()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companyToView, setCompanyToView] = useState(null)
  const [companyToArchive, setCompanyToArchive] = useState(null)

  const isPending = isCreating || isUpdating
  const isEditing = Boolean(selectedCompany)

  // Open Add Modal
  const handleOpenModal = () => {
    resetCreate()
    resetUpdate()

    setSelectedCompany(null)
    setIsModalOpen(true)
  }

  // Open Edit Modal
  const handleEdit = (company) => {
    resetCreate()
    resetUpdate()

    setSelectedCompany(company)
    setIsModalOpen(true)
  }

  // Open Company Details
  const handleViewDetails = (company) => {
    setCompanyToView(company)
  }

  // Close Company Modal
  const handleCloseModal = () => {
    if (isPending) return

    setIsModalOpen(false)
    setSelectedCompany(null)

    resetCreate()
    resetUpdate()
  }

  // Create or Update Company
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const name = formData.get('name').trim()
    const logoUrl = formData.get('logoUrl').trim()

    const companyData = {
      name,
      ...(logoUrl && { logoUrl }),
    }

    if (isEditing) {
      const isActive = formData.get('isActive') === 'true'

      companyData.isActive = isActive

      updateCompany(
        {
          id: selectedCompany.id,
          companyData,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false)
            setSelectedCompany(null)
          },
        }
      )

      return
    }

    createCompany(companyData, {
      onSuccess: () => {
        setIsModalOpen(false)
      },
    })
  }

  // Open Archive Confirmation
  const handleArchive = (company) => {
    resetArchive()
    setCompanyToArchive(company)
  }

  // Close Archive Confirmation
  const handleCloseArchive = () => {
    if (isArchiving) return

    setCompanyToArchive(null)
    resetArchive()
  }

  // Confirm Archive
  const handleConfirmArchive = () => {
    if (!companyToArchive) return

    archiveCompany(companyToArchive.id, {
      onSuccess: () => {
        setCompanyToArchive(null)
      },
    })
  }

  // Error Messages
  const currentError = isEditing ? updateError : createError

  const errorMessage =
    currentError?.response?.data?.message?.[0] ||
    currentError?.response?.data?.message ||
    `حدث خطأ أثناء ${isEditing ? 'تعديل' : 'إضافة'} الشركة، يرجى المحاولة مرة أخرى`

  const archiveErrorMessage =
    archiveError?.response?.data?.message?.[0] ||
    archiveError?.response?.data?.message ||
    'حدث خطأ أثناء أرشفة الشركة، يرجى المحاولة مرة أخرى'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">
            شركات النقل
          </h1>

          <p className="mt-1 text-sm text-[var(--muted)]">
            إدارة شركات النقل المسجلة في النظام
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenModal}
          className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-deep)]"
        >
          <Plus size={18} />
          إضافة شركة
        </button>
      </div>

      {/* Companies Table */}
      {isLoading ? (
        <p className="py-10 text-center text-[var(--muted)]">
          جاري تحميل الشركات...
        </p>
      ) : isError ? (
        <p className="py-10 text-center text-red-500">
          حدث خطأ أثناء جلب الشركات
        </p>
      ) : (
        <CompaniesTable
          companies={companies ?? []}
          onEdit={handleEdit}
          onDelete={handleArchive}
          onView={handleViewDetails}
        />
      )}

      {/* Company Details Modal */}
      {companyToView && (
        <CompanyDetails
          company={companyToView}
          onClose={() => setCompanyToView(null)}
        />
      )}

      {/* Add / Edit Company Modal */}
      {isModalOpen && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[var(--text)]">
                  {isEditing ? 'تعديل بيانات الشركة' : 'إضافة شركة جديدة'}
                </h2>

                <p className="mt-1 text-sm text-[var(--muted)]">
                  {isEditing
                    ? 'عدّل بيانات شركة النقل'
                    : 'أدخل بيانات شركة النقل'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isPending}
                className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--surface-alt)] hover:text-[var(--text)] disabled:opacity-50"
                aria-label="إغلاق النافذة"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error Message */}
            {(isCreateError || isUpdateError) && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500"
              >
                {errorMessage}
              </div>
            )}

            {/* Company Form */}
            <CompanyForm
              company={selectedCompany}
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
              isPending={isPending}
            />
          </div>
        </div>
      )}

      {/* Archive Confirmation Modal */}
      {companyToArchive && (
        <div
          onClick={handleCloseArchive}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl"
          >
            {/* Modal Icon */}
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <AlertTriangle size={24} />
            </div>

            {/* Modal Content */}
            <h2 className="text-xl font-bold text-[var(--text)]">
              أرشفة الشركة
            </h2>

            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              هل أنت متأكد من أرشفة شركة{' '}
              <span className="font-bold text-[var(--text)]">
                {companyToArchive.name}
              </span>
              ؟
              لن تظهر الشركة ضمن قائمة الشركات بعد نجاح العملية.
            </p>

            {/* Archive Error */}
            {isArchiveError && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500"
              >
                {archiveErrorMessage}
              </div>
            )}

            {/* Actions */}
            <div className="mt-7 flex items-center justify-end gap-3 border-t border-[var(--border)] pt-5">
              <button
                type="button"
                onClick={handleCloseArchive}
                disabled={isArchiving}
                className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-alt)] disabled:opacity-50"
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={handleConfirmArchive}
                disabled={isArchiving}
                className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isArchiving ? 'جاري الأرشفة...' : 'تأكيد الأرشفة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
