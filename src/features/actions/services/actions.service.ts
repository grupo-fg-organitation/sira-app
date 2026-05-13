import axios from 'axios';
import {
  siraApi,
  type ApiErrorResponse,
  type ApiSuccessResponse,
} from '@/infrastructure/http';
import type {
  ActionDashboardMetricsApi,
  ActionWithDetailsApi,
  ListActionsQueryParams,
  PaginatedActionSummariesApi,
} from '@/features/actions/interfaces/sira-action-api.interfaces';

export const ACTIONS_QUERY_ROOT = ['actions'] as const;

export async function fetchActionsList(
  params: ListActionsQueryParams,
): Promise<PaginatedActionSummariesApi> {
  const { data } = await siraApi.get<
    ApiSuccessResponse<PaginatedActionSummariesApi>
  >('actions', {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      status: params.status,
      areaId: params.areaId,
      responsibleId: params.responsibleId,
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
    },
  });
  return data.data;
}

export async function fetchActionsDashboard(): Promise<ActionDashboardMetricsApi> {
  const { data } =
    await siraApi.get<ApiSuccessResponse<ActionDashboardMetricsApi>>(
      'actions/dashboard',
    );
  return data.data;
}

export async function fetchActionById(
  actionId: number,
): Promise<ActionWithDetailsApi> {
  const { data } = await siraApi.get<ApiSuccessResponse<ActionWithDetailsApi>>(
    `actions/${actionId}`,
  );
  return data.data;
}

export interface SignActionAcceptancePayload {
  acceptedDueDate: string;
  signatureData: string;
}

export async function signActionAcceptance(
  actionId: number,
  payload: SignActionAcceptancePayload,
): Promise<ActionWithDetailsApi> {
  const { data } = await siraApi.post<ApiSuccessResponse<ActionWithDetailsApi>>(
    `actions/${actionId}/sign-acceptance`,
    payload,
  );
  return data.data;
}

export function getActionsApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as ApiErrorResponse | undefined;
    if (body && typeof body.message === 'string' && body.message.length > 0) {
      return body.message;
    }
  }
  return 'No se pudo completar la operación. Intenta de nuevo.';
}
