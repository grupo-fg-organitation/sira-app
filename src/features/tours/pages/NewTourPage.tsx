import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { NewTourForm } from '@/features/tours/components/NewTourForm';
import { useNewTourForm } from '@/features/tours/hooks/useNewTourForm';

export function NewTourPage() {
  const form = useNewTourForm();

  return (
    <HomeAppShell>
      <NewTourForm
        register={form.register}
        onFormSubmit={form.onFormSubmit}
        errors={form.errors}
        formError={form.formError}
        areas={form.areas}
        templates={form.templates}
        createMutation={form.createMutation}
      />
    </HomeAppShell>
  );
}
