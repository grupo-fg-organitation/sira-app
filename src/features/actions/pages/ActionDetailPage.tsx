import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { ActionDetailView } from '@/features/actions/components/ActionDetailView';

export function ActionDetailPage() {
  return (
    <HomeAppShell>
      <ActionDetailView />
    </HomeAppShell>
  );
}
