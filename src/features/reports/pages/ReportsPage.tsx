import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { ReportsView } from '@/features/reports/components/ReportsView';
import { useReportsPage } from '@/features/reports/hooks/useReportsPage';

export function ReportsPage() {
  const {
    reportes,
    descargaActivaId,
    mensajeError,
    descargarReporte,
  } = useReportsPage();

  return (
    <HomeAppShell>
      <ReportsView
        reportes={reportes}
        descargaActivaId={descargaActivaId}
        mensajeError={mensajeError}
        onDownloadReport={descargarReporte}
      />
    </HomeAppShell>
  );
}
