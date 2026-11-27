
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts'

const STATUS_COLORS = {
  CONFIRMED: '#0aa99b',
  CANCELLED: '#ef5350',
}

export default function BookingStatusChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="relative h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((item) => (
              <Cell
                key={item.name}
                fill={STATUS_COLORS[item.status]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-[var(--text)]">
          {total.toLocaleString('en-US')}
        </span>

        <span className="mt-1 text-xs text-[var(--muted)]">
          إجمالي الحجوزات
        </span>
      </div>
    </div>
  )
}
