import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { Button } from '@/components/ui/button';
import type { ChecklistsPageErrorStateProps } from '@/features/checklists/interfaces/checklists-page.components.interfaces';

export function ChecklistsPageErrorState({
  message,
  onRetry,
}: ChecklistsPageErrorStateProps) {
  return (
    <HomeAppShell>
      <div className='space-y-4 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center'>
        <p className='text-sm text-destructive'>{message}</p>
        <Button
          type='button'
          variant='outline'
          className='cursor-pointer'
          onClick={onRetry}
        >
          Reintentar
        </Button>
      </div>
    </HomeAppShell>
  );
}
