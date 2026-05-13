import type { UsersPageAdminNoticeProps } from '@/features/users/interfaces/users-page.components.interfaces';

export function UsersPageAdminNotice({
  visible,
}: UsersPageAdminNoticeProps) {
  if (!visible) {
    return null;
  }
  return (
    <p className='max-w-2xl text-xs text-muted-foreground'>
      Solo los administradores pueden crear, editar o activar y desactivar
      usuarios. Si necesitas cambios, contacta a un administrador.
    </p>
  );
}
