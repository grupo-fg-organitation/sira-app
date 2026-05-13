import type {
  SiraActionDueDateStatus,
  SiraActionStatus,
  SiraHistoryEventType,
  SiraPriority,
} from '@/features/actions/interfaces/sira-action-api.interfaces';

export function getActionStatusColor(status: SiraActionStatus): string {
  switch (status) {
    case 'OPEN':
    case 'REOPENED':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'CLOSED':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'EXPIRED':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'REVIEW_CLOSURE':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'PENDING_ACCEPTANCE':
    case 'PENDING':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'REJECTED':
      return 'bg-red-900/30 text-red-300 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export function getActionStatusLabel(status: SiraActionStatus): string {
  switch (status) {
    case 'PENDING_ACCEPTANCE':
      return 'Pendiente de aceptación';
    case 'OPEN':
      return 'Abierta';
    case 'PENDING':
      return 'Pendiente';
    case 'EXPIRED':
      return 'Expirada';
    case 'REVIEW_CLOSURE':
      return 'En revisión de cierre';
    case 'CLOSED':
      return 'Cerrada';
    case 'REJECTED':
      return 'Rechazada';
    case 'REOPENED':
      return 'Reabierta';
    default:
      return status;
  }
}

export function getPriorityColor(priority: SiraPriority): string {
  switch (priority) {
    case 'CRITICAL':
    case 'HIGH':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'MEDIUM':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'LOW':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export function getPriorityLabel(priority: SiraPriority): string {
  switch (priority) {
    case 'CRITICAL':
      return 'Crítica';
    case 'HIGH':
      return 'Alta';
    case 'MEDIUM':
      return 'Media';
    case 'LOW':
      return 'Baja';
    default:
      return priority;
  }
}

export function getDueDateLegend(
  dueDateStatus: SiraActionDueDateStatus,
): { label: string; className: string } | null {
  if (dueDateStatus === 'NOT_APPLICABLE') {
    return null;
  }
  if (dueDateStatus === 'OVERDUE') {
    return {
      label: 'EXPIRADO',
      className: 'bg-red-500/20 text-red-400',
    };
  }
  return {
    label: 'EN PLAZO',
    className: 'bg-green-500/20 text-green-400',
  };
}

export function getHistoryEventIconClass(
  eventType: SiraHistoryEventType,
): string {
  switch (eventType) {
    case 'CREATED':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'DUE_DATE_CHANGED':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'RESPONSIBLE_CHANGED':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'OBSERVATION_ADDED':
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    case 'CLOSURE_REQUESTED':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'CLOSURE_APPROVED':
    case 'ACCEPTED':
    case 'SIGNED':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'CLOSURE_REJECTED':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export function formatApiDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX');
}

export function formatApiDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function toAcceptedDueDateIso(dateYmd: string): string {
  return new Date(`${dateYmd}T12:00:00`).toISOString();
}

export function tourStatusLabel(status: string): string {
  switch (status) {
    case 'DRAFT':
      return 'Borrador';
    case 'IN_PROGRESS':
      return 'En progreso';
    case 'COMPLETED':
      return 'Completado';
    case 'CANCELLED':
      return 'Cancelado';
    default:
      return status;
  }
}

export function tourStatusPillClass(status: string): string {
  switch (status) {
    case 'COMPLETED':
      return 'border-green-500/30 bg-green-500/20 text-green-400';
    case 'CANCELLED':
      return 'border-muted-foreground/30 bg-muted text-muted-foreground';
    case 'DRAFT':
      return 'border-border bg-muted/50 text-muted-foreground';
    default:
      return 'border-blue-500/30 bg-blue-500/20 text-blue-400';
  }
}
