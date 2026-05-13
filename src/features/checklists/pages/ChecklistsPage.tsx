import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { ChecklistDeleteDialog } from '@/features/checklists/components/ChecklistDeleteDialog';
import { ChecklistsPageErrorState } from '@/features/checklists/components/ChecklistsPageErrorState';
import { ChecklistsPageHeader } from '@/features/checklists/components/ChecklistsPageHeader';
import { ChecklistsPageLoadingState } from '@/features/checklists/components/ChecklistsPageLoadingState';
import { ChecklistsPageNoAccessState } from '@/features/checklists/components/ChecklistsPageNoAccessState';
import { ChecklistTemplateFormDialog } from '@/features/checklists/components/ChecklistTemplateFormDialog';
import { ChecklistTemplatesTable } from '@/features/checklists/components/ChecklistTemplatesTable';
import { useChecklistsPage } from '@/features/checklists/hooks/useChecklistsPage';
import { getChecklistsApiErrorMessage } from '@/features/checklists/services/checklists.service';

export function ChecklistsPage() {
  const {
    canManage,
    templatesQuery,
    detailQuery,
    dialogOpen,
    onDialogOpenChange,
    onOpenCreate,
    onOpenEdit,
    editingTemplateId,
    register,
    control,
    errors,
    fieldArray,
    watch,
    onSubmit,
    isSaving,
    onToggleActive,
    togglingTemplateId,
    deleteTargetId,
    deleteTargetName,
    onRequestDelete,
    onDeleteDialogOpenChange,
    onConfirmDelete,
    deleteMutationPending,
  } = useChecklistsPage();

  const templates = templatesQuery.data ?? [];

  function handleAddChecklistItem(): void {
    const items = watch('items');
    const nextOrder =
      items.length === 0
        ? 0
        : Math.max(...items.map(item => Number(item.order) || 0), 0) + 1;
    fieldArray.append({
      order: nextOrder,
      question: '',
      required: true,
    });
  }

  if (!canManage) {
    return <ChecklistsPageNoAccessState />;
  }

  if (templatesQuery.isPending && templatesQuery.data === undefined) {
    return <ChecklistsPageLoadingState />;
  }

  if (templatesQuery.isError) {
    return (
      <ChecklistsPageErrorState
        message={getChecklistsApiErrorMessage(templatesQuery.error)}
        onRetry={() => void templatesQuery.refetch()}
      />
    );
  }

  return (
    <HomeAppShell>
      <div className='space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none'>
        <ChecklistsPageHeader onCreateClick={onOpenCreate} />

        <ChecklistTemplatesTable
          templates={templates}
          isPending={false}
          togglingTemplateId={togglingTemplateId}
          onEdit={onOpenEdit}
          onToggleActive={onToggleActive}
          onRequestDelete={onRequestDelete}
        />

        <ChecklistTemplateFormDialog
          open={dialogOpen}
          onOpenChange={onDialogOpenChange}
          mode={editingTemplateId === null ? 'create' : 'edit'}
          detailLoading={detailQuery.isPending}
          detailError={detailQuery.isError}
          onRetryDetail={() => void detailQuery.refetch()}
          register={register}
          control={control}
          errors={errors}
          fieldRows={fieldArray.fields}
          fieldsLength={fieldArray.fields.length}
          onAddItem={handleAddChecklistItem}
          removeItem={fieldArray.remove}
          onSubmit={onSubmit}
          isSaving={isSaving}
        />

        <ChecklistDeleteDialog
          open={deleteTargetId !== null}
          onOpenChange={onDeleteDialogOpenChange}
          templateName={deleteTargetName}
          onConfirm={onConfirmDelete}
          isDeleting={deleteMutationPending}
        />
      </div>
    </HomeAppShell>
  );
}
