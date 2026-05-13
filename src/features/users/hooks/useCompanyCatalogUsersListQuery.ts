import { useQuery } from '@tanstack/react-query';
import {
  USERS_CATALOG_QUERY_ROOT,
  fetchCompanyUsersCatalog,
} from '@/features/users/services/users.service';

export function useCompanyCatalogUsersListQuery(enabled: boolean) {
  return useQuery({
    queryKey: [...USERS_CATALOG_QUERY_ROOT, 'filters', 'all'] as const,
    queryFn: () => fetchCompanyUsersCatalog(),
    enabled,
  });
}
