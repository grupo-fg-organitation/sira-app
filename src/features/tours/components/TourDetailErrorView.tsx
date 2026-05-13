import { Link } from 'react-router-dom';
import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export function TourDetailErrorView() {
  return (
    <HomeAppShell>
      <div className='dashboard-content-in flex flex-col items-center justify-center py-20'>
        <AlertTriangle className='h-12 w-12 text-muted-foreground' />
        <h2 className='mt-4 text-lg font-semibold text-foreground'>
          Recorrido no encontrado
        </h2>
        <Link to='/recorridos' className='mt-4'>
          <Button type='button'>Volver a recorridos</Button>
        </Link>
      </div>
    </HomeAppShell>
  );
}
