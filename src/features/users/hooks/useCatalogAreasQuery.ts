import { useQuery } from '@tanstack/react-query';
import {
  CATALOG_AREAS_QUERY_ROOT,
  fetchCatalogAreas,
} from '@/features/users/services/users.service';

export function useCatalogAreasQuery() {
  return useQuery({
    queryKey: [...CATALOG_AREAS_QUERY_ROOT] as const,
    queryFn: fetchCatalogAreas,
  });
}
