import { HomeAppShell } from '@/features/home/components/HomeAppShell';

export function TourDetailLoadingView() {
  return (
    <HomeAppShell>
      <div className='dashboard-content-in py-16 text-center text-sm text-muted-foreground'>
        Cargando recorrido…
      </div>
    </HomeAppShell>
  );
}
