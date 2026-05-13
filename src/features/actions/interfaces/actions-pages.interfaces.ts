import type { SiraActionStatus } from '@/features/actions/interfaces/sira-action-api.interfaces';

export const ACTIONS_LIST_PAGE_SIZE = 10;

export interface ActionsListStatusFilterOption {
  value: SiraActionStatus | '';
  label: string;
}

export const ACTIONS_LIST_STATUS_OPTIONS: ActionsListStatusFilterOption[] = [
  { value: '', label: 'Todos los estatus' },
  { value: 'PENDING_ACCEPTANCE', label: 'Pendiente de aceptación' },
  { value: 'OPEN', label: 'Abierta' },
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'EXPIRED', label: 'Expirada' },
  { value: 'REVIEW_CLOSURE', label: 'En revisión de cierre' },
  { value: 'CLOSED', label: 'Cerrada' },
  { value: 'REJECTED', label: 'Rechazada' },
  { value: 'REOPENED', label: 'Reabierta' },
];

export interface MeActionsSignatureModalState {
  isOpen: boolean;
  folio: string;
  descripcion: string;
  actionId: number;
}

export const ME_ACTIONS_SIGNATURE_MODAL_INITIAL: MeActionsSignatureModalState =
  {
    isOpen: false,
    folio: '',
    descripcion: '',
    actionId: 0,
  };

export const ACTION_DETAIL_TABS = [
  { id: 'observaciones', label: 'Observaciones' },
  { id: 'historial', label: 'Historial de cambios' },
  { id: 'fechas', label: 'Cambios de fecha' },
  { id: 'responsable', label: 'Cambio de responsable' },
] as const;

export type ActionDetailTabId = (typeof ACTION_DETAIL_TABS)[number]['id'];
