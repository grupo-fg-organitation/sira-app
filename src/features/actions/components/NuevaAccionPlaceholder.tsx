import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

export function NuevaAccionPlaceholder() {
  return (
    <div className='dashboard-content-in mx-auto max-w-2xl space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none'>
      <div>
        <Link
          to='/acciones'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4' />
          Volver a acciones
        </Link>
      </div>
      <div className='rounded-xl border border-border bg-card p-8 text-center'>
        <h1 className='text-2xl font-bold text-foreground'>
          Levantar condición
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          El flujo guiado para registrar una nueva acción se conectará al
          backend en una siguiente iteración. Mientras tanto, usa la lista de
          acciones para revisar el estado del programa piloto.
        </p>
        <Link
          to='/acciones'
          className={cn(buttonVariants(), 'mt-6 inline-flex')}
        >
          Ir a acciones
        </Link>
      </div>
    </div>
  );
}
