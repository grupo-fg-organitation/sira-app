import {
  AlertTriangle,
  BarChart3,
  Calendar,
  PieChart,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import type { ReportSummary } from '@/features/reports/interfaces/reports.interfaces';
import {
  downloadReportFile,
  getReportsApiErrorMessage,
  saveReportFile,
} from '@/features/reports/services/reports.service';

const reportes: readonly ReportSummary[] = [
  {
    id: 'acciones-mensual',
    titulo: 'Reporte mensual de acciones',
    descripcion:
      'Resumen de todas las acciones creadas, cerradas y pendientes del mes.',
    icono: BarChart3,
    tipo: 'Mensual',
    exportKind: 'actions-excel',
  },
  {
    id: 'analisis-por-area',
    titulo: 'Análisis por área',
    descripcion: 'Distribución de acciones por área de trabajo y tendencias.',
    icono: PieChart,
    tipo: 'Por demanda',
    exportKind: null,
  },
  {
    id: 'rendimiento-responsables',
    titulo: 'Rendimiento de responsables',
    descripcion: 'Métricas de cumplimiento por responsable asignado.',
    icono: Users,
    tipo: 'Semanal',
    exportKind: null,
  },
  {
    id: 'acciones-expiradas',
    titulo: 'Acciones expiradas',
    descripcion:
      'Listado detallado de acciones que han excedido su fecha de compromiso.',
    icono: AlertTriangle,
    tipo: 'Por demanda',
    exportKind: null,
  },
  {
    id: 'tendencia-seguridad',
    titulo: 'Tendencia de seguridad',
    descripcion:
      'Análisis de tendencias y evolución de condiciones de seguridad.',
    icono: TrendingUp,
    tipo: 'Trimestral',
    exportKind: null,
  },
  {
    id: 'historial-recorridos',
    titulo: 'Historial de recorridos',
    descripcion: 'Registro histórico de todos los recorridos realizados.',
    icono: Calendar,
    tipo: 'Por demanda',
    exportKind: null,
  },
];

interface UseReportsPageResult {
  reportes: readonly ReportSummary[];
  descargaActivaId: string | null;
  mensajeError: string | null;
  descargarReporte: (reporte: ReportSummary) => void;
}

export function useReportsPage(): UseReportsPageResult {
  const downloadMutation = useMutation({
    mutationFn: downloadReportFile,
    onSuccess: saveReportFile,
  });

  function descargarReporte(reporte: ReportSummary): void {
    if (!reporte.exportKind) {
      return;
    }

    downloadMutation.mutate(reporte.exportKind);
  }

  const descargaActivaId =
    downloadMutation.isPending && downloadMutation.variables
      ? reportes.find(
          reporte => reporte.exportKind === downloadMutation.variables,
        )?.id ?? null
      : null;

  return {
    reportes,
    descargaActivaId,
    mensajeError: downloadMutation.isError
      ? getReportsApiErrorMessage(downloadMutation.error)
      : null,
    descargarReporte,
  };
}
