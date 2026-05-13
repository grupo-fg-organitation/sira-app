import type { ChangeEvent, FormEvent } from 'react';
import type { LoginFormState } from './loginform.interface';

export interface LoginFormSectionProps {
  logoUrl: string;
  isLoading: boolean;
  showPassword: boolean;
  submitError: string | null;
  formData: LoginFormState;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRememberCheckedChange: (checked: boolean | 'indeterminate') => void;
  onTogglePasswordVisibility: () => void;
}
