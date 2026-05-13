import { Dialog } from '@base-ui/react/dialog';
import { Controller } from 'react-hook-form';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { ChecklistTemplateFormDialogProps } from '@/features/checklists/interfaces/checklists-page.components.interfaces';
import { Loader2, Plus, Trash2 } from 'lucide-react';

function backdropClassName(state: { open: boolean }): string {
  return cn(
    'fixed inset-0 z-200 cursor-pointer bg-black/45 backdrop-blur-[2px] transition-[opacity,backdrop-filter] duration-200 ease-out motion-reduce:transition-none',
    state.open
      ? 'opacity-100'
      : 'pointer-events-none opacity-0 data-[ending-style]:opacity-0',
    'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
  );
}

function popupClassName(state: { open: boolean }): string {
  return cn(
    'max-h-[min(92dvh,48rem)] w-full max-w-3xl origin-center overflow-y-auto rounded-2xl border border-border/70 bg-card/98 p-6 text-card-foreground shadow-2xl shadow-black/20 ring-1 ring-black/5 transition-[opacity,transform,box-shadow] duration-200 ease-out outline-none motion-reduce:transition-none dark:ring-white/10',
    'data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0',
    'data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0',
    state.open && 'shadow-black/25',
  );
}

const textareaClassName: string = cn(
  'min-h-[5rem] w-full min-w-0 resize-y rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm shadow-sm transition-all duration-200 outline-none',
  'hover:border-primary/25 hover:shadow-md placeholder:text-muted-foreground',
  'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  'disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
  'dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
);

