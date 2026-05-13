import type {
  ActionDashboardMetricsApi,
  ActionSummaryApi,
  SiraActionStatus,
} from '@/features/actions/interfaces/sira-action-api.interfaces';
import { getActionStatusLabel } from '@/features/actions/lib/actionPresentation';
import type {
  AccionPorAreaDatum,
  DashboardActionRow,
  DistribucionEstatusDatum,
  KpiSummary,
  TendenciaMensualDatum,
} from '@/features/home/interfaces/homeDashboard.interfaces';

const STATUS_CHART_COLORS: Partial<Record<SiraActionStatus, string>> = {
  OPEN: '#3B82F6',
  REOPENED: '#2563EB',
  CLOSED: '#22C55E',
  EXPIRED: '#EF4444',
  REVIEW_CLOSURE: '#F97316',
  PENDING_ACCEPTANCE: '#EAB308',
  PENDING: '#CA8A04',
  REJECTED: '#991B1B',
};

export interface HomeDashboardFromApi {
  kpi: KpiSummary;
  accionesPorArea: AccionPorAreaDatum[];
  distribucionEstatus: DistribucionEstatusDatum[];
  tendenciaMensual: TendenciaMensualDatum[];
  accionesRecientes: DashboardActionRow[];
}

function countByStatus(
  dashboard: ActionDashboardMetricsApi,
  statuses: readonly SiraActionStatus[],
): number {
  const set = new Set(statuses);
  return (dashboard.byStatus ?? [])
    .filter(row => set.has(row.status))
    .reduce((acc, row) => acc + row.count, 0);
}

export function mapActionDashboardToHome(
  dashboard: ActionDashboardMetricsApi,
  recentItems: ActionSummaryApi[] | undefined,
): HomeDashboardFromApi {
  const byArea = dashboard.byArea ?? [];
  const byStatus = dashboard.byStatus ?? [];
  const monthlyTrend = dashboard.monthlyTrend ?? [];
  const recientes = recentItems ?? [];

  const kpi: KpiSummary = {
    total: dashboard.total ?? 0,
    abiertas: countByStatus(dashboard, ['OPEN', 'REOPENED', 'PENDING']),
    cerradas: countByStatus(dashboard, ['CLOSED']),
    expiradas: countByStatus(dashboard, ['EXPIRED']),
    enRevision: countByStatus(dashboard, ['REVIEW_CLOSURE']),
    pendientesAceptacion: countByStatus(dashboard, ['PENDING_ACCEPTANCE']),
  };

  const accionesPorArea: AccionPorAreaDatum[] = byArea.map(a => ({
    area: a.areaName,
    cantidad: a.count,
  }));

  const distribucionEstatus: DistribucionEstatusDatum[] = byStatus
    .filter(row => row.count > 0)
    .map(row => ({
      estatus: getActionStatusLabel(row.status),
      cantidad: row.count,
      color: STATUS_CHART_COLORS[row.status] ?? '#64748B',
    }));

  const accionesRecientes: DashboardActionRow[] = recientes.map(a => ({
    id: String(a.id),
    folio: a.folio,
    area: a.areaName,
    responsable: a.responsibleName,
    fechaCompromisoVigenteDisplay: new Date(
      a.currentDueDate,
    ).toLocaleDateString('es-MX'),
    estatusLabel: getActionStatusLabel(a.status),
  }));

  return {
    kpi,
    accionesPorArea,
    distribucionEstatus,
    tendenciaMensual: monthlyTrend.map(row => ({
      mes: row.mes,
      creadas: row.creadas,
      cerradas: row.cerradas,
    })),
    accionesRecientes,
  };
}
