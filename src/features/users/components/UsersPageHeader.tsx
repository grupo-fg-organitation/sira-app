import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { UsersPageHeaderProps } from '@/features/users/interfaces/users-page.components.interfaces';
import { Plus } from 'lucide-react';

export function UsersPageHeader({
  canManage,
  onCreateClick,
}: UsersPageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 transition-[opacity,transform] duration-300 ease-out sm:flex-row sm:items-center sm:justify-between',
        'motion-safe:hover:[&>div:first-child]:translate-y-px',
      )}
    >
      <div className='transition-transform duration-300 ease-out'>
        <h1 className='text-2xl font-bold tracking-tight text-foreground drop-shadow-sm'>
          Usuarios
        </h1>
        <p className='mt-1 max-w-xl text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground/80'>
          Gestión de usuarios del sistema
        </p>
      </div>
      {canManage ? (
        <Button
          type='button'
          onClick={onCreateClick}
          className='cursor-pointer shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md motion-reduce:hover:translate-y-0'
        >
          <Plus className='mr-2 h-4 w-4' />
          Nuevo usuario
        </Button>
      ) : null}
    </div>
  );
}
