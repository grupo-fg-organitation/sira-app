import { Dialog } from '@base-ui/react/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { USER_CATALOG_ROLES_SELECT } from '@/features/users/interfaces/users-page.constants';
import type { UserFormDialogProps } from '@/features/users/interfaces/users-page.components.interfaces';
import { Loader2 } from 'lucide-react';

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
    'max-h-[min(90dvh,44rem)] w-full max-w-md origin-center overflow-y-auto rounded-2xl border border-border/70 bg-card/98 p-6 text-card-foreground shadow-2xl shadow-black/20 ring-1 ring-black/5 transition-[opacity,transform,box-shadow] duration-200 ease-out outline-none motion-reduce:transition-none dark:ring-white/10',
    'data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0',
    'data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0',
    state.open && 'shadow-black/25',
  );
}

const selectFieldClassName: string = cn(
  'h-9 w-full min-w-0 cursor-pointer rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm shadow-sm transition-all duration-200 outline-none',
  'hover:border-primary/30 hover:shadow-md',
  'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'dark:bg-input/30',
);

export function UserFormDialog({
  open,
  onOpenChange,
  title,
  description,
  isCreateMode,
  companyCatalogOptions,
  companyCatalogLoading,
  register,
  errors,
  onSubmit,
  isSaving,
}: UserFormDialogProps) {
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
              {title}
            </Dialog.Title>
            <Dialog.Description className='mt-1 text-sm text-muted-foreground'>
              {description}
            </Dialog.Description>

            <form
              className='mt-5 space-y-4'
              onSubmit={onSubmit}
              noValidate
            >
              <div className='space-y-2'>
                <Label htmlFor='usuario-nombre'>Nombre completo</Label>
                <Input
                  id='usuario-nombre'
                  autoComplete='name'
                  className='cursor-text shadow-sm transition-shadow duration-200 hover:shadow-md'
                  aria-invalid={errors.fullName ? true : undefined}
                  {...register('fullName')}
                />
                {errors.fullName ? (
                  <p className='text-xs font-medium text-destructive'>
                    {errors.fullName.message}
                  </p>
                ) : null}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='usuario-email'>Correo</Label>
                <Input
                  id='usuario-email'
                  type='email'
                  autoComplete='email'
                  className='cursor-text shadow-sm transition-shadow duration-200 hover:shadow-md'
                  aria-invalid={errors.email ? true : undefined}
                  {...register('email')}
                />
                {errors.email ? (
                  <p className='text-xs font-medium text-destructive'>
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='usuario-telefono'>Teléfono (opcional)</Label>
                <Input
                  id='usuario-telefono'
                  type='tel'
                  autoComplete='tel'
                  className='cursor-text shadow-sm transition-shadow duration-200 hover:shadow-md'
                  aria-invalid={errors.phone ? true : undefined}
                  {...register('phone')}
                />
                {errors.phone ? (
                  <p className='text-xs font-medium text-destructive'>
                    {errors.phone.message}
                  </p>
                ) : null}
              </div>

              {isCreateMode && companyCatalogOptions.length > 0 ? (
                <div className='space-y-2'>
                  <Label htmlFor='usuario-compania'>Compañía</Label>
                  <select
                    id='usuario-compania'
                    className={selectFieldClassName}
                    disabled={companyCatalogLoading}
                    aria-invalid={errors.companyId ? true : undefined}
                    {...register('companyId', { valueAsNumber: true })}
                  >
                    {companyCatalogOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {errors.companyId ? (
                    <p className='text-xs font-medium text-destructive'>
                      {errors.companyId.message}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div className='space-y-2'>
                <Label htmlFor='usuario-rol'>Rol</Label>
                <select
                  id='usuario-rol'
                  className={selectFieldClassName}
                  aria-invalid={errors.role ? true : undefined}
                  {...register('role')}
                >
                  {USER_CATALOG_ROLES_SELECT.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.role ? (
                  <p className='text-xs font-medium text-destructive'>
                    {errors.role.message}
                  </p>
                ) : null}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='usuario-departamento'>Departamento</Label>
                <Input
                  id='usuario-departamento'
                  autoComplete='organization'
                  className='cursor-text shadow-sm transition-shadow duration-200 hover:shadow-md'
                  aria-invalid={errors.department ? true : undefined}
                  {...register('department')}
                />
                {errors.department ? (
                  <p className='text-xs font-medium text-destructive'>
                    {errors.department.message}
                  </p>
                ) : null}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='usuario-password'>
                  {isCreateMode
                    ? 'Contraseña inicial'
                    : 'Nueva contraseña (opcional)'}
                </Label>
                <Input
                  id='usuario-password'
                  type='password'
                  autoComplete='new-password'
                  className='cursor-text shadow-sm transition-shadow duration-200 hover:shadow-md'
                  aria-invalid={errors.password ? true : undefined}
                  {...register('password')}
                />
                {errors.password ? (
                  <p className='text-xs font-medium text-destructive'>
                    {errors.password.message}
                  </p>
                ) : null}
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
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
