import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ActionSummaryApi } from '@/features/actions/interfaces/sira-action-api.interfaces';
import {
  getActionStatusColor,
  getActionStatusLabel,
  getDueDateLegend,
  toAcceptedDueDateIso,
} from '@/features/actions/lib/actionPresentation';
import { ActionSignatureModal } from '@/features/actions/components/ActionSignatureModal';
import { useMeActionsPage } from '@/features/actions/hooks/useMeActionsPage';
import { getActionsApiErrorMessage } from '@/features/actions/services/actions.service';
import { Eye, AlertTriangle, FileSignature } from 'lucide-react';

function MeActionCard({
  action,
  signMutationPending,
  onOpenSign,
}: {
  action: ActionSummaryApi;
  signMutationPending: boolean;
  onOpenSign: (input: {
    folio: string;
    descripcion: string;
    actionId: number;
  }) => void;
}): ReactElement {
  const leyenda = getDueDateLegend(action.dueDateStatus);
  const firmado = action.status !== 'PENDING_ACCEPTANCE';
  return (
    <article className='rounded-xl border border-border/80 bg-card/95 p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10'>
      <div className='flex items-start justify-between gap-2'>
        <span className='font-mono text-sm font-semibold text-foreground'>
          {action.folio}
        </span>
        <Link to={`/acciones/${action.id}`}>
          <Button type='button' variant='ghost' size='sm' className='shrink-0'>
            <Eye className='mr-1 h-4 w-4' />
            Ver
          </Button>
        </Link>
      </div>
      <div className='mt-2'>
        <p className='line-clamp-3 text-sm text-muted-foreground'>
          {action.description}
        </p>
      </div>
      <dl className='mt-3 grid gap-2 text-sm'>
        <div className='flex justify-between gap-3'>
          <dt className='text-muted-foreground'>F. compromiso</dt>
          <dd className='text-foreground'>
            {new Date(action.currentDueDate).toLocaleDateString('es-MX')}
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
        <div className='flex flex-col gap-2 border-t border-border/60 pt-3'>
          <span className='text-xs font-medium text-muted-foreground'>
            Firma de enterado
          </span>
          {firmado ? (
            <span className='inline-flex items-center gap-1 text-xs text-green-400'>
              <FileSignature className='h-4 w-4' />
              Firmado
            </span>
          ) : (
            <Button
              type='button'
              size='sm'
              disabled={signMutationPending}
              onClick={() =>
                onOpenSign({
                  folio: action.folio,
                  descripcion: action.description,
                  actionId: action.id,
                })
              }
              className='w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto'
            >
              <FileSignature className='mr-1 h-4 w-4' />
              Firmar
            </Button>
          )}
        </div>
      </dl>
    </article>
  );
}

