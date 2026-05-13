import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { TourDetailContent } from '@/features/tours/components/TourDetailContent';
import { TourDetailErrorView } from '@/features/tours/components/TourDetailErrorView';
import { TourDetailLoadingView } from '@/features/tours/components/TourDetailLoadingView';
import { useTourIdFromRoute } from '@/features/tours/hooks/useTourIdFromRoute';
import { useTourDetailQuery } from '@/features/tours/hooks/useToursQueries';

export function TourDetailPage() {
  const tourId = useTourIdFromRoute();
  const { data: tour, isPending, isError } = useTourDetailQuery(tourId);

  if (isPending) {
    return <TourDetailLoadingView />;
  }

  if (isError || !tour) {
    return <TourDetailErrorView />;
  }

  return (
    <HomeAppShell>
      <TourDetailContent tour={tour} />
    </HomeAppShell>
  );
}
