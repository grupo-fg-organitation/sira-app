import type { ReactElement } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ChecklistTemplatesTableProps } from '@/features/checklists/interfaces/checklists-page.components.interfaces';
import {
  Loader2,
  Pencil,
  Power,
  Trash2,
} from 'lucide-react';

function ChecklistTemplateCard({
  template,
  indice,
  togglingTemplateId,
  onEdit,
  onToggleActive,
  onRequestDelete,
}: {
  template: ChecklistTemplatesTableProps['templates'][number];
  indice: number;
  togglingTemplateId: number | null;
  onEdit: ChecklistTemplatesTableProps['onEdit'];
  onToggleActive: ChecklistTemplatesTableProps['onToggleActive'];
  onRequestDelete: ChecklistTemplatesTableProps['onRequestDelete'];
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
      <h3 className='text-base font-semibold text-foreground'>{template.name}</h3>
      <dl className='mt-3 grid gap-2 text-sm'>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>Ítems</dt>
          <dd className='font-medium text-foreground'>{template.itemsCount}</dd>
        </div>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>Estado</dt>
          <dd>
            <span
              className={cn(
                'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium',
                template.isActive
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                  : 'border-border bg-muted/60 text-muted-foreground',
              )}
            >
              {template.isActive ? 'Activa' : 'Inactiva'}
            </span>
          </dd>
        </div>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>Creada</dt>
          <dd className='text-foreground'>
            {new Date(template.createdAt).toLocaleDateString('es-MX')}
          </dd>
        </div>
      </dl>
      <div className='mt-4 flex flex-wrap gap-2'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='cursor-pointer'
          onClick={() => onEdit(template.id)}
        >
          <Pencil className='mr-1 h-3.5 w-3.5' />
          Editar
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='cursor-pointer'
          disabled={togglingTemplateId === template.id}
          onClick={() => void onToggleActive(template)}
        >
          {togglingTemplateId === template.id ? (
            <Loader2 className='h-3.5 w-3.5 animate-spin' />
          ) : (
            <>
              <Power className='mr-1 h-3.5 w-3.5' />
              {template.isActive ? 'Desactivar' : 'Activar'}
            </>
          )}
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive'
          onClick={() => onRequestDelete(template.id, template.name)}
        >
          <Trash2 className='mr-1 h-3.5 w-3.5' />
          Eliminar
        </Button>
      </div>
    </article>
  );
}

export function ChecklistTemplatesTable({
  templates,
  togglingTemplateId,
  onEdit,
  onToggleActive,
  onRequestDelete,
}: ChecklistTemplatesTableProps): ReactElement {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border/80 bg-card/95 shadow-md shadow-black/5 ring-1 ring-black/5 transition-all duration-300 ease-out',
        'motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-primary/15 motion-safe:hover:shadow-lg motion-safe:hover:shadow-black/10 motion-safe:hover:ring-primary/10',
        'dark:shadow-black/25 dark:ring-white/10 dark:motion-safe:hover:shadow-black/40',
      )}
    >
      <div className='md:hidden space-y-3 p-3 sm:p-4'>
        {templates.length === 0 ? (
          <p className='py-10 text-center text-sm text-muted-foreground'>
            No hay plantillas registradas.
          </p>
        ) : (
          templates.map((template, indice) => (
            <ChecklistTemplateCard
              key={template.id}
              template={template}
              indice={indice}
              togglingTemplateId={togglingTemplateId}
              onEdit={onEdit}
              onToggleActive={onToggleActive}
              onRequestDelete={onRequestDelete}
            />
          ))
        )}
      </div>

      <div className='hidden overflow-x-auto md:block'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-border bg-muted/40 text-left text-xs text-muted-foreground shadow-sm backdrop-blur-sm transition-colors duration-200'>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>
                Nombre
              </th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>Ítems</th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>Estado</th>
              <th className='whitespace-nowrap px-5 py-3 font-medium'>
                Creada
              </th>
              <th className='whitespace-nowrap px-5 py-3 font-medium text-right'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {templates.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='px-5 py-12 text-center text-sm text-muted-foreground'
                >
                  No hay plantillas registradas.
                </td>
              </tr>
            ) : (
              templates.map((template, indice) => (
                <tr
                  key={template.id}
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
                  <td className='px-5 py-4 text-sm font-medium text-foreground'>
                    {template.name}
                  </td>
                  <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                    {template.itemsCount}
                  </td>
                  <td className='whitespace-nowrap px-5 py-4'>
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium',
                        template.isActive
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          : 'border-border bg-muted/60 text-muted-foreground',
                      )}
                    >
                      {template.isActive ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                    {new Date(template.createdAt).toLocaleDateString('es-MX')}
                  </td>
                  <td className='whitespace-nowrap px-5 py-4 text-right'>
                    <div className='flex flex-wrap justify-end gap-1'>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        className='cursor-pointer'
                        onClick={() => onEdit(template.id)}
                      >
                        <Pencil className='mr-1 h-3.5 w-3.5' />
                        Editar
                      </Button>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        className='cursor-pointer'
                        disabled={togglingTemplateId === template.id}
                        onClick={() => void onToggleActive(template)}
                      >
                        {togglingTemplateId === template.id ? (
                          <Loader2 className='h-3.5 w-3.5 animate-spin' />
                        ) : (
                          <>
                            <Power className='mr-1 h-3.5 w-3.5' />
                            {template.isActive ? 'Desactivar' : 'Activar'}
                          </>
                        )}
                      </Button>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        className='cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive'
                        onClick={() =>
                          onRequestDelete(template.id, template.name)
                        }
                      >
                        <Trash2 className='mr-1 h-3.5 w-3.5' />
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
