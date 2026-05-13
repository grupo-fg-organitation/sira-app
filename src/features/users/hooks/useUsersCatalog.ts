import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { USERS_CATALOG_LIST_MAX_ITEMS } from '@/features/users/interfaces/users-page.constants';
import {
  CATALOG_COMPANIES_QUERY_ROOT,
  USERS_CATALOG_QUERY_ROOT,
  createUser,
  fetchCatalogCompanies,
  fetchCompanyUsersCatalog,
  toggleUserActive,
  updateUser,
  type CreateUserPayload,
  type UpdateUserPayload,
} from '@/features/users/services/users.service';

export function useCompaniesCatalogQuery(enabled: boolean) {
  return useQuery({
    queryKey: [...CATALOG_COMPANIES_QUERY_ROOT] as const,
    queryFn: () => fetchCatalogCompanies(),
    enabled,
  });
}

export function useCompanyUsersQuery(enabled: boolean, search: string) {
  const term = search.trim();
  return useQuery({
    queryKey: [...USERS_CATALOG_QUERY_ROOT, term, USERS_CATALOG_LIST_MAX_ITEMS],
    queryFn: () =>
      fetchCompanyUsersCatalog(
        term.length > 0 ? term : undefined,
        { maxResults: USERS_CATALOG_LIST_MAX_ITEMS },
      ),
    enabled,
    placeholderData: keepPreviousData,
  });
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...USERS_CATALOG_QUERY_ROOT],
      });
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: { userId: number; payload: UpdateUserPayload }) =>
      updateUser(vars.userId, vars.payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...USERS_CATALOG_QUERY_ROOT],
      });
    },
  });
}

export function useToggleUserActiveMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => toggleUserActive(userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...USERS_CATALOG_QUERY_ROOT],
      });
    },
  });
}
