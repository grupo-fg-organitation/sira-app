import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

export function ToursListHeader() {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 transition-[opacity,transform] duration-300 ease-out sm:flex-row sm:items-center sm:justify-between',
        'motion-safe:hover:[&>div:first-child]:translate-y-px',
      )}
    >
      <div className='transition-transform duration-300 ease-out'>
        <h1 className='text-2xl font-bold tracking-tight text-foreground drop-shadow-sm'>
          Recorridos
        </h1>
        <p className='mt-1 max-w-xl text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground/80'>
          Gestión de recorridos de seguridad industrial
        </p>
      </div>
      <Link
        to='/recorridos/nuevo'
        className={cn(
          buttonVariants(),
          'group/nuevo inline-flex cursor-pointer bg-primary text-primary-foreground shadow-md ring-1 ring-primary/20 transition-all duration-200 ease-out',
          'hover:bg-primary/90 hover:shadow-lg hover:ring-primary/35 motion-safe:hover:-translate-y-0.5 active:translate-y-0 active:shadow-md motion-reduce:hover:translate-y-0',
        )}
      >
        <Plus className='mr-2 h-4 w-4 transition-transform duration-200 ease-out motion-safe:group-hover/nuevo:rotate-90' />
        Nuevo recorrido
      </Link>
    </div>
  );
}
