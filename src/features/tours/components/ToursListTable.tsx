import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  tourStatusLabel,
  tourStatusPillClass,
} from '@/features/actions/lib/actionPresentation';
import type { TourSummaryApi } from '@/features/tours/interfaces/sira-tour-api.interfaces';
import type { ToursListTableProps } from '@/features/tours/interfaces/tours-list-table.interfaces';
import {
  Eye,
  Calendar,
  User,
  MapPin,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

function TourListCard({
  recorrido,
  indice,
}: {
  recorrido: TourSummaryApi;
  indice: number;
}): ReactElement {
  return (
    <article
      style={{
        animationDelay: `${Math.min(indice * 55, 220)}ms`,
        animationDuration: '260ms',
        animationFillMode: 'backwards',
      }}
      className={cn(
        'rounded-xl border border-border/80 bg-card/95 p-4 shadow-sm ring-1 ring-black/5 transition-colors duration-200',
        'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-reduce:animate-none',
        'dark:ring-white/10',
      )}
    >
      <div className='flex items-start justify-between gap-2'>
        <span className='font-mono text-sm font-semibold text-foreground'>
          {recorrido.folio}
        </span>
        <Link to={`/recorridos/${recorrido.id}`}>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='h-8 w-8 shrink-0 cursor-pointer p-0 shadow-sm ring-1 ring-transparent transition-all duration-200 hover:bg-primary/12 hover:text-primary hover:ring-primary/20'
          >
            <Eye className='h-4 w-4' />
          </Button>
        </Link>
      </div>
      <dl className='mt-3 grid gap-2 text-sm'>
        <div className='flex items-start justify-between gap-3'>
          <dt className='shrink-0 text-muted-foreground'>Fecha</dt>
          <dd className='flex items-center gap-2 text-right text-foreground'>
            <Calendar className='h-4 w-4 shrink-0 text-muted-foreground' />
            {new Date(recorrido.tourDate).toLocaleDateString('es-MX')}
          </dd>
        </div>
        <div className='flex items-start justify-between gap-3'>
          <dt className='shrink-0 text-muted-foreground'>Área</dt>
          <dd className='flex items-center gap-2 text-right text-foreground'>
            <MapPin className='h-4 w-4 shrink-0 text-muted-foreground' />
            {recorrido.areaName}
          </dd>
        </div>
        <div className='flex items-start justify-between gap-3'>
          <dt className='shrink-0 text-muted-foreground'>Compañía</dt>
          <dd className='flex items-center gap-2 text-right text-foreground'>
            <Briefcase className='h-4 w-4 shrink-0 text-muted-foreground' />
            <span className='line-clamp-2'>{recorrido.companyName}</span>
          </dd>
        </div>
        <div className='flex items-start justify-between gap-3'>
          <dt className='shrink-0 text-muted-foreground'>Usuario</dt>
          <dd className='flex items-center gap-2 text-right text-foreground'>
            <User className='h-4 w-4 shrink-0 text-muted-foreground' />
            <span className='line-clamp-2'>{recorrido.createdByName}</span>
          </dd>
        </div>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>Plantilla</dt>
          <dd className='text-right text-foreground'>
            {recorrido.templateName ?? '—'}
          </dd>
        </div>
        <div className='flex items-center justify-between gap-3'>
          <dt className='text-muted-foreground'>Estatus</dt>
          <dd>
            <span
              className={cn(
                'inline-flex cursor-default items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm',
                tourStatusPillClass(recorrido.status),
              )}
            >
              {tourStatusLabel(recorrido.status)}
            </span>
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function ToursListTable({
  items,
  isPending,
  effectivePage,
  totalPages,
  total,
  pageSize,
  onPreviousPage,
  onNextPage,
}: ToursListTableProps): ReactElement {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border/80 bg-card/95 shadow-md shadow-black/5 ring-1 ring-black/5 transition-all duration-300 ease-out',
        'motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-primary/15 motion-safe:hover:shadow-lg motion-safe:hover:shadow-black/10 motion-safe:hover:ring-primary/10',
        'dark:shadow-black/25 dark:ring-white/10 dark:motion-safe:hover:shadow-black/40',
      )}
    >
      <div className='md:hidden space-y-3 p-3 sm:p-4'>
        {isPending ? (
          <p className='py-10 text-center text-sm text-muted-foreground'>
            Cargando recorridos…
          </p>
        ) : items.length === 0 ? (
          <p className='py-10 text-center text-sm text-muted-foreground'>
            No hay recorridos registrados.
          </p>
        ) : (
          items.map((recorrido, indice) => (
            <TourListCard
              key={recorrido.id}
              recorrido={recorrido}
              indice={indice}
            />
          ))
        )}
      </div>

      <div className='peer/table hidden overflow-x-auto md:block'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-border bg-muted/40 text-left text-xs text-muted-foreground shadow-sm backdrop-blur-sm transition-colors duration-200'>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>Folio</th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>Fecha</th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>Área</th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>
                Compañía
              </th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>
                Usuario
              </th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>
                Plantilla
              </th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>
                Estatus
              </th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>Ver</th>
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <tr>
                <td
                  colSpan={8}
                  className='px-5 py-12 text-center text-sm text-muted-foreground'
                >
                  Cargando recorridos…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className='px-5 py-12 text-center text-sm text-muted-foreground'
                >
                  No hay recorridos registrados.
                </td>
              </tr>
            ) : (
              items.map((recorrido, indice) => (
                <tr
                  key={recorrido.id}
                  style={{
                    animationDelay: `${Math.min(indice * 55, 220)}ms`,
                    animationDuration: '260ms',
                    animationFillMode: 'backwards',
                  }}
                  className={cn(
                    'group/row border-b border-border transition-all duration-200 ease-out last:border-0',
                    'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-reduce:animate-none',
                    'motion-safe:hover:bg-muted/50 motion-safe:hover:shadow-[inset_0_1px_0_0_var(--border)]',
                  )}
                >
                  <td className='whitespace-nowrap px-5 py-4'>
                    <span className='font-mono text-sm font-medium text-foreground transition-colors duration-200 group-hover/row:text-primary'>
                      {recorrido.folio}
                    </span>
                  </td>
                  <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground transition-colors duration-200 group-hover/row:text-foreground/85'>
                    <span className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 shrink-0 transition-transform duration-200 ease-out motion-safe:group-hover/row:scale-110' />
                      {new Date(recorrido.tourDate).toLocaleDateString('es-MX')}
                    </span>
                  </td>
                  <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground transition-colors duration-200 group-hover/row:text-foreground/85'>
                    <span className='flex items-center gap-2'>
                      <MapPin className='h-4 w-4 shrink-0 transition-transform duration-200 ease-out motion-safe:group-hover/row:scale-110' />
                      {recorrido.areaName}
                    </span>
                  </td>
                  <td className='max-w-40 truncate px-5 py-4 text-sm text-muted-foreground transition-colors duration-200 group-hover/row:text-foreground/85'>
                    <span className='flex items-center gap-2'>
                      <Briefcase className='h-4 w-4 shrink-0 transition-transform duration-200 ease-out motion-safe:group-hover/row:scale-110' />
                      {recorrido.companyName}
                    </span>
                  </td>
                  <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground transition-colors duration-200 group-hover/row:text-foreground/85'>
                    <span className='flex items-center gap-2'>
                      <User className='h-4 w-4 shrink-0 transition-transform duration-200 ease-out motion-safe:group-hover/row:scale-110' />
                      {recorrido.createdByName}
                    </span>
                  </td>
                  <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                    {recorrido.templateName ?? '—'}
                  </td>
                  <td className='whitespace-nowrap px-5 py-4'>
                    <span
                      className={cn(
                        'inline-flex cursor-default items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm transition-all duration-200 ease-out',
                        'motion-safe:group-hover/row:scale-105 motion-safe:group-hover/row:shadow-md motion-reduce:group-hover/row:scale-100',
                        tourStatusPillClass(recorrido.status),
                      )}
                    >
                      {tourStatusLabel(recorrido.status)}
                    </span>
                  </td>
                  <td className='whitespace-nowrap px-5 py-4'>
                    <Link to={`/recorridos/${recorrido.id}`}>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 cursor-pointer p-0 shadow-sm ring-1 ring-transparent transition-all duration-200 ease-out hover:bg-primary/12 hover:text-primary hover:ring-primary/20 hover:shadow-md motion-safe:hover:scale-110 active:scale-95 motion-reduce:hover:scale-100'
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className='flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
        <p className='text-center text-sm text-muted-foreground sm:text-left'>
          {total === 0
            ? 'Sin resultados'
            : `Mostrando ${(effectivePage - 1) * pageSize + 1} a ${Math.min(
                effectivePage * pageSize,
                total,
              )} de ${total}`}
        </p>
        <div className='flex items-center justify-center gap-2 sm:justify-end'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={onPreviousPage}
            disabled={effectivePage === 1 || isPending}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <span className='px-3 text-sm text-muted-foreground'>
            Página {effectivePage} de {totalPages}
          </span>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={onNextPage}
            disabled={effectivePage === totalPages || isPending}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-0.5 origin-left scale-x-0 bg-linear-to-r from-primary/70 via-primary/30 to-transparent opacity-0 transition-all duration-300 ease-out md:block',
          'peer-hover/table:scale-x-100 peer-hover/table:opacity-100 motion-reduce:transition-none',
        )}
        aria-hidden
      />
    </div>
  );
}
