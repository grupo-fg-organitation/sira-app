import { LoginFormSection, LoginHeroPanel } from '../components';
import { useLoginPage } from '../hooks';
import { GRUPO_FG_LOGO_BLANCO_URL } from '../interfaces';

export function LoginPage() {
  const {
    isLoading,
    showPassword,
    submitError,
    formData,
    handleSubmit,
    onEmailChange,
    onPasswordChange,
    onRememberCheckedChange,
    onTogglePasswordVisibility,
  } = useLoginPage();

  return (
    <div className='flex min-h-screen w-full flex-1 overflow-hidden'>
      <LoginHeroPanel />
      <LoginFormSection
        logoUrl={GRUPO_FG_LOGO_BLANCO_URL}
        isLoading={isLoading}
        showPassword={showPassword}
        submitError={submitError}
        formData={formData}
        onSubmit={handleSubmit}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onRememberCheckedChange={onRememberCheckedChange}
        onTogglePasswordVisibility={onTogglePasswordVisibility}
      />
    </div>
  );
}
