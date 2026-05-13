import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { ActionsListView } from '@/features/actions/components/ActionsListView';

export function ActionsPage() {
  return (
    <HomeAppShell>
      <ActionsListView />
    </HomeAppShell>
  );
}
