import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  TOURS_QUERY_ROOT,
  createTour,
  fetchActiveChecklistTemplates,
  fetchTourById,
  fetchToursList,
} from '@/features/tours/services/tours.service';
import type {
  CreateTourPayload,
  ListToursQueryParams,
} from '@/features/tours/interfaces/sira-tour-api.interfaces';

export function useToursListQuery(params: ListToursQueryParams) {
  return useQuery({
    queryKey: [...TOURS_QUERY_ROOT, 'list', params] as const,
    queryFn: () => fetchToursList(params),
    placeholderData: keepPreviousData,
  });
}

export function useTourDetailQuery(tourId: number | null) {
  return useQuery({
    queryKey: [...TOURS_QUERY_ROOT, 'detail', tourId] as const,
    queryFn: () => fetchTourById(tourId!),
    enabled: tourId !== null && Number.isFinite(tourId),
  });
}

export function useActiveChecklistTemplatesQuery() {
  return useQuery({
    queryKey: [...TOURS_QUERY_ROOT, 'checklist-templates', 'active'] as const,
    queryFn: fetchActiveChecklistTemplates,
  });
}

export function useCreateTourMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTourPayload) => createTour(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [...TOURS_QUERY_ROOT] });
    },
  });
}
