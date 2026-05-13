import { useMemo, useState } from 'react';
import { useToursListQuery } from '@/features/tours/hooks/useToursQueries';
import { TOURS_LIST_PAGE_SIZE } from '@/features/tours/interfaces/tours-list.constants';

export function useToursListPage() {
  const [page, setPage] = useState(1);

  const listParams = useMemo(
    () => ({ page, pageSize: TOURS_LIST_PAGE_SIZE }),
    [page],
  );

  const query = useToursListQuery(listParams);

  const total = query.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / TOURS_LIST_PAGE_SIZE));
  const effectivePage = Math.min(Math.max(1, page), totalPages);
  const items = query.data?.items ?? [];

  function goToPreviousPage(): void {
    setPage(p => Math.max(1, p - 1));
  }

  function goToNextPage(): void {
    setPage(p => Math.min(totalPages, p + 1));
  }

  return {
    pageSize: TOURS_LIST_PAGE_SIZE,
    effectivePage,
    totalPages,
    total,
    items,
    goToPreviousPage,
    goToNextPage,
    ...query,
  };
}
