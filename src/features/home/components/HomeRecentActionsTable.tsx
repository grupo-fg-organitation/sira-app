import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type {
  DashboardActionRow,
  HomeRecentActionsTableProps,
} from '@/features/home/interfaces/homeDashboard.interfaces';

function HomeRecentActionCard({
  action,
}: {
  action: DashboardActionRow;
}): ReactElement {
  return (
    <article className='rounded-xl border border-border/80 bg-card/95 p-4 shadow-sm ring-1 ring-black/5 transition-colors duration-200 hover:border-primary/20 dark:ring-white/10'>
      <div className='flex items-start justify-between gap-2'>
        <span className='font-mono text-sm font-semibold text-foreground'>
          {action.folio}
        </span>
        <Link to={`/acciones/${action.id}`} className='inline-flex shrink-0'>
          <Button
            variant='ghost'
            size='sm'
            type='button'
            className='h-8 w-8 cursor-pointer p-0 shadow-none transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-95'
          >
            <Eye className='h-4 w-4' />
          </Button>
        </Link>
      </div>
      <dl className='mt-3 grid gap-2 text-sm'>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>Área</dt>
          <dd className='text-right text-foreground'>{action.area}</dd>
        </div>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>Responsable</dt>
          <dd className='line-clamp-2 text-right text-foreground'>
            {action.responsable}
          </dd>
        </div>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>Fecha compromiso</dt>
          <dd className='text-right text-foreground'>
            {action.fechaCompromisoVigenteDisplay}
          </dd>
        </div>
        <div className='flex items-center justify-between gap-3'>
          <dt className='text-muted-foreground'>Estatus</dt>
          <dd>
            <span className='inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground'>
              {action.estatusLabel}
            </span>
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function HomeRecentActionsTable({
  actions,
}: HomeRecentActionsTableProps): ReactElement {
  return (
    <div className='rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/15 hover:shadow-md'>
      <div className='flex items-center justify-between border-b border-border p-4 sm:p-5'>
        <h3 className='text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground/90'>
          Últimas acciones
        </h3>
        <Link
          to='/acciones'
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'cursor-pointer text-primary shadow-none transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:shadow-sm',
          )}
        >
          Ver todas
        </Link>
      </div>

      <div className='md:hidden space-y-3 p-3 sm:p-4'>
        {actions.length === 0 ? (
          <p className='py-8 text-center text-sm text-muted-foreground'>
            No hay acciones recientes.
          </p>
        ) : (
          actions.map(action => (
            <HomeRecentActionCard key={action.id} action={action} />
          ))
        )}
      </div>

      <div className='hidden overflow-x-auto md:block'>
        {actions.length === 0 ? (
          <p className='px-5 py-10 text-center text-sm text-muted-foreground'>
            No hay acciones recientes.
          </p>
        ) : (
          <table className='w-full'>
          <thead>
            <tr className='border-b border-border text-left text-xs text-muted-foreground'>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>Folio</th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>Área</th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>
                Responsable
              </th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>
                Fecha compromiso
              </th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>
                Estatus
              </th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {actions.map(action => (
              <tr
                key={action.id}
                className='cursor-pointer border-b border-border transition-colors duration-200 last:border-0 hover:bg-muted/60 motion-reduce:transition-none'
              >
                <td className='whitespace-nowrap px-5 py-4'>
                  <span className='font-mono text-sm font-medium text-foreground'>
                    {action.folio}
                  </span>
                </td>
                <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                  {action.area}
                </td>
                <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                  {action.responsable}
                </td>
                <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                  {action.fechaCompromisoVigenteDisplay}
                </td>
                <td className='whitespace-nowrap px-5 py-4'>
                  <span className='inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground'>
                    {action.estatusLabel}
                  </span>
                </td>
                <td className='whitespace-nowrap px-5 py-4'>
                  <Link to={`/acciones/${action.id}`} className='inline-flex'>
                    <Button
                      variant='ghost'
                      size='sm'
                      type='button'
                      className='h-8 w-8 cursor-pointer p-0 shadow-none transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-95'
                    >
                      <Eye className='h-4 w-4' />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
}
