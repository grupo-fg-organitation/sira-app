import { CustomReportCard } from '@/features/reports/components/CustomReportCard';
import { ReportsGrid } from '@/features/reports/components/ReportsGrid';
import { ReportsHeader } from '@/features/reports/components/ReportsHeader';
import type { ReportSummary } from '@/features/reports/interfaces/reports.interfaces';

interface ReportsViewProps {
  reportes: readonly ReportSummary[];
  descargaActivaId: string | null;
  mensajeError: string | null;
  onDownloadReport: (reporte: ReportSummary) => void;
}

export function ReportsView({
  reportes,
  descargaActivaId,
  mensajeError,
  onDownloadReport,
}: ReportsViewProps) {
  return (
    <div className='space-y-6'>
      <ReportsHeader />
      {mensajeError ? (
        <p className='text-sm text-destructive'>{mensajeError}</p>
      ) : null}
      <ReportsGrid
        reportes={reportes}
        descargaActivaId={descargaActivaId}
        onDownloadReport={onDownloadReport}
      />
      <CustomReportCard />
    </div>
  );
}
