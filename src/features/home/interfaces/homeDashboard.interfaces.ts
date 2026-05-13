import type { ComponentType, ReactNode } from 'react';

export interface HomeDashboardFilterOption {
  value: string;
  label: string;
}

export interface DashboardActionRow {
  id: string;
  folio: string;
  area: string;
  responsable: string;
  fechaCompromisoVigenteDisplay: string;
  estatusLabel: string;
}

export interface KpiSummary {
  total: number;
  abiertas: number;
  cerradas: number;
  expiradas: number;
  enRevision: number;
  pendientesAceptacion: number;
}

export interface ResponsableRow {
  id: string;
  nombre: string;
  rol: string;
}

export interface AccionPorAreaDatum {
  area: string;
  cantidad: number;
}

export interface DistribucionEstatusDatum {
  estatus: string;
  cantidad: number;
  color: string;
}

export interface TendenciaMensualDatum {
  mes: string;
  creadas: number;
  cerradas: number;
}

export interface HomeKpiCardProps {
  title: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  linkTo?: string;
}

export interface HomeKpiCardsProps {
  data: KpiSummary;
}

export interface HomeChartCardProps {
  title: string;
  children: ReactNode;
}

export interface HomeAccionesPorAreaChartProps {
  data: readonly AccionPorAreaDatum[];
}

export interface HomeDistribucionEstatusChartProps {
  data: readonly DistribucionEstatusDatum[];
}

export interface HomeTendenciaMensualChartProps {
  data: readonly TendenciaMensualDatum[];
}

export interface HomeRecentActionsTableProps {
  actions: DashboardActionRow[];
}

export interface HomeAppShellProps {
  children: ReactNode;
}

export interface HomeFilterBarProps {
  empresaOptions: readonly HomeDashboardFilterOption[];
  areaOptions: readonly HomeDashboardFilterOption[];
  responsableOptions: readonly HomeDashboardFilterOption[];
  estatusOptions: readonly HomeDashboardFilterOption[];
}
