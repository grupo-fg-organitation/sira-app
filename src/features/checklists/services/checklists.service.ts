import axios from 'axios';
import {
  siraApi,
  type ApiErrorResponse,
  type ApiSuccessResponse,
} from '@/infrastructure/http';
import type {
  ChecklistTemplateDetailApi,
  ChecklistTemplateSummaryApi,
  CreateChecklistTemplatePayload,
  SetChecklistTemplateActivePayload,
  UpdateChecklistTemplatePayload,
} from '@/features/checklists/interfaces/sira-checklist-api.interfaces';

export const CHECKLISTS_QUERY_ROOT = ['checklists', 'templates'] as const;

export const TOURS_ACTIVE_TEMPLATES_QUERY_KEY = [
  'tours',
  'checklist-templates',
  'active',
] as const;

export async function fetchChecklistTemplates(
  activeOnly: boolean,
): Promise<ChecklistTemplateSummaryApi[]> {
  const { data } = await siraApi.get<
    ApiSuccessResponse<ChecklistTemplateSummaryApi[]>
  >('checklists/templates', {
    params: { activeOnly },
  });
  return data.data;
}

export async function fetchChecklistTemplateById(
  templateId: number,
): Promise<ChecklistTemplateDetailApi> {
  const { data } = await siraApi.get<
    ApiSuccessResponse<ChecklistTemplateDetailApi>
  >(`checklists/templates/${templateId}`);
  return data.data;
}

export async function createChecklistTemplate(
  payload: CreateChecklistTemplatePayload,
): Promise<ChecklistTemplateDetailApi> {
  const { data } = await siraApi.post<
    ApiSuccessResponse<ChecklistTemplateDetailApi>
  >('checklists/templates', payload);
  return data.data;
}

export async function updateChecklistTemplate(
  templateId: number,
  payload: UpdateChecklistTemplatePayload,
): Promise<ChecklistTemplateDetailApi> {
  const { data } = await siraApi.patch<
    ApiSuccessResponse<ChecklistTemplateDetailApi>
  >(`checklists/templates/${templateId}`, payload);
  return data.data;
}

export async function setChecklistTemplateActive(
  templateId: number,
  payload: SetChecklistTemplateActivePayload,
): Promise<ChecklistTemplateDetailApi> {
  const { data } = await siraApi.patch<
    ApiSuccessResponse<ChecklistTemplateDetailApi>
  >(`checklists/templates/${templateId}/active`, payload);
  return data.data;
}

export async function deleteChecklistTemplate(
  templateId: number,
): Promise<void> {
  await siraApi.delete<ApiSuccessResponse<null>>(
    `checklists/templates/${templateId}`,
  );
}

export function getChecklistsApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as ApiErrorResponse | undefined;
    if (body && typeof body.message === 'string' && body.message.length > 0) {
      return body.message;
    }
  }
  return 'No se pudo completar la operación. Intenta de nuevo.';
}
