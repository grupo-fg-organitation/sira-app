export type SiraTourStatus =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface TourSummaryApi {
  id: number;
  folio: string;
  tourDate: string;
  status: SiraTourStatus;
  areaId: number;
  areaName: string;
  companyId: number;
  companyName: string;
  templateId: number | null;
  templateName: string | null;
  createdById: number;
  createdByName: string;
  createdAt: string;
}

export interface PaginatedTourSummariesApi {
  items: TourSummaryApi[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ListToursQueryParams {
  page?: number;
  pageSize?: number;
  areaId?: number;
  createdById?: number;
  tourDateFrom?: string;
  tourDateTo?: string;
  status?: SiraTourStatus;
}

export interface CreateTourPayload {
  areaId: number;
  templateId?: number;
  tourDate?: string;
  generalNotes?: string;
}

export type { ChecklistTemplateSummaryApi } from '@/features/checklists/interfaces/sira-checklist-api.interfaces';

export interface TourChecklistResponseDetailApi {
  id: number;
  itemId: number;
  response: string | null;
  compliant: boolean | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  item: {
    id: number;
    order: number;
    question: string;
    required: boolean;
  };
}

export interface TourWithDetailsApi {
  id: number;
  folio: string;
  tourDate: string;
  status: SiraTourStatus;
  completedAt: string | null;
  companyId: number;
  areaId: number;
  area: { id: number; name: string };
  templateId: number | null;
  template: { id: number; name: string } | null;
  generalNotes: string | null;
  createdById: number;
  createdBy: { id: number; fullName: string; email: string };
  createdAt: string;
  checklistResponses: Array<
    TourChecklistResponseDetailApi & { history?: unknown[] }
  >;
}
