import { HomeAppShell } from '@/features/home/components/HomeAppShell';

export function UsersPageNoAccessState() {
  return (
    <HomeAppShell>
      <div className='rounded-xl border border-border/80 bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground shadow-inner'>
        No tienes permiso para ver el listado de usuarios.
      </div>
    </HomeAppShell>
  );
}
