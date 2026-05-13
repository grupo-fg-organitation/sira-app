import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { SiraActionStatus } from '@/features/actions/interfaces/sira-action-api.interfaces';
import type { ActionSummaryApi } from '@/features/actions/interfaces/sira-action-api.interfaces';
import {
  getActionStatusColor,
  getActionStatusLabel,
  getDueDateLegend,
} from '@/features/actions/lib/actionPresentation';
import { useActionsListPage } from '@/features/actions/hooks/useActionsListPage';
import {
  Search,
  Plus,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

function ActionListItemCard({
  action,
}: {
  action: ActionSummaryApi;
}): ReactElement {
  const leyenda = getDueDateLegend(action.dueDateStatus);
  return (
    <article className='rounded-xl border border-border/80 bg-card/95 p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10'>
      <div className='flex items-start justify-between gap-2'>
        <span className='font-mono text-sm font-semibold text-foreground'>
          {action.folio}
        </span>
        <div className='flex shrink-0 gap-1'>
          <Link to={`/acciones/${action.id}`}>
            <Button type='button' variant='ghost' size='sm' className='h-8 w-8 p-0'>
              <Eye className='h-4 w-4' />
            </Button>
          </Link>
          <Link to={`/acciones/${action.id}`}>
            <Button type='button' variant='ghost' size='sm' className='h-8 w-8 p-0'>
              <Pencil className='h-4 w-4' />
            </Button>
          </Link>
        </div>
      </div>
      <dl className='mt-3 grid gap-2 text-sm'>
        <div className='flex justify-between gap-3'>
          <dt className='shrink-0 text-muted-foreground'>Área</dt>
          <dd className='text-right text-foreground'>{action.areaName}</dd>
        </div>
        <div className='grid gap-1'>
          <dt className='text-muted-foreground'>Descripción</dt>
          <dd className='line-clamp-3 text-foreground'>{action.description}</dd>
        </div>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>Responsable</dt>
          <dd className='line-clamp-2 text-right text-foreground'>
            {action.responsibleName}
          </dd>
        </div>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>F. detección</dt>
          <dd className='text-foreground'>
            {new Date(action.detectedAt).toLocaleDateString('es-MX')}
          </dd>
        </div>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>F. compromiso</dt>
          <dd className='text-foreground'>
            {new Date(action.currentDueDate).toLocaleDateString('es-MX')}
          </dd>
        </div>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <dt className='text-muted-foreground'>Estatus</dt>
          <dd>
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                getActionStatusColor(action.status),
              )}
            >
              {getActionStatusLabel(action.status)}
            </span>
          </dd>
        </div>
        {leyenda ? (
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <dt className='text-muted-foreground'>Leyenda</dt>
            <dd>
              <span
                className={cn(
                  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                  leyenda.className,
                )}
              >
                {leyenda.label}
              </span>
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

export function ActionsListView() {
  const {
    canListCatalogUsers,
    search,
    setSearch,
    areaFilter,
    setAreaFilter,
    estatusFilter,
    setEstatusFilter,
    responsableFilter,
    setResponsableFilter,
    setCurrentPage,
    isPending,
    isError,
    areasQuery,
    usersQuery,
    total,
    totalPages,
    effectivePage,
    items,
    itemsPerPage,
    statusOptions,
  } = useActionsListPage();

  return (
    <div className='dashboard-content-in space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>
            Acciones
          </h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Gestión de acciones de seguridad
          </p>
        </div>
        <Link
          to='/acciones/nueva'
          className={cn(
            buttonVariants(),
            'inline-flex bg-primary text-primary-foreground hover:bg-primary/90',
          )}
        >
          <Plus className='mr-2 h-4 w-4' />
          Nueva acción
        </Link>
      </div>

      {isError ? (
        <p className='text-sm text-destructive'>
          No se pudo cargar el listado de acciones.
        </p>
      ) : null}

      <div className='rounded-xl border border-border bg-card p-4'>
        <div className='flex flex-wrap items-center gap-3'>
          <div className='relative min-w-[200px] flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Filtrar en página actual (folio, descripción, responsable)...'
              value={search}
              onChange={event => setSearch(event.target.value)}
              className='pl-10'
            />
          </div>

          <select
            value={areaFilter}
            onChange={event => {
              setAreaFilter(event.target.value);
              setCurrentPage(1);
            }}
            className='h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring'
          >
            <option value=''>Todas las áreas</option>
            {(areasQuery.data ?? []).map(area => (
              <option key={area.id} value={String(area.id)}>
                {area.name}
              </option>
            ))}
          </select>

          <select
            value={estatusFilter}
            onChange={event => {
              setEstatusFilter(event.target.value as SiraActionStatus | '');
              setCurrentPage(1);
            }}
            className='h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring'
          >
            {statusOptions.map(op => (
              <option key={op.label} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>

          <select
            value={responsableFilter}
            onChange={event => {
              setResponsableFilter(event.target.value);
              setCurrentPage(1);
            }}
            disabled={!canListCatalogUsers}
            className='h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50'
          >
            <option value=''>Todos los responsables</option>
            {(usersQuery.data ?? []).map(user => (
              <option key={user.id} value={String(user.id)}>
                {user.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='overflow-hidden rounded-xl border border-border bg-card'>
        <div className='md:hidden space-y-3 p-3 sm:p-4'>
          {isPending ? (
            <p className='py-10 text-center text-sm text-muted-foreground'>
              Cargando acciones…
            </p>
          ) : items.length === 0 ? (
            <p className='py-10 text-center text-sm text-muted-foreground'>
              No hay acciones que coincidan con los filtros.
            </p>
          ) : (
            items.map(action => (
              <ActionListItemCard key={action.id} action={action} />
            ))
          )}
        </div>

        <div className='hidden overflow-x-auto md:block'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-border bg-muted/30 text-left text-xs text-muted-foreground'>
                <th className='whitespace-nowrap px-5 py-3 font-medium'>
                  Folio
                </th>
                <th className='whitespace-nowrap px-5 py-3 font-medium'>
                  Área
                </th>
                <th className='max-w-[200px] whitespace-nowrap px-5 py-3 font-medium'>
                  Descripción
                </th>
                <th className='whitespace-nowrap px-5 py-3 font-medium'>
                  Responsable
                </th>
                <th className='whitespace-nowrap px-5 py-3 font-medium'>
                  F. Detección
                </th>
                <th className='whitespace-nowrap px-5 py-3 font-medium'>
                  F. Compromiso
                </th>
                <th className='whitespace-nowrap px-5 py-3 font-medium'>
                  Estatus
                </th>
                <th className='whitespace-nowrap px-5 py-3 font-medium'>
                  Leyenda
                </th>
                <th className='whitespace-nowrap px-5 py-3 font-medium'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <tr>
                  <td
                    colSpan={9}
                    className='px-5 py-12 text-center text-sm text-muted-foreground'
                  >
                    Cargando acciones…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className='px-5 py-12 text-center text-sm text-muted-foreground'
                  >
                    No hay acciones que coincidan con los filtros.
                  </td>
                </tr>
              ) : (
                items.map(action => {
                  const leyenda = getDueDateLegend(action.dueDateStatus);
                  return (
                    <tr
                      key={action.id}
                      className='border-b border-border transition-colors last:border-0 hover:bg-muted/30'
                    >
                      <td className='whitespace-nowrap px-5 py-4'>
                        <span className='font-mono text-sm font-medium text-foreground'>
                          {action.folio}
                        </span>
                      </td>
                      <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                        {action.areaName}
                      </td>
                      <td className='max-w-[200px] px-5 py-4 text-sm text-muted-foreground'>
                        <span className='line-clamp-2'>
                          {action.description}
                        </span>
                      </td>
                      <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                        {action.responsibleName}
                      </td>
                      <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                        {new Date(action.detectedAt).toLocaleDateString(
                          'es-MX',
                        )}
                      </td>
                      <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                        {new Date(action.currentDueDate).toLocaleDateString(
                          'es-MX',
                        )}
                      </td>
                      <td className='whitespace-nowrap px-5 py-4'>
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                            getActionStatusColor(action.status),
                          )}
                        >
                          {getActionStatusLabel(action.status)}
                        </span>
                      </td>
                      <td className='whitespace-nowrap px-5 py-4'>
                        {leyenda ? (
                          <span
                            className={cn(
                              'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                              leyenda.className,
                            )}
                          >
                            {leyenda.label}
                          </span>
                        ) : null}
                      </td>
                      <td className='whitespace-nowrap px-5 py-4'>
                        <div className='flex items-center gap-1'>
                          <Link to={`/acciones/${action.id}`}>
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              className='h-8 w-8 p-0'
                            >
                              <Eye className='h-4 w-4' />
                            </Button>
                          </Link>
                          <Link to={`/acciones/${action.id}`}>
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              className='h-8 w-8 p-0'
                            >
                              <Pencil className='h-4 w-4' />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className='flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
          <p className='text-center text-sm text-muted-foreground sm:text-left'>
            {total === 0
              ? 'Sin resultados'
              : `Mostrando ${(effectivePage - 1) * itemsPerPage + 1} a ${Math.min(
                  effectivePage * itemsPerPage,
                  total,
                )} de ${total} resultados`}
          </p>
          <div className='flex items-center justify-center gap-2 sm:justify-end'>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={effectivePage === totalPages || isPending}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
