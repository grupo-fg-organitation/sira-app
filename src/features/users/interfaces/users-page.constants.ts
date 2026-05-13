import type { SiraApiRole } from '@/features/users/services/users.service';
import type { UserFormValues } from '@/features/users/schemas/user-catalog-form.schema';

export const USERS_CATALOG_LIST_MAX_ITEMS = 10;

export const USER_CATALOG_FORM_DEFAULT_VALUES: UserFormValues = {
  companyId: 1,
  fullName: '',
  email: '',
  phone: '',
  department: '',
  role: 'GENERAL',
  password: '',
};

export const USER_CATALOG_ROLES_SELECT: readonly {
  value: SiraApiRole;
  label: string;
}[] = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'RESPONSABLE', label: 'Responsable' },
  { value: 'GENERAL', label: 'General' },
] as const;
