
export default function CompanyForm({
  company,
  onSubmit,
  onCancel,
  isPending,
}) {
  const isEditing = Boolean(company)

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Company Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-semibold text-[var(--text)]"
        >
          اسم الشركة
        </label>

        <input
          id="name"
          name="name"
          type="text"
          defaultValue={company?.name || ''}
          placeholder="أدخل اسم الشركة"
          required
          disabled={isPending}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)] disabled:opacity-60"
        />
      </div>

      {/* Company Logo */}
      <div className="space-y-2">
        <label
          htmlFor="logoUrl"
          className="text-sm font-semibold text-[var(--text)]"
        >
          رابط الشعار
        </label>

        <input
          id="logoUrl"
          name="logoUrl"
          type="url"
          defaultValue={company?.logoUrl || ''}
          placeholder="https://example.com/logo.png"
          disabled={isPending}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)] disabled:opacity-60"
        />
      </div>

      {/* Company Status */}
      {isEditing && (
        <div className="space-y-2">
          <label
            htmlFor="isActive"
            className="text-sm font-semibold text-[var(--text)]"
          >
            حالة الشركة
          </label>

          <select
            id="isActive"
            name="isActive"
            defaultValue={String(company.isActive)}
            disabled={isPending}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)] disabled:opacity-60"
          >
            <option value="true">مفعّلة</option>
            <option value="false">غير مفعّلة</option>
          </select>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-[var(--border)] pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-alt)] disabled:opacity-50"
        >
          إلغاء
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-deep)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? 'جاري الحفظ...'
            : isEditing
              ? 'حفظ التعديلات'
              : 'إضافة الشركة'}
        </button>
      </div>
    </form>
  )
}
