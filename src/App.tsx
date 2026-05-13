import { GlobalToastViewport } from '@/components/global';
import { AppRouter } from '@/router/AppRouter';

export function App() {
  return (
    <>
      <AppRouter />
      <GlobalToastViewport />
    </>
  );
}
