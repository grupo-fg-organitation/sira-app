export type SiraActionStatus =
  | 'PENDING_ACCEPTANCE'
  | 'OPEN'
  | 'PENDING'
  | 'EXPIRED'
  | 'REVIEW_CLOSURE'
  | 'CLOSED'
  | 'REJECTED'
  | 'REOPENED';

export type SiraPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type SiraActionDueDateStatus =
  | 'WITHIN_DUE'
  | 'OVERDUE'
  | 'NOT_APPLICABLE';

export type SiraEvidenceType = 'INITIAL' | 'CLOSURE' | 'FOLLOWUP';

export type SiraHistoryEventType =
  | 'CREATED'
  | 'ASSIGNED'
  | 'ACCEPTED'
  | 'SIGNED'
  | 'STATUS_CHANGED'
  | 'RESPONSIBLE_CHANGED'
  | 'DUE_DATE_CHANGED'
  | 'OBSERVATION_ADDED'
  | 'EVIDENCE_UPLOADED'
  | 'CLOSURE_REQUESTED'
  | 'CLOSURE_APPROVED'
  | 'CLOSURE_REJECTED'
  | 'REOPENED';

export interface ActionEvidenceApi {
  id: number;
  type: SiraEvidenceType;
  fileUrl: string;
  fileKey: string;
  mimeType: string | null;
  originalFileName: string | null;
  description: string | null;
  uploadedById: number;
  uploadedAt: string;
}

export interface ActionHistoryEntryApi {
  id: number;
  userId: number;
  user: { id: number; fullName: string };
  eventType: SiraHistoryEventType;
  description: string;
  metadata: unknown;
  createdAt: string;
}

export interface ActionSummaryApi {
  id: number;
  folio: string;
  tourId: number;
  tourFolio: string;
  areaId: number;
  areaName: string;
  status: SiraActionStatus;
  priority: SiraPriority;
  responsibleId: number;
  responsibleName: string;
  createdById: number;
  createdByName: string;
  detectedAt: string;
  currentDueDate: string;
  description: string;
  createdAt: string;
  dueDateStatus: SiraActionDueDateStatus;
}

export interface PaginatedActionSummariesApi {
  items: ActionSummaryApi[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ActionCountByStatusApi {
  status: SiraActionStatus;
  count: number;
}

export interface ActionCountByAreaApi {
  areaId: number;
  areaName: string;
  count: number;
}

export interface ActionCountByResponsibleApi {
  responsibleId: number;
  responsibleName: string;
  count: number;
}

export interface ActionMonthlyTrendPointApi {
  mes: string;
  creadas: number;
  cerradas: number;
}

export interface ActionDashboardMetricsApi {
  total: number;
  byStatus: ActionCountByStatusApi[];
  byArea: ActionCountByAreaApi[];
  byResponsible: ActionCountByResponsibleApi[];
  overdueCount: number;
  openWithinDueCount: number;
  averageDaysToClose: number | null;
  medianDaysToClose: number | null;
  monthlyTrend: ActionMonthlyTrendPointApi[];
}

export interface ActionWithDetailsApi {
  id: number;
  folio: string;
  tourId: number;
  companyId: number;
  areaId: number;
  area: { id: number; name: string };
  createdById: number;
  createdBy: { id: number; fullName: string; email: string };
  responsibleId: number;
  responsible: { id: number; fullName: string; email: string };
  checklistItemId: number | null;
  description: string;
  detectedAt: string;
  initialDueDate: string;
  currentDueDate: string;
  priority: SiraPriority;
  status: SiraActionStatus;
  initialObservations: string | null;
  createdAt: string;
  updatedAt: string;
  tour: { id: number; folio: string; tourDate: string };
  evidences: ActionEvidenceApi[];
  history: ActionHistoryEntryApi[];
  dueDateStatus: SiraActionDueDateStatus;
}

export interface ListActionsQueryParams {
  page?: number;
  pageSize?: number;
  status?: SiraActionStatus;
  areaId?: number;
  responsibleId?: number;
  dateFrom?: string;
  dateTo?: string;
}
