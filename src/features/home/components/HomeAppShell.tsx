import type { HomeAppShellProps } from '@/features/home/interfaces/homeDashboard.interfaces';

export function HomeAppShell({ children }: HomeAppShellProps) {
  return (
    <div className='flex min-h-0 flex-1 flex-col bg-background'>
      <div className='mx-auto min-h-0 w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8'>
        {children}
      </div>
    </div>
  );
}
