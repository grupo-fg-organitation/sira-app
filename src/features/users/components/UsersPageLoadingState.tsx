import { Loader2 } from 'lucide-react';
import { HomeAppShell } from '@/features/home/components/HomeAppShell';

export function UsersPageLoadingState() {
  return (
    <HomeAppShell>
      <div className='flex min-h-[40vh] flex-col items-center justify-center gap-3 text-muted-foreground'>
        <Loader2 className='h-10 w-10 animate-spin' aria-hidden />
        <p className='text-sm font-medium'>Cargando usuarios…</p>
      </div>
    </HomeAppShell>
  );
}
