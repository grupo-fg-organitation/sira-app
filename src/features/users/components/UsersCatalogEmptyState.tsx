import type { UsersCatalogEmptyStateProps } from '@/features/users/interfaces/users-page.components.interfaces';

export function UsersCatalogEmptyState({
  hasActiveSearch,
}: UsersCatalogEmptyStateProps) {
  return (
    <p className='rounded-xl border border-dashed border-border/80 bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground shadow-inner transition-colors duration-200 hover:bg-muted/30'>
      {hasActiveSearch
        ? 'No hay usuarios que coincidan con la búsqueda.'
        : 'No hay usuarios registrados en la compañía.'}
    </p>
  );
}
