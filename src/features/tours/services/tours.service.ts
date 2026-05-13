import axios from 'axios';
import {
  siraApi,
  type ApiErrorResponse,
  type ApiSuccessResponse,
} from '@/infrastructure/http';
import type {
  CreateTourPayload,
  ListToursQueryParams,
  PaginatedTourSummariesApi,
  TourWithDetailsApi,
} from '@/features/tours/interfaces/sira-tour-api.interfaces';
import { fetchChecklistTemplates } from '@/features/checklists/services/checklists.service';
import type { ChecklistTemplateSummaryApi } from '@/features/checklists/interfaces/sira-checklist-api.interfaces';

export const TOURS_QUERY_ROOT = ['tours'] as const;

export async function fetchToursList(
  params: ListToursQueryParams,
): Promise<PaginatedTourSummariesApi> {
  const { data } = await siraApi.get<
    ApiSuccessResponse<PaginatedTourSummariesApi>
  >('tours', {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      areaId: params.areaId,
      createdById: params.createdById,
      tourDateFrom: params.tourDateFrom,
      tourDateTo: params.tourDateTo,
      status: params.status,
    },
  });
  return data.data;
}

export async function createTour(
  payload: CreateTourPayload,
): Promise<TourWithDetailsApi> {
  const { data } = await siraApi.post<ApiSuccessResponse<TourWithDetailsApi>>(
    'tours',
    payload,
  );
  return data.data;
}

export async function fetchTourById(
  tourId: number,
): Promise<TourWithDetailsApi> {
  const { data } = await siraApi.get<ApiSuccessResponse<TourWithDetailsApi>>(
    `tours/${tourId}`,
  );
  return data.data;
}

export async function fetchActiveChecklistTemplates(): Promise<
  ChecklistTemplateSummaryApi[]
> {
  return fetchChecklistTemplates(true);
}

export function getToursApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as ApiErrorResponse | undefined;
    if (body && typeof body.message === 'string' && body.message.length > 0) {
      return body.message;
    }
  }
  return 'No se pudo completar la operación. Intenta de nuevo.';
}
