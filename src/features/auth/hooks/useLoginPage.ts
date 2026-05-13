import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessTokenCookie, setAccessTokenCookie } from '@/infrastructure/http';
import type { LoginFormState } from '../interfaces';
import { authGetMe, authLogin, getAuthErrorMessage } from '../service/auth.service';

export function useLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    if (!getAccessTokenCookie()) {
      return;
    }
    authGetMe()
      .then(() => navigate('/', { replace: true }))
      .catch(() => undefined);
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setSubmitError(null);
    try {
      const { accessToken } = await authLogin(formData.email, formData.password);
      setAccessTokenCookie(accessToken);
      navigate('/', { replace: true });
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, email: event.target.value });
  }

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, password: event.target.value });
  }

  function onRememberCheckedChange(checked: boolean | 'indeterminate') {
    setFormData({
      ...formData,
      remember: checked === true,
    });
  }

  function onTogglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return {
    isLoading,
    showPassword,
    submitError,
    formData,
    handleSubmit,
    onEmailChange,
    onPasswordChange,
    onRememberCheckedChange,
    onTogglePasswordVisibility,
  };
}
