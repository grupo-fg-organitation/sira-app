import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { HomeKpiCardProps } from '@/features/home/interfaces/homeDashboard.interfaces';

export function HomeKPICard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  linkTo,
}: HomeKpiCardProps) {
  const inner = (
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-sm text-muted-foreground transition-colors group-hover:text-foreground/80'>
          {title}
        </p>
        <p className={cn('mt-2 text-3xl font-bold tabular-nums', color)}>
          {value}
        </p>
      </div>
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl shadow-inner transition-transform duration-300 motion-safe:group-hover:scale-110',
          bgColor,
        )}
      >
        <Icon
          className={cn('h-6 w-6 transition-transform duration-300', color)}
        />
      </div>
    </div>
  );

  const shellClass =
    'group rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-primary/20 motion-safe:hover:shadow-lg motion-safe:hover:shadow-primary/10';

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={cn(
          shellClass,
          'block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        )}
      >
        {inner}
      </Link>
    );
  }

  return <div className={shellClass}>{inner}</div>;
}
