import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  CHECKLISTS_QUERY_ROOT,
  TOURS_ACTIVE_TEMPLATES_QUERY_KEY,
  createChecklistTemplate,
  deleteChecklistTemplate,
  fetchChecklistTemplateById,
  fetchChecklistTemplates,
  setChecklistTemplateActive,
  updateChecklistTemplate,
} from '@/features/checklists/services/checklists.service';
import type {
  CreateChecklistTemplatePayload,
  SetChecklistTemplateActivePayload,
  UpdateChecklistTemplatePayload,
} from '@/features/checklists/interfaces/sira-checklist-api.interfaces';

export function useChecklistTemplatesListQuery(enabled: boolean) {
  return useQuery({
    queryKey: [...CHECKLISTS_QUERY_ROOT, 'list', { activeOnly: false }] as const,
    queryFn: () => fetchChecklistTemplates(false),
    enabled,
  });
}

export function useChecklistTemplateDetailQuery(
  templateId: number | null,
  enabled: boolean,
) {
  return useQuery({
    queryKey: [...CHECKLISTS_QUERY_ROOT, 'detail', templateId] as const,
    queryFn: () => fetchChecklistTemplateById(templateId!),
    enabled:
      enabled && templateId !== null && Number.isFinite(templateId),
  });
}

export function useCreateChecklistTemplateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateChecklistTemplatePayload) =>
      createChecklistTemplate(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...CHECKLISTS_QUERY_ROOT],
      });
      await queryClient.invalidateQueries({
        queryKey: [...TOURS_ACTIVE_TEMPLATES_QUERY_KEY],
      });
    },
  });
}

export function useUpdateChecklistTemplateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      templateId: number;
      payload: UpdateChecklistTemplatePayload;
    }) => updateChecklistTemplate(input.templateId, input.payload),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [...CHECKLISTS_QUERY_ROOT],
      });
      await queryClient.invalidateQueries({
        queryKey: [...TOURS_ACTIVE_TEMPLATES_QUERY_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [...CHECKLISTS_QUERY_ROOT, 'detail', variables.templateId],
      });
    },
  });
}

export function useSetChecklistTemplateActiveMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      templateId: number;
      payload: SetChecklistTemplateActivePayload;
    }) => setChecklistTemplateActive(input.templateId, input.payload),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [...CHECKLISTS_QUERY_ROOT],
      });
      await queryClient.invalidateQueries({
        queryKey: [...TOURS_ACTIVE_TEMPLATES_QUERY_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [...CHECKLISTS_QUERY_ROOT, 'detail', variables.templateId],
      });
    },
  });
}

export function useDeleteChecklistTemplateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (templateId: number) => deleteChecklistTemplate(templateId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...CHECKLISTS_QUERY_ROOT],
      });
      await queryClient.invalidateQueries({
        queryKey: [...TOURS_ACTIVE_TEMPLATES_QUERY_KEY],
      });
    },
  });
}
