import type { FormEventHandler } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { UseMutationResult } from '@tanstack/react-query';
import type { NewTourFormValues } from '@/features/tours/schemas/new-tour-form.schema';
import type {
  ChecklistTemplateSummaryApi,
  CreateTourPayload,
  TourWithDetailsApi,
} from '@/features/tours/interfaces/sira-tour-api.interfaces';

export interface CatalogAreaOption {
  id: number;
  name: string;
  companyName?: string;
}

export interface NewTourFormProps {
  register: UseFormRegister<NewTourFormValues>;
  onFormSubmit: FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<NewTourFormValues>;
  formError: string | null;
  areas: CatalogAreaOption[];
  templates: ChecklistTemplateSummaryApi[];
  createMutation: UseMutationResult<
    TourWithDetailsApi,
    Error,
    CreateTourPayload,
    unknown
  >;
}
