import type { TourSummaryApi } from '@/features/tours/interfaces/sira-tour-api.interfaces';

export interface ToursListTableProps {
  items: TourSummaryApi[];
  isPending: boolean;
  effectivePage: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}
