import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { HomeAccionesPorAreaChartProps } from '@/features/home/interfaces/homeDashboard.interfaces';
import { HomeChartCard } from '@/features/home/components/HomeChartCard';

export function HomeAccionesPorAreaChart({
  data,
}: HomeAccionesPorAreaChartProps) {
  return (
    <HomeChartCard title='Acciones por área'>
      <div className='h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={[...data]}
            layout='vertical'
            margin={{ left: 20, right: 20 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='rgba(255,255,255,0.1)'
            />
            <XAxis type='number' stroke='#94a3b8' fontSize={12} />
            <YAxis
              type='category'
              dataKey='area'
              stroke='#94a3b8'
              fontSize={12}
              width={90}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 58, 92, 0.95)',
                border: '1px solid rgba(200, 150, 12, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey='cantidad' fill='#C8960C' radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </HomeChartCard>
  );
}
