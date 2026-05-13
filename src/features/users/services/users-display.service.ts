export function getApiRoleLabel(role: string): string {
  switch (role) {
    case 'ADMIN':
      return 'Administrador';
    case 'RESPONSABLE':
      return 'Responsable';
    case 'GENERAL':
      return 'General';
    default:
      return role;
  }
}

export function getRoleBadgeClassName(role: string): string {
  if (role === 'ADMIN') return 'bg-primary/20 text-primary';
  if (role === 'RESPONSABLE') return 'bg-blue-500/20 text-blue-400';
  if (role === 'GENERAL') return 'bg-muted text-muted-foreground';
  return 'bg-muted text-muted-foreground';
}
