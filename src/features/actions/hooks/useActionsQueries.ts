import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  ACTIONS_QUERY_ROOT,
  fetchActionById,
  fetchActionsDashboard,
  fetchActionsList,
  signActionAcceptance,
  type SignActionAcceptancePayload,
} from '@/features/actions/services/actions.service';
import type { ListActionsQueryParams } from '@/features/actions/interfaces/sira-action-api.interfaces';

export function useActionsDashboardQuery() {
  return useQuery({
    queryKey: [...ACTIONS_QUERY_ROOT, 'dashboard'] as const,
    queryFn: fetchActionsDashboard,
  });
}

export function useActionsListQuery(params: ListActionsQueryParams) {
  return useQuery({
    queryKey: [...ACTIONS_QUERY_ROOT, 'list', params] as const,
    queryFn: () => fetchActionsList(params),
    placeholderData: keepPreviousData,
  });
}

export function useActionDetailQuery(actionId: number | null) {
  return useQuery({
    queryKey: [...ACTIONS_QUERY_ROOT, 'detail', actionId] as const,
    queryFn: () => fetchActionById(actionId!),
    enabled: actionId !== null && Number.isFinite(actionId),
  });
}

export function useSignActionAcceptanceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      actionId: number;
      payload: SignActionAcceptancePayload;
    }) => signActionAcceptance(vars.actionId, vars.payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...ACTIONS_QUERY_ROOT],
      });
    },
  });
}
