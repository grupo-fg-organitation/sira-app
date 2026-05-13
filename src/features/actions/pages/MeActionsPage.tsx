import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { MeActionsListView } from '@/features/actions/components/MeActionsListView';

export function MeActionsPage() {
  return (
    <HomeAppShell>
      <MeActionsListView />
    </HomeAppShell>
  );
}
