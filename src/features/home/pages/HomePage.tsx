import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { HomeAccionesPorAreaChart } from '@/features/home/components/HomeAccionesPorAreaChart';
import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { HomeDistribucionEstatusChart } from '@/features/home/components/HomeDistribucionEstatusChart';
import { HomeFilterBar } from '@/features/home/components/HomeFilterBar';
import { HomeKPICards } from '@/features/home/components/HomeKPICards';
import { HomeRecentActionsTable } from '@/features/home/components/HomeRecentActionsTable';
import { HomeTendenciaMensualChart } from '@/features/home/components/HomeTendenciaMensualChart';
import type { HomeDashboardFilterOption } from '@/features/home/interfaces/homeDashboard.interfaces';
import { mapActionDashboardToHome } from '@/features/actions/lib/mapActionDashboardToHome';
import {
  ACTIONS_QUERY_ROOT,
  fetchActionsDashboard,
  fetchActionsList,
} from '@/features/actions/services/actions.service';

const opcionesFiltroVacias: readonly HomeDashboardFilterOption[] = [];

export function HomePage() {
  const [dashboardQuery, recentQuery] = useQueries({
    queries: [
      {
        queryKey: [...ACTIONS_QUERY_ROOT, 'dashboard'] as const,
        queryFn: fetchActionsDashboard,
      },
      {
        queryKey: [
          ...ACTIONS_QUERY_ROOT,
          'list',
          { page: 1, pageSize: 5 },
        ] as const,
        queryFn: () => fetchActionsList({ page: 1, pageSize: 5 }),
      },
    ],
  });

  const demo = useMemo(() => {
    if (!dashboardQuery.data || !recentQuery.data) {
      return null;
    }
    return mapActionDashboardToHome(
      dashboardQuery.data,
      recentQuery.data.items,
    );
  }, [dashboardQuery.data, recentQuery.data]);

  const isLoading = dashboardQuery.isPending || recentQuery.isPending;
  const hasError = dashboardQuery.isError || recentQuery.isError;

  return (
    <HomeAppShell>
      <div className='dashboard-content-in space-y-6'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>
            Dashboard
          </h1>
          <p className='mt-1 max-w-2xl text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground/80'>
            Vista general del sistema de recorridos de seguridad
          </p>
        </div>

        <HomeFilterBar
          empresaOptions={opcionesFiltroVacias}
          areaOptions={opcionesFiltroVacias}
          responsableOptions={opcionesFiltroVacias}
          estatusOptions={opcionesFiltroVacias}
        />

        {hasError ? (
          <p className='text-sm text-destructive'>
            No se pudieron cargar las métricas del dashboard. Verifica la sesión
            y que la API esté disponible.
          </p>
        ) : null}

        {isLoading || !demo ? (
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='h-28 animate-pulse rounded-xl border border-border bg-muted/40'
              />
            ))}
          </div>
        ) : (
          <HomeKPICards data={demo.kpi} />
        )}

        <div className='grid gap-6 lg:grid-cols-3'>
          <HomeAccionesPorAreaChart data={demo?.accionesPorArea ?? []} />
          <HomeDistribucionEstatusChart
            data={demo?.distribucionEstatus ?? []}
          />
          <HomeTendenciaMensualChart data={demo?.tendenciaMensual ?? []} />
        </div>

        <HomeRecentActionsTable actions={demo?.accionesRecientes ?? []} />
      </div>
    </HomeAppShell>
  );
}
