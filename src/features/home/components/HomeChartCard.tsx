import type { HomeChartCardProps } from '@/features/home/interfaces/homeDashboard.interfaces';

export function HomeChartCard({ title, children }: HomeChartCardProps) {
  return (
    <div className='rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-primary/15 motion-safe:hover:shadow-md'>
      <h3 className='mb-4 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground/90'>
        {title}
      </h3>
      {children}
    </div>
  );
}
