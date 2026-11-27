
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function BookingsChart({ data }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="#0aa99b"
                stopOpacity={0.45}
              />
              <stop
                offset="95%"
                stopColor="#0aa99b"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--border)"
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted)', fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted)', fontSize: 12 }}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              color: 'var(--text)',
              direction: 'rtl',
            }}
            labelStyle={{
              color: 'var(--text)',
              marginBottom: '5px',
            }}
          />

          <Area
            type="monotone"
            dataKey="bookings"
            stroke="#0aa99b"
            strokeWidth={3}
            fill="url(#bookingsGradient)"
            dot={{
              r: 3,
              fill: '#0aa99b',
              strokeWidth: 2,
              stroke: 'var(--surface)',
            }}
            activeDot={{
              r: 6,
              fill: '#0aa99b',
              stroke: 'var(--surface)',
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
