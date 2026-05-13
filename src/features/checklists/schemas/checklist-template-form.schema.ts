import { z } from 'zod';

const checklistTemplateFormItemSchema = z.object({
  itemId: z.number().int().positive().optional(),
  order: z.coerce.number().int().min(0),
  question: z.string().trim().min(1).max(2000),
  required: z.boolean(),
});

export const checklistTemplateFormSchema = z.object({
  name: z.string().trim().min(2).max(500),
  items: z.array(checklistTemplateFormItemSchema).min(1),
});

export const checklistTemplateCreateFormSchema = z.object({
  name: z.string().trim().min(2).max(200),
  items: z.array(checklistTemplateFormItemSchema).min(1),
});

export type ChecklistTemplateFormValues = z.infer<
  typeof checklistTemplateFormSchema
>;

export const CHECKLIST_TEMPLATE_FORM_DEFAULT_VALUES: ChecklistTemplateFormValues =
  {
    name: '',
    items: [
      {
        order: 0,
        question: '',
        required: true,
      },
    ],
  };
