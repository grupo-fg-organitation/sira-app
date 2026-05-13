import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type {
  CatalogCompanyItem,
  CompanyUserCatalogItem,
} from '@/features/users/services/users.service';
import type { UserFormValues } from '@/features/users/schemas/user-catalog-form.schema';

export interface UsersPageHeaderProps {
  canManage: boolean;
  onCreateClick: () => void;
}

export interface UsersPageSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isFetching: boolean;
}

export interface UsersPageAdminNoticeProps {
  visible: boolean;
}

export interface UserCatalogCardProps {
  user: CompanyUserCatalogItem;
  index: number;
  currentUserId: number;
  canManage: boolean;
  showCompanyBadge: boolean;
  toggleInProgress: boolean;
  togglingUserId: number | null;
  onEdit: (user: CompanyUserCatalogItem) => void;
  onToggleActive: (userId: number) => void;
}

export interface UsersCatalogEmptyStateProps {
  hasActiveSearch: boolean;
}

export interface UsersPageErrorStateProps {
  message: string;
  onRetry: () => void;
}

export interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  isCreateMode: boolean;
  companyCatalogOptions: readonly CatalogCompanyItem[];
  companyCatalogLoading: boolean;
  register: UseFormRegister<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
  isSaving: boolean;
}
