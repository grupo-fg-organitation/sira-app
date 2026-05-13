import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { ToursListHeader } from '@/features/tours/components/ToursListHeader';
import { ToursListTable } from '@/features/tours/components/ToursListTable';
import { useToursListPage } from '@/features/tours/hooks/useToursListPage';

export function ToursPage() {
  const {
    items,
    isPending,
    isError,
    effectivePage,
    totalPages,
    total,
    pageSize,
    goToPreviousPage,
    goToNextPage,
  } = useToursListPage();

  return (
    <HomeAppShell>
      <div className='dashboard-content-in space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none'>
        <ToursListHeader />

        {isError ? (
          <p className='text-sm text-destructive'>
            No se pudo cargar el listado de recorridos.
          </p>
        ) : null}

        <ToursListTable
          items={items}
          isPending={isPending}
          effectivePage={effectivePage}
          totalPages={totalPages}
          total={total}
          pageSize={pageSize}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
        />
      </div>
    </HomeAppShell>
  );
}
