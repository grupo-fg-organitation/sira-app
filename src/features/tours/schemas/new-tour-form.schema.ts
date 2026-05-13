import { z } from 'zod';

export const newTourSchema = z.object({
  areaId: z.coerce
    .number()
    .refine(n => Number.isFinite(n) && n > 0, {
      message: 'Selecciona un área',
    }),
  templateId: z.string().optional(),
  tourDate: z.string().optional(),
  generalNotes: z.string().max(4000).optional(),
});

export type NewTourFormValues = z.infer<typeof newTourSchema>;
