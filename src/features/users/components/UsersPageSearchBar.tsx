import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { UsersPageSearchBarProps } from '@/features/users/interfaces/users-page.components.interfaces';
import { Loader2, Search } from 'lucide-react';

export function UsersPageSearchBar({
  value,
  onChange,
  isFetching,
}: UsersPageSearchBarProps) {
  return (
    <div className='relative max-w-md transition-all duration-200 ease-out focus-within:scale-[1.01] motion-reduce:focus-within:scale-100'>
      <Search
        className={cn(
          'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200 peer-focus:text-primary',
          isFetching && 'opacity-60',
        )}
      />
      <Input
        type='search'
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder='Buscar usuarios...'
        className='peer cursor-pointer pl-10 pr-10 shadow-md transition-all duration-200 ease-out hover:shadow-lg focus-visible:shadow-lg'
        autoComplete='off'
        aria-busy={isFetching}
      />
      {isFetching ? (
        <Loader2
          className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground'
          aria-hidden
        />
      ) : null}
    </div>
  );
}
