import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReportSummary } from '@/features/reports/interfaces/reports.interfaces';

interface ReportCardProps {
  reporte: ReportSummary;
  isDownloading: boolean;
  onDownload: (reporte: ReportSummary) => void;
}

export function ReportCard({
  reporte,
  isDownloading,
  onDownload,
}: ReportCardProps) {
  const canDownload = reporte.exportKind !== null;

  return (
    <div className='group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:bg-muted/30'>
      <div className='flex items-start justify-between'>
        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10'>
          <reporte.icono className='h-6 w-6 text-primary' />
        </div>
        <span className='rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground'>
          {reporte.tipo}
        </span>
      </div>

      <h3 className='mt-4 font-semibold text-foreground'>{reporte.titulo}</h3>
      <p className='mt-2 text-sm text-muted-foreground'>
        {reporte.descripcion}
      </p>

      <div className='mt-4 flex items-center gap-2'>
        <Button variant='outline' size='sm' className='flex-1'>
          <FileText className='mr-1 h-4 w-4' />
          Vista previa
        </Button>
        <Button
          type='button'
          size='sm'
          className='bg-primary text-primary-foreground hover:bg-primary/90'
          disabled={!canDownload || isDownloading}
          onClick={() => onDownload(reporte)}
        >
          <Download className='mr-1 h-4 w-4' />
          {isDownloading ? 'Descargando' : 'Descargar'}
        </Button>
      </div>
    </div>
  );
}
