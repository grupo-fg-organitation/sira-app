import { z } from 'zod';

const apiRoleSchema = z.enum(['ADMIN', 'RESPONSABLE', 'GENERAL']);

const baseUserFormSchema = z.object({
  companyId: z.number().int().positive(),
  fullName: z
    .string()
    .trim()
    .min(2, 'Indica al menos 2 caracteres')
    .max(120, 'Máximo 120 caracteres'),
  email: z.string().trim().email('Correo no válido'),
  phone: z
    .string()
    .trim()
    .max(40, 'Máximo 40 caracteres')
    .optional()
    .default(''),
  department: z
    .string()
    .trim()
    .min(2, 'Indica el departamento')
    .max(120, 'Máximo 120 caracteres'),
  role: apiRoleSchema,
});

export const createUserFormSchema = baseUserFormSchema.extend({
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(128, 'Máximo 128 caracteres'),
});

export const editUserFormSchema = baseUserFormSchema.extend({
  password: z.union([
    z.literal(''),
    z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(128, 'Máximo 128 caracteres'),
  ]),
});

export type UserFormValues = z.infer<typeof editUserFormSchema>;
