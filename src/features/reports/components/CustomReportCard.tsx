import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CustomReportCard() {
  return (
    <div className='rounded-xl border border-dashed border-border bg-card/50 p-8 text-center'>
      <FileText className='mx-auto h-12 w-12 text-muted-foreground' />
      <h3 className='mt-4 font-semibold text-foreground'>
        Reporte personalizado
      </h3>
      <p className='mt-2 text-sm text-muted-foreground'>
        Configura filtros y parámetros para generar un reporte a la medida de
        tus necesidades.
      </p>
      <Button className='mt-4 bg-primary text-primary-foreground hover:bg-primary/90'>
        Crear reporte personalizado
      </Button>
    </div>
  );
}
