import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { HomeDistribucionEstatusChartProps } from '@/features/home/interfaces/homeDashboard.interfaces';
import { HomeChartCard } from '@/features/home/components/HomeChartCard';

export function HomeDistribucionEstatusChart({
  data,
}: HomeDistribucionEstatusChartProps) {
  const chartData = [...data];
  return (
    <HomeChartCard title='Distribución por estatus'>
      <div className='h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={chartData}
              cx='50%'
              cy='50%'
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey='cantidad'
              nameKey='estatus'
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.estatus}-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 58, 92, 0.95)',
                border: '1px solid rgba(200, 150, 12, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend
              verticalAlign='bottom'
              height={36}
              formatter={value => (
                <span className='text-xs text-muted-foreground'>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </HomeChartCard>
  );
}
