import { useLayoutEffect, useState } from 'react';
import { useFieldArray, useForm, type FieldPath } from 'react-hook-form';
import { showGlobalToast } from '@/components/global';
import { useAuthSession } from '@/features/auth/context';
import {
  CHECKLIST_TEMPLATE_FORM_DEFAULT_VALUES,
  checklistTemplateCreateFormSchema,
  checklistTemplateFormSchema,
  type ChecklistTemplateFormValues,
} from '@/features/checklists/schemas/checklist-template-form.schema';
import { getChecklistsApiErrorMessage } from '@/features/checklists/services/checklists.service';
import {
  useChecklistTemplateDetailQuery,
  useChecklistTemplatesListQuery,
  useCreateChecklistTemplateMutation,
  useDeleteChecklistTemplateMutation,
  useSetChecklistTemplateActiveMutation,
  useUpdateChecklistTemplateMutation,
} from '@/features/checklists/hooks/useChecklistsQueries';
import type { ChecklistTemplateSummaryApi } from '@/features/checklists/interfaces/sira-checklist-api.interfaces';

export function useChecklistsPage() {
  const { user: session } = useAuthSession();
  const canManage = session.role === 'ADMIN';

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingTemplateId, setEditingTemplateId] = useState<number | null>(
    null,
  );
  const [togglingTemplateId, setTogglingTemplateId] = useState<number | null>(
    null,
  );
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [deleteTargetName, setDeleteTargetName] = useState<string>('');

  const templatesQuery = useChecklistTemplatesListQuery(canManage);
  const detailQuery = useChecklistTemplateDetailQuery(
    editingTemplateId,
    dialogOpen && editingTemplateId !== null,
  );

  const createMutation = useCreateChecklistTemplateMutation();
  const updateMutation = useUpdateChecklistTemplateMutation();
  const setActiveMutation = useSetChecklistTemplateActiveMutation();
  const deleteMutation = useDeleteChecklistTemplateMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChecklistTemplateFormValues>({
    defaultValues: CHECKLIST_TEMPLATE_FORM_DEFAULT_VALUES,
  });

  const fieldArray = useFieldArray({
    control,
    name: 'items',
  });

  useLayoutEffect(() => {
    if (!dialogOpen || editingTemplateId === null) {
      return;
    }
    const detail = detailQuery.data;
    if (detail === undefined) {
      return;
    }
    const sortedItems = [...detail.items].sort((a, b) => a.order - b.order);
    reset({
      name: detail.name,
      items: sortedItems.map(item => ({
        itemId: item.id,
        order: item.order,
        question: item.question,
        required: item.required,
      })),
    });
  }, [dialogOpen, editingTemplateId, detailQuery.data, reset]);

  function onDialogOpenChange(open: boolean): void {
    setDialogOpen(open);
    if (!open) {
      setEditingTemplateId(null);
      reset(CHECKLIST_TEMPLATE_FORM_DEFAULT_VALUES);
    }
  }

  function onOpenCreate(): void {
    setEditingTemplateId(null);
    reset(CHECKLIST_TEMPLATE_FORM_DEFAULT_VALUES);
    setDialogOpen(true);
  }

  function onOpenEdit(templateId: number): void {
    setEditingTemplateId(templateId);
    setDialogOpen(true);
  }

  async function onToggleActive(
    template: ChecklistTemplateSummaryApi,
  ): Promise<void> {
    setTogglingTemplateId(template.id);
    try {
      await setActiveMutation.mutateAsync({
        templateId: template.id,
        payload: { isActive: !template.isActive },
      });
      showGlobalToast(
        template.isActive
          ? 'Plantilla desactivada'
          : 'Plantilla activada',
        'success',
      );
    } catch (error) {
      showGlobalToast(getChecklistsApiErrorMessage(error), 'error');
    } finally {
      setTogglingTemplateId(null);
    }
  }

  function onRequestDelete(templateId: number, templateName: string): void {
    setDeleteTargetId(templateId);
    setDeleteTargetName(templateName);
  }

  function onDeleteDialogOpenChange(open: boolean): void {
    if (!open) {
      setDeleteTargetId(null);
      setDeleteTargetName('');
    }
  }

  async function onConfirmDelete(): Promise<void> {
    if (deleteTargetId === null) {
      return;
    }
    const id = deleteTargetId;
    try {
      await deleteMutation.mutateAsync(id);
      showGlobalToast('Plantilla eliminada', 'success');
      setDeleteTargetId(null);
      setDeleteTargetName('');
    } catch (error) {
      showGlobalToast(getChecklistsApiErrorMessage(error), 'error');
    }
  }

  const onSubmit = handleSubmit(async raw => {
    const isEdit = editingTemplateId !== null;
    const parsed = (
      isEdit ? checklistTemplateFormSchema : checklistTemplateCreateFormSchema
    ).safeParse(raw);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        if (issue.path.length === 0) {
          continue;
        }
        const pathJoined = issue.path.map(String).join('.');
        setError(pathJoined as FieldPath<ChecklistTemplateFormValues>, {
          type: 'manual',
          message: issue.message,
        });
      }
      return;
    }
    const values = parsed.data;
    try {
      if (isEdit && editingTemplateId !== null) {
        await updateMutation.mutateAsync({
          templateId: editingTemplateId,
          payload: {
            name: values.name,
            items: values.items.map(item => ({
              id: item.itemId,
              order: item.order,
              question: item.question,
              required: item.required,
            })),
          },
        });
        showGlobalToast('Plantilla actualizada', 'success');
      } else {
        await createMutation.mutateAsync({
          name: values.name,
          items: values.items.map(item => ({
            order: item.order,
            question: item.question,
            required: item.required,
          })),
        });
        showGlobalToast('Plantilla creada', 'success');
      }
      setDialogOpen(false);
      setEditingTemplateId(null);
      reset(CHECKLIST_TEMPLATE_FORM_DEFAULT_VALUES);
    } catch (error) {
      showGlobalToast(getChecklistsApiErrorMessage(error), 'error');
    }
  });

  const isSaving =
    isSubmitting ||
    createMutation.isPending ||
    updateMutation.isPending;

  return {
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
    deleteMutationPending: deleteMutation.isPending,
  };
}
