import { ReportCard } from '@/features/reports/components/ReportCard';
import type { ReportSummary } from '@/features/reports/interfaces/reports.interfaces';

interface ReportsGridProps {
  reportes: readonly ReportSummary[];
  descargaActivaId: string | null;
  onDownloadReport: (reporte: ReportSummary) => void;
}

export function ReportsGrid({
  reportes,
  descargaActivaId,
  onDownloadReport,
}: ReportsGridProps) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {reportes.map(reporte => (
        <ReportCard
          key={reporte.id}
          reporte={reporte}
          isDownloading={descargaActivaId === reporte.id}
          onDownload={onDownloadReport}
        />
      ))}
    </div>
  );
}