export function ChecklistTemplateFormDialog({
  open,
  onOpenChange,
  mode,
  detailLoading,
  detailError,
  onRetryDetail,
  register,
  control,
  errors,
  fieldRows,
  fieldsLength,
  onAddItem,
  removeItem,
  onSubmit,
  isSaving,
}: ChecklistTemplateFormDialogProps) {
  const isEdit = mode === 'edit';
  const showDetailLoader = isEdit && detailLoading;
  const showDetailError = isEdit && detailError && !detailLoading;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={backdropClassName} />
        <Dialog.Viewport className='fixed inset-0 z-200 grid cursor-pointer place-items-center p-4'>
          <Dialog.Popup
            className={popupClassName}
            initialFocus={false}
            onClick={event => event.stopPropagation()}
          >
            <Dialog.Title className='text-lg font-semibold tracking-tight text-foreground'>
              {isEdit ? 'Editar plantilla' : 'Nueva plantilla'}
            </Dialog.Title>
            <Dialog.Description className='mt-1 text-sm text-muted-foreground'>
              {isEdit
                ? 'Modifica el nombre y los ítems. Los ítems en uso en recorridos no se pueden eliminar.'
                : 'Define un nombre y al menos una pregunta. El orden determina cómo se muestran en el recorrido.'}
            </Dialog.Description>

            {showDetailLoader ? (
              <div className='mt-10 flex flex-col items-center justify-center gap-3 py-8 text-muted-foreground'>
                <Loader2 className='h-10 w-10 animate-spin' aria-hidden />
                <p className='text-sm font-medium'>Cargando plantilla…</p>
              </div>
            ) : null}

            {showDetailError ? (
              <div className='mt-6 space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-center'>
                <p className='text-sm text-destructive'>
                  No se pudo cargar la plantilla.
                </p>
                <Button
                  type='button'
                  variant='outline'
                  className='cursor-pointer'
                  onClick={onRetryDetail}
                >
                  Reintentar
                </Button>
              </div>
            ) : null}

            {!showDetailLoader && !showDetailError ? (
              <form
                className='mt-5 space-y-5'
                onSubmit={onSubmit}
                noValidate
              >
                <div className='space-y-2'>
                  <Label htmlFor='checklist-template-name'>Nombre</Label>
                  <Input
                    id='checklist-template-name'
                    autoComplete='off'
                    className='cursor-text shadow-sm transition-shadow duration-200 hover:shadow-md'
                    aria-invalid={errors.name ? true : undefined}
                    {...register('name')}
                  />
                  {errors.name ? (
                    <p className='text-xs font-medium text-destructive'>
                      {errors.name.message}
                    </p>
                  ) : null}
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center justify-between gap-2'>
                    <Label>Ítems del checklist</Label>
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className='cursor-pointer'
                      onClick={onAddItem}
                    >
                      <Plus className='mr-1 h-3.5 w-3.5' />
                      Añadir ítem
                    </Button>
                  </div>
                  {errors.items &&
                  typeof errors.items === 'object' &&
                  'message' in errors.items ? (
                    <p className='text-xs font-medium text-destructive'>
                      {String(errors.items.message)}
                    </p>
                  ) : null}

                  <div className='max-h-[min(42vh,22rem)] space-y-4 overflow-y-auto pr-1'>
                    {fieldRows.map((fieldRow, index) => (
                      <div
                        key={fieldRow.id}
                        className='rounded-xl border border-border/80 bg-muted/15 p-4 shadow-sm'
                      >
                        <div className='mb-3 flex items-start justify-between gap-2'>
                          <span className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                            Ítem {index + 1}
                          </span>
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='h-8 cursor-pointer text-muted-foreground hover:text-destructive'
                            disabled={fieldsLength <= 1}
                            onClick={() => removeItem(index)}
                            aria-label={`Eliminar ítem ${index + 1}`}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                        {isEdit ? (
                          <input
                            type='hidden'
                            {...register(`items.${index}.itemId`, {
                              setValueAs: (value: unknown) => {
                                if (
                                  value === '' ||
                                  value === undefined ||
                                  value === null
                                ) {
                                  return undefined;
                                }
                                const n = Number(value);
                                return Number.isFinite(n) ? n : undefined;
                              },
                            })}
                          />
                        ) : null}
                        <div className='flex flex-col gap-3'>
                          <div className='space-y-2'>
                            <Label htmlFor={`checklist-order-${fieldRow.id}`}>
                              Orden
                            </Label>
                            <Input
                              id={`checklist-order-${fieldRow.id}`}
                              type='number'
                              min={0}
                              step={1}
                              className='max-w-[8rem] cursor-text shadow-sm transition-shadow duration-200 hover:shadow-md'
                              aria-invalid={
                                errors.items?.[index]?.order
                                  ? true
                                  : undefined
                              }
                              {...register(`items.${index}.order`, {
                                valueAsNumber: true,
                              })}
                            />
                            {errors.items?.[index]?.order ? (
                              <p className='text-xs font-medium text-destructive'>
                                {errors.items[index]?.order?.message}
                              </p>
                            ) : null}
                          </div>
                          <div className='space-y-2'>
                            <Label
                              htmlFor={`checklist-question-${fieldRow.id}`}
                            >
                              Pregunta
                            </Label>
                            <textarea
                              id={`checklist-question-${fieldRow.id}`}
                              className={textareaClassName}
                              aria-invalid={
                                errors.items?.[index]?.question
                                  ? true
                                  : undefined
                              }
                              {...register(`items.${index}.question`)}
                            />
                            {errors.items?.[index]?.question ? (
                              <p className='text-xs font-medium text-destructive'>
                                {errors.items[index]?.question?.message}
                              </p>
                            ) : null}
                          </div>
                          <div className='flex items-center gap-2 pt-1'>
                            <Controller
                              name={`items.${index}.required`}
                              control={control}
                              render={({ field }) => (
                                <Checkbox
                                  id={`checklist-required-${fieldRow.id}`}
                                  checked={field.value}
                                  onCheckedChange={checked => {
                                    field.onChange(checked === true);
                                  }}
                                />
                              )}
                            />
                            <label
                              htmlFor={`checklist-required-${fieldRow.id}`}
                              className='cursor-pointer text-sm text-foreground'
                            >
                              Obligatorio (debe marcarse cumplimiento)
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end'>
                  <Dialog.Close
                    type='button'
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'default' }),
                      'w-full cursor-pointer transition-all duration-200 hover:shadow-md sm:w-auto',
                    )}
                  >
                    Cancelar
                  </Dialog.Close>
                  <Button
                    type='submit'
                    disabled={isSaving}
                    className='w-full cursor-pointer shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 sm:w-auto motion-reduce:hover:translate-y-0'
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Guardando…
                      </>
                    ) : (
                      'Guardar'
                    )}
                  </Button>
                </div>
              </form>
            ) : null}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
