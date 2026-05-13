import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { Button } from '@/components/ui/button';
import type { UsersPageErrorStateProps } from '@/features/users/interfaces/users-page.components.interfaces';

export function UsersPageErrorState({
  message,
  onRetry,
}: UsersPageErrorStateProps) {
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
