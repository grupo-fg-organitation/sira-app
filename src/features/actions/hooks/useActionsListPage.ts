import { useMemo, useState } from 'react';
import { useAuthSessionOptional } from '@/features/auth/context';
import { useActionsListQuery } from '@/features/actions/hooks/useActionsQueries';
import { useCatalogAreasQuery } from '@/features/users/hooks/useCatalogAreasQuery';
import { useCompanyCatalogUsersListQuery } from '@/features/users/hooks/useCompanyCatalogUsersListQuery';
import {
  ACTIONS_LIST_PAGE_SIZE,
  ACTIONS_LIST_STATUS_OPTIONS,
} from '@/features/actions/interfaces/actions-pages.interfaces';
import type { SiraActionStatus } from '@/features/actions/interfaces/sira-action-api.interfaces';

export function useActionsListPage() {
  const auth = useAuthSessionOptional();
  const canListCatalogUsers =
    auth?.user.role === 'ADMIN' || auth?.user.role === 'RESPONSABLE';

  const [search, setSearch] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [estatusFilter, setEstatusFilter] = useState<SiraActionStatus | ''>('');
  const [responsableFilter, setResponsableFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const listParams = useMemo(
    () => ({
      page: currentPage,
      pageSize: ACTIONS_LIST_PAGE_SIZE,
      status: estatusFilter || undefined,
      areaId: areaFilter ? Number(areaFilter) : undefined,
      responsibleId: responsableFilter ? Number(responsableFilter) : undefined,
    }),
    [currentPage, estatusFilter, areaFilter, responsableFilter],
  );

  const { data, isPending, isError } = useActionsListQuery(listParams);
  const areasQuery = useCatalogAreasQuery();
  const usersQuery = useCompanyCatalogUsersListQuery(canListCatalogUsers);

  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / ACTIONS_LIST_PAGE_SIZE));
  const effectivePage = Math.min(Math.max(1, currentPage), totalPages);

  const items = useMemo(() => {
    const raw = data?.items ?? [];
    const term = search.trim().toLowerCase();
    if (term.length === 0) {
      return raw;
    }
    return raw.filter(
      row =>
        row.folio.toLowerCase().includes(term) ||
        row.description.toLowerCase().includes(term) ||
        row.responsibleName.toLowerCase().includes(term),
    );
  }, [data?.items, search]);

  return {
    canListCatalogUsers,
    search,
    setSearch,
    areaFilter,
    setAreaFilter,
    estatusFilter,
    setEstatusFilter,
    responsableFilter,
    setResponsableFilter,
    currentPage,
    setCurrentPage,
    isPending,
    isError,
    areasQuery,
    usersQuery,
    total,
    totalPages,
    effectivePage,
    items,
    itemsPerPage: ACTIONS_LIST_PAGE_SIZE,
    statusOptions: ACTIONS_LIST_STATUS_OPTIONS,
  };
}
