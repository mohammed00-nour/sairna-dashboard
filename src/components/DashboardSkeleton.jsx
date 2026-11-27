
export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4, 5].map((item) => (
                <div
                    key={item}
                    className="animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                    <div className="flex items-center justify-between">
                        <div className="space-y-3">
                            <div className="h-4 w-28 rounded bg-[var(--surface-alt)]" />
                            <div className="h-8 w-20 rounded bg-[var(--surface-alt)]" />
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-[var(--surface-alt)]" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function ChartSkeleton({ height = 'h-80' }) {
    return (
        <div className={`${height} flex animate-pulse items-end gap-3 px-3 pb-3`}>
            {[45, 70, 55, 85, 60, 95, 40].map((item, index) => (
                <div
                    key={index}
                    className="flex-1 rounded-t-lg bg-[var(--surface-alt)]"
                    style={{ height: `${item}%` }}
                />
            ))}
        </div>
    )
}

export function TableSkeleton({ rows = 4 }) {
    return (
        <div className="animate-pulse space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="h-6 w-40 rounded bg-[var(--surface-alt)]" />
            {[...Array(rows)].map((_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 border-b border-[var(--border)] pb-4"
                >
                    <div className="h-10 w-10 rounded-full bg-[var(--surface-alt)]" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/3 rounded bg-[var(--surface-alt)]" />
                        <div className="h-3 w-1/2 rounded bg-[var(--surface-alt)]" />
                    </div>
                    <div className="h-6 w-16 rounded bg-[var(--surface-alt)]" />
                </div>
            ))}
        </div>
    )
}
