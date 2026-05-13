import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  formatApiDateLong,
  getActionStatusColor,
  getActionStatusLabel,
  getHistoryEventIconClass,
  getPriorityColor,
  getPriorityLabel,
} from '@/features/actions/lib/actionPresentation';
import { ActionHistoryEventIcon } from '@/features/actions/components/ActionHistoryEventIcon';
import { useActionDetailPage } from '@/features/actions/hooks/useActionDetailPage';
import { ACTION_DETAIL_TABS } from '@/features/actions/interfaces/actions-pages.interfaces';
import {
  ArrowLeft,
  Calendar,
  User,
  Building2,
  MapPin,
  CheckCircle2,
  MessageSquare,
  UserPlus,
  CalendarClock,
  AlertTriangle,
  FileSignature,
  Image as ImageIcon,
} from 'lucide-react';

export function ActionDetailView() {
  const {
    action,
    isPending,
    isError,
    activeTab,
    setActiveTab,
    observaciones,
    fechaChanges,
    responsableChanges,
    signedEntry,
    evidenciaInicial,
    evidenciaCierre,
  } = useActionDetailPage();

  if (isPending) {
    return (
      <div className='dashboard-content-in py-16 text-center text-sm text-muted-foreground'>
        Cargando acción…
      </div>
    );
  }

  if (isError || !action) {
    return (
      <div className='dashboard-content-in flex flex-col items-center justify-center py-20'>
        <AlertTriangle className='h-12 w-12 text-muted-foreground' />
        <h2 className='mt-4 text-lg font-semibold text-foreground'>
          Acción no encontrada
        </h2>
        <p className='mt-2 text-sm text-muted-foreground'>
          La acción que buscas no existe o no tienes permiso para verla.
        </p>
        <Link to='/acciones' className='mt-4'>
          <Button type='button'>Volver a acciones</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='dashboard-content-in space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none'>
      <div>
        <Link
          to='/acciones'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4' />
          Volver a acciones
        </Link>
      </div>

      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex items-start gap-4'>
          <div>
            <div className='flex flex-wrap items-center gap-3'>
              <h1 className='font-mono text-2xl font-bold text-foreground'>
                {action.folio}
              </h1>
              <span
                className={cn(
                  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                  getActionStatusColor(action.status),
                )}
              >
                {getActionStatusLabel(action.status)}
              </span>
              <span
                className={cn(
                  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
                  getPriorityColor(action.priority),
                )}
              >
                Prioridad {getPriorityLabel(action.priority)}
              </span>
            </div>
            <div className='mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
              <span className='flex items-center gap-1'>
                <MapPin className='h-4 w-4' />
                {action.area.name}
              </span>
              <span className='flex items-center gap-1'>
                <Building2 className='h-4 w-4' />
                Recorrido {action.tour.folio}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <div className='space-y-6'>
          <div className='rounded-xl border border-border bg-card p-5'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Descripción
            </h3>
            <p className='mt-2 text-foreground'>{action.description}</p>
            {action.initialObservations ? (
              <p className='mt-3 border-t border-border pt-3 text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>
                  Observaciones iniciales:{' '}
                </span>
                {action.initialObservations}
              </p>
            ) : null}
          </div>

          <div className='rounded-xl border border-border bg-card p-5'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Responsable actual
            </h3>
            <div className='mt-3 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground'>
                {action.responsible.fullName
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className='font-medium text-foreground'>
                  {action.responsible.fullName}
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-xl border border-border bg-card p-5'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Fechas
            </h3>
            <div className='mt-3 space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  Fecha de detección
                </span>
                <span className='text-sm font-medium text-foreground'>
                  {formatApiDateLong(action.detectedAt)}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  Compromiso inicial
                </span>
                <span className='text-sm font-medium text-foreground'>
                  {formatApiDateLong(action.initialDueDate)}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  Compromiso vigente
                </span>
                <span className='text-sm font-medium text-primary'>
                  {formatApiDateLong(action.currentDueDate)}
                </span>
              </div>
            </div>
          </div>

          <div className='rounded-xl border border-border bg-card p-5'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Firma de enterado
            </h3>
            {action.status !== 'PENDING_ACCEPTANCE' ? (
              <div className='mt-3 flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20'>
                  <FileSignature className='h-5 w-5 text-green-400' />
                </div>
                <div>
                  <p className='font-medium text-foreground'>
                    {action.responsible.fullName}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {signedEntry
                      ? `Registrado el ${formatApiDateLong(signedEntry.createdAt)}`
                      : 'Enterado registrado'}
                  </p>
                </div>
              </div>
            ) : (
              <div className='mt-3 flex items-center gap-3 rounded-lg bg-yellow-500/10 p-3'>
                <AlertTriangle className='h-5 w-5 text-yellow-400' />
                <p className='text-sm text-yellow-400'>Pendiente de firma</p>
              </div>
            )}
          </div>
        </div>

        <div className='rounded-xl border border-border bg-card p-5'>
          <h3 className='text-sm font-medium text-muted-foreground'>
            Evidencias
          </h3>
          <div className='mt-4 grid grid-cols-2 gap-4'>
            <div>
              <p className='mb-2 text-xs font-medium text-muted-foreground'>
                ANTES
              </p>
              <div className='relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted'>
                {evidenciaInicial &&
                evidenciaInicial.mimeType?.startsWith('image/') ? (
                  <img
                    src={evidenciaInicial.fileUrl}
                    alt='Evidencia inicial'
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div className='absolute inset-0 flex items-center justify-center bg-muted'>
                    <div className='text-center'>
                      <ImageIcon className='mx-auto h-12 w-12 text-muted-foreground' />
                      <p className='mt-2 text-xs text-muted-foreground'>
                        {evidenciaInicial
                          ? 'Archivo no visualizable aquí'
                          : 'Sin evidencia inicial'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className='mb-2 text-xs font-medium text-muted-foreground'>
                DESPUÉS
              </p>
              <div className='relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted'>
                {evidenciaCierre &&
                evidenciaCierre.mimeType?.startsWith('image/') ? (
                  <img
                    src={evidenciaCierre.fileUrl}
                    alt='Evidencia de cierre'
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div className='absolute inset-0 flex items-center justify-center bg-muted'>
                    <div className='text-center'>
                      <ImageIcon
                        className={cn(
                          'mx-auto h-12 w-12',
                          evidenciaCierre
                            ? 'text-green-400'
                            : 'text-muted-foreground',
                        )}
                      />
                      <p className='mt-2 text-xs text-muted-foreground'>
                        {evidenciaCierre
                          ? 'Archivo no visualizable aquí'
                          : 'Sin evidencia de cierre'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='overflow-hidden rounded-xl border border-border bg-card'>
        <div className='flex overflow-x-auto border-b border-border'>
          {ACTION_DETAIL_TABS.map(tab => (
            <button
              key={tab.id}
              type='button'
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'whitespace-nowrap px-5 py-3 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className='p-5'>
          {activeTab === 'observaciones' ? (
            <div className='space-y-4'>
              {observaciones.length > 0 ? (
                observaciones.map(obs => (
                  <div
                    key={obs.id}
                    className='rounded-lg border border-border bg-muted/30 p-4'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='font-medium text-foreground'>
                        {obs.user.fullName}
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        {new Date(obs.createdAt).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                    <p className='mt-2 text-sm text-muted-foreground'>
                      {obs.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className='py-8 text-center text-sm text-muted-foreground'>
                  No hay observaciones registradas
                </p>
              )}
            </div>
          ) : null}

          {activeTab === 'historial' ? (
            <div className='relative'>
              <div className='absolute left-4 top-0 h-full w-0.5 bg-border' />
              <div className='space-y-6'>
                {action.history.map(item => (
                  <div key={item.id} className='relative flex gap-4 pl-10'>
                    <div
                      className={cn(
                        'absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border',
                        getHistoryEventIconClass(item.eventType),
                      )}
                    >
                      <ActionHistoryEventIcon eventType={item.eventType} />
                    </div>
                    <div className='flex-1 pt-1'>
                      <p className='font-medium text-foreground'>
                        {item.description}
                      </p>
                      <div className='mt-1 flex items-center gap-2 text-xs text-muted-foreground'>
                        <User className='h-3 w-3' />
                        {item.user.fullName}
                        <span className='mx-1'>•</span>
                        {new Date(item.createdAt).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === 'fechas' ? (
            <div className='space-y-4'>
              {fechaChanges.length > 0 ? (
                fechaChanges.map(change => (
                  <div
                    key={change.id}
                    className='rounded-lg border border-border bg-muted/30 p-4'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='font-medium text-foreground'>
                        {change.description}
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        {new Date(change.createdAt).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      Por: {change.user.fullName}
                    </p>
                  </div>
                ))
              ) : (
                <p className='py-8 text-center text-sm text-muted-foreground'>
                  No hay cambios de fecha registrados
                </p>
              )}
            </div>
          ) : null}

          {activeTab === 'responsable' ? (
            <div className='space-y-4'>
              {responsableChanges.length > 0 ? (
                responsableChanges.map(change => (
                  <div
                    key={change.id}
                    className='rounded-lg border border-border bg-muted/30 p-4'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='font-medium text-foreground'>
                        {change.description}
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        {new Date(change.createdAt).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      Por: {change.user.fullName}
                    </p>
                  </div>
                ))
              ) : (
                <p className='py-8 text-center text-sm text-muted-foreground'>
                  No hay cambios de responsable registrados
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4'>
        <Button
          type='button'
          className='bg-primary text-primary-foreground hover:bg-primary/90'
        >
          <CheckCircle2 className='mr-2 h-4 w-4' />
          Solicitar cierre
        </Button>
        <Button type='button' variant='outline'>
          <MessageSquare className='mr-2 h-4 w-4' />
          Agregar observación
        </Button>
        <Button type='button' variant='outline'>
          <UserPlus className='mr-2 h-4 w-4' />
          Cambiar responsable
        </Button>
        <Button type='button' variant='outline'>
          <CalendarClock className='mr-2 h-4 w-4' />
          Cambiar fecha
        </Button>
      </div>
    </div>
  );
}
