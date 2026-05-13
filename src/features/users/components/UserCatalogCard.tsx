import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  getApiRoleLabel,
  getRoleBadgeClassName,
} from '@/features/users/services/users-display.service';
import type { UserCatalogCardProps } from '@/features/users/interfaces/users-page.components.interfaces';
import {
  Building2,
  Briefcase,
  Mail,
  Pencil,
  Phone,
  UserCheck,
  UserX,
} from 'lucide-react';

export function UserCatalogCard({
  user,
  index,
  currentUserId,
  canManage,
  showCompanyBadge,
  toggleInProgress,
  togglingUserId,
  onEdit,
  onToggleActive,
}: UserCatalogCardProps) {
  const isCurrentUser = user.id === currentUserId;
  const toggleDisabled =
    !canManage ||
    isCurrentUser ||
    (toggleInProgress && togglingUserId === user.id);

  return (
    <div
      style={{
        animationDelay: `${Math.min(index * 50, 200)}ms`,
        animationDuration: '280ms',
        animationFillMode: 'backwards',
      }}
      className={cn(
        'group/card relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-md ring-1 ring-transparent transition-all duration-200 ease-out',
        'animate-in fade-in slide-in-from-bottom-2 motion-reduce:animate-none',
        'cursor-default hover:-translate-y-1 hover:border-primary/25 hover:bg-card hover:shadow-xl hover:ring-primary/15',
        'motion-reduce:hover:translate-y-0',
        !user.isActive &&
          'opacity-90 saturate-[0.65] hover:saturate-[0.85]',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-primary/80 via-primary/40 to-transparent opacity-0 transition-all duration-300 ease-out group-hover/card:scale-x-100 group-hover/card:opacity-100',
        )}
      />

      <div className='flex items-start justify-between gap-2'>
        <div className='flex min-w-0 items-center gap-3'>
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md ring-2 ring-primary/25 transition-all duration-200 ease-out',
              'group-hover/card:scale-105 group-hover/card:shadow-lg motion-reduce:group-hover/card:scale-100',
            )}
          >
            {user.fullName
              .split(/\s+/)
              .map(part => part[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div className='min-w-0'>
            <h3 className='truncate font-medium text-foreground transition-colors duration-200 group-hover/card:text-primary'>
              {user.fullName}
            </h3>
            <span
              className={cn(
                'mt-1 inline-flex max-w-full items-center truncate rounded-full px-2 py-0.5 text-xs font-medium transition-transform duration-200 group-hover/card:translate-x-0.5 motion-reduce:group-hover/card:translate-x-0',
                getRoleBadgeClassName(user.role),
              )}
            >
              {getApiRoleLabel(user.role)}
            </span>
          </div>
        </div>
        <div
          className={cn(
            'mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full shadow-sm ring-2 ring-background transition-all duration-200',
            user.isActive
              ? 'bg-emerald-500 shadow-emerald-500/40'
              : 'bg-rose-500 shadow-rose-500/35',
          )}
          title={user.isActive ? 'Activo' : 'Inactivo'}
        />
      </div>

      <div className='mt-4 space-y-2'>
        <div className='flex cursor-default items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 group-hover/card:text-foreground/85'>
          <Mail className='h-4 w-4 shrink-0 opacity-80 transition-opacity duration-200 group-hover/card:opacity-100' />
          <span className='min-w-0 truncate'>{user.email}</span>
        </div>
        <div className='flex cursor-default items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 group-hover/card:text-foreground/85'>
          <Phone className='h-4 w-4 shrink-0 opacity-80 transition-opacity duration-200 group-hover/card:opacity-100' />
          <span className='min-w-0 truncate'>
            {user.phone && user.phone.length > 0 ? user.phone : '—'}
          </span>
        </div>
        <div className='flex cursor-default items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 group-hover/card:text-foreground/85'>
          <Building2 className='h-4 w-4 shrink-0 opacity-80 transition-opacity duration-200 group-hover/card:opacity-100' />
          <span className='min-w-0 truncate'>{user.department}</span>
        </div>
        {showCompanyBadge ? (
          <div className='flex cursor-default items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 group-hover/card:text-foreground/85'>
            <Briefcase className='h-4 w-4 shrink-0 opacity-80 transition-opacity duration-200 group-hover/card:opacity-100' />
            <span className='min-w-0 truncate'>{user.companyName}</span>
          </div>
        ) : null}
      </div>

      <div className='mt-4 flex flex-wrap items-stretch gap-2 border-t border-border/80 pt-4'>
        {canManage ? (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={() => onEdit(user)}
            className='min-h-8 flex-1 cursor-pointer shadow-none transition-all duration-200 hover:-translate-y-px hover:bg-primary/10 hover:text-primary hover:shadow-sm motion-reduce:hover:translate-y-0'
          >
            <Pencil className='mr-1 h-4 w-4' />
            Editar
          </Button>
        ) : null}
        {canManage ? (
          <Button
            type='button'
            variant='outline'
            size='sm'
            disabled={toggleDisabled}
            onClick={() => void onToggleActive(user.id)}
            className={cn(
              'min-h-8 shrink-0 cursor-pointer gap-1.5 shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-md active:translate-y-0 motion-reduce:hover:translate-y-0',
              user.isActive
                ? 'border-emerald-500/35 text-emerald-700 hover:border-emerald-500/55 hover:bg-emerald-500/10 dark:text-emerald-400'
                : 'border-muted-foreground/35 text-muted-foreground hover:border-primary/40 hover:bg-primary/8 hover:text-foreground',
            )}
          >
            {user.isActive ? (
              <>
                <UserX className='h-4 w-4 shrink-0' />
                Desactivar
              </>
            ) : (
              <>
                <UserCheck className='h-4 w-4 shrink-0' />
                Activar
              </>
            )}
          </Button>
        ) : null}
      </div>
      {isCurrentUser && canManage ? (
        <p className='mt-2 text-xs text-muted-foreground'>
          No puedes desactivar tu propia cuenta desde aquí.
        </p>
      ) : null}
    </div>
  );
}
