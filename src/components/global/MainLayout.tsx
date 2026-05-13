import { Outlet } from 'react-router-dom';
import { GlobalFooter } from './GlobalFooter';
import { GlobalHeader } from './GlobalHeader';

export function MainLayout() {
  return (
    <div className='flex min-h-dvh flex-col bg-background'>
      <GlobalHeader />
      <main className='min-h-0 flex-1 overflow-y-auto'>
        <Outlet />
      </main>
      <div className='w-full shrink-0'>
        <GlobalFooter />
      </div>
    </div>
  );
}
