import { Dialog } from '@base-ui/react/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ChecklistDeleteDialogProps } from '@/features/checklists/interfaces/checklists-page.components.interfaces';
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
    'max-h-[min(90dvh,28rem)] w-full max-w-md origin-center overflow-y-auto rounded-2xl border border-border/70 bg-card/98 p-6 text-card-foreground shadow-2xl shadow-black/20 ring-1 ring-black/5 transition-[opacity,transform,box-shadow] duration-200 ease-out outline-none motion-reduce:transition-none dark:ring-white/10',
    'data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0',
    'data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0',
    state.open && 'shadow-black/25',
  );
}

export function ChecklistDeleteDialog({
  open,
  onOpenChange,
  templateName,
  onConfirm,
  isDeleting,
}: ChecklistDeleteDialogProps) {
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
              Eliminar plantilla
            </Dialog.Title>
            <Dialog.Description className='mt-1 text-sm text-muted-foreground'>
              ¿Seguro que deseas eliminar la plantilla{' '}
              <span className='font-medium text-foreground'>{templateName}</span>
              ? Solo es posible si no hay recorridos asociados.
            </Dialog.Description>

            <div className='mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
              <Dialog.Close
                type='button'
                disabled={isDeleting}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'default' }),
                  'w-full cursor-pointer transition-all duration-200 hover:shadow-md sm:w-auto',
                )}
              >
                Cancelar
              </Dialog.Close>
              <Button
                type='button'
                variant='destructive'
                disabled={isDeleting}
                className='w-full cursor-pointer sm:w-auto'
                onClick={() => void onConfirm()}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Eliminando…
                  </>
                ) : (
                  'Eliminar'
                )}
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
