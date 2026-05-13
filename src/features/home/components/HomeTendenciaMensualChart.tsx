import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { HomeTendenciaMensualChartProps } from '@/features/home/interfaces/homeDashboard.interfaces';
import { HomeChartCard } from '@/features/home/components/HomeChartCard';

export function HomeTendenciaMensualChart({
  data,
}: HomeTendenciaMensualChartProps) {
  return (
    <HomeChartCard title='Tendencia mensual'>
      <div className='h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={[...data]} margin={{ top: 5, right: 20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='rgba(255,255,255,0.1)'
            />
            <XAxis dataKey='mes' stroke='#94a3b8' fontSize={12} />
            <YAxis stroke='#94a3b8' fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 58, 92, 0.95)',
                border: '1px solid rgba(200, 150, 12, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend
              verticalAlign='top'
              height={36}
              formatter={value => (
                <span className='text-xs text-muted-foreground'>
                  {value === 'creadas' ? 'Creadas' : 'Cerradas'}
                </span>
              )}
            />
            <Line
              type='monotone'
              dataKey='creadas'
              stroke='#C8960C'
              strokeWidth={2}
              dot={{ fill: '#C8960C', strokeWidth: 2 }}
            />
            <Line
              type='monotone'
              dataKey='cerradas'
              stroke='#22C55E'
              strokeWidth={2}
              dot={{ fill: '#22C55E', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </HomeChartCard>
  );
}