export function MeActionsListView() {
  const {
    listQuery,
    signMutation,
    signatureModal,
    setSignatureModal,
    myActions,
    unsignedActions,
  } = useMeActionsPage();

  return (
    <>
      <div className='dashboard-content-in space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>
            Mis acciones
          </h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Acciones de seguridad asignadas a ti
          </p>
        </div>

        {listQuery.isError ? (
          <p className='text-sm text-destructive'>
            {getActionsApiErrorMessage(listQuery.error)}
          </p>
        ) : null}

        {signMutation.isError ? (
          <p className='text-sm text-destructive'>
            {getActionsApiErrorMessage(signMutation.error)}
          </p>
        ) : null}

        {unsignedActions.length > 0 ? (
          <div className='flex items-center gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4'>
            <AlertTriangle className='h-5 w-5 shrink-0 text-yellow-400' />
            <p className='text-sm text-yellow-400'>
              Tienes <strong>{unsignedActions.length}</strong> acciones
              pendientes de firma de enterado. Firma para confirmar que has
              recibido y aceptas dar seguimiento.
            </p>
          </div>
        ) : null}

        <div className='overflow-hidden rounded-xl border border-border bg-card'>
          <div className='md:hidden space-y-3 p-3 sm:p-4'>
            {listQuery.isPending ? (
              <p className='py-10 text-center text-sm text-muted-foreground'>
                Cargando…
              </p>
            ) : myActions.length > 0 ? (
              myActions.map(action => (
                <MeActionCard
                  key={action.id}
                  action={action}
                  signMutationPending={signMutation.isPending}
                  onOpenSign={input =>
                    setSignatureModal({
                      isOpen: true,
                      folio: input.folio,
                      descripcion: input.descripcion,
                      actionId: input.actionId,
                    })
                  }
                />
              ))
            ) : (
              <p className='py-10 text-center text-sm text-muted-foreground'>
                No tienes acciones asignadas actualmente
              </p>
            )}
          </div>

          <div className='hidden overflow-x-auto md:block'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-border bg-muted/30 text-left text-xs text-muted-foreground'>
                  <th className='whitespace-nowrap px-5 py-3 font-medium'>
                    Folio
                  </th>
                  <th className='max-w-[300px] whitespace-nowrap px-5 py-3 font-medium'>
                    Descripción
                  </th>
                  <th className='whitespace-nowrap px-5 py-3 font-medium'>
                    F. Compromiso
                  </th>
                  <th className='whitespace-nowrap px-5 py-3 font-medium'>
                    Leyenda
                  </th>
                  <th className='whitespace-nowrap px-5 py-3 font-medium'>
                    Estatus
                  </th>
                  <th className='whitespace-nowrap px-5 py-3 font-medium'>
                    Firma
                  </th>
                  <th className='whitespace-nowrap px-5 py-3 font-medium'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {listQuery.isPending ? (
                  <tr>
                    <td
                      colSpan={7}
                      className='px-5 py-12 text-center text-sm text-muted-foreground'
                    >
                      Cargando…
                    </td>
                  </tr>
                ) : myActions.length > 0 ? (
                  myActions.map(action => {
                    const leyenda = getDueDateLegend(action.dueDateStatus);
                    const firmado = action.status !== 'PENDING_ACCEPTANCE';
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
                        <td className='max-w-[300px] px-5 py-4 text-sm text-muted-foreground'>
                          <span className='line-clamp-2'>
                            {action.description}
                          </span>
                        </td>
                        <td className='whitespace-nowrap px-5 py-4 text-sm text-muted-foreground'>
                          {new Date(
                            action.currentDueDate,
                          ).toLocaleDateString('es-MX')}
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
                          {firmado ? (
                            <span className='inline-flex items-center gap-1 text-xs text-green-400'>
                              <FileSignature className='h-4 w-4' />
                              Firmado
                            </span>
                          ) : (
                            <Button
                              type='button'
                              size='sm'
                              disabled={signMutation.isPending}
                              onClick={() =>
                                setSignatureModal({
                                  isOpen: true,
                                  folio: action.folio,
                                  descripcion: action.description,
                                  actionId: action.id,
                                })
                              }
                              className='bg-primary text-primary-foreground hover:bg-primary/90'
                            >
                              <FileSignature className='mr-1 h-4 w-4' />
                              Firmar
                            </Button>
                          )}
                        </td>
                        <td className='whitespace-nowrap px-5 py-4'>
                          <Link to={`/acciones/${action.id}`}>
                            <Button type='button' variant='ghost' size='sm'>
                              <Eye className='mr-1 h-4 w-4' />
                              Ver detalle
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className='px-5 py-12 text-center text-sm text-muted-foreground'
                    >
                      No tienes acciones asignadas actualmente
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {signatureModal.isOpen ? (
        <ActionSignatureModal
          key={signatureModal.actionId}
          onClose={() =>
            setSignatureModal(previous => ({
              ...previous,
              isOpen: false,
            }))
          }
          onConfirm={async (signatureData, fechaCompromiso) => {
            await signMutation.mutateAsync({
              actionId: signatureModal.actionId,
              payload: {
                signatureData,
                acceptedDueDate: toAcceptedDueDateIso(fechaCompromiso),
              },
            });
          }}
          folio={signatureModal.folio}
          descripcion={signatureModal.descripcion}
        />
      ) : null}
    </>
  );
}
