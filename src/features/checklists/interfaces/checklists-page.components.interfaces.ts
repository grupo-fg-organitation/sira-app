import type { FormEvent } from 'react';
import type {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import type { ChecklistTemplateFormValues } from '@/features/checklists/schemas/checklist-template-form.schema';
import type { ChecklistTemplateSummaryApi } from '@/features/checklists/interfaces/sira-checklist-api.interfaces';

export type ChecklistsPageErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export type ChecklistsPageHeaderProps = {
  onCreateClick: () => void;
};

export type ChecklistTemplatesTableProps = {
  templates: ChecklistTemplateSummaryApi[];
  togglingTemplateId: number | null;
  onEdit: (templateId: number) => void;
  onToggleActive: (template: ChecklistTemplateSummaryApi) => void;
  onRequestDelete: (templateId: number, templateName: string) => void;
};

export type ChecklistTemplateFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  detailLoading: boolean;
  detailError: boolean;
  onRetryDetail: () => void;
  register: UseFormRegister<ChecklistTemplateFormValues>;
  control: Control<ChecklistTemplateFormValues>;
  errors: FieldErrors<ChecklistTemplateFormValues>;
  fieldRows: FieldArrayWithId<ChecklistTemplateFormValues, 'items', 'id'>[];
  fieldsLength: number;
  onAddItem: () => void;
  removeItem: (index: number) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSaving: boolean;
};

export type ChecklistDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateName: string;
  onConfirm: () => void;
  isDeleting: boolean;
};
