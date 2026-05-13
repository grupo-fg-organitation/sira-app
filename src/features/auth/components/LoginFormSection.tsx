import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import type { LoginFormSectionProps } from '../interfaces';

export function LoginFormSection({
  logoUrl,
  isLoading,
  showPassword,
  submitError,
  formData,
  onSubmit,
  onEmailChange,
  onPasswordChange,
  onRememberCheckedChange,
  onTogglePasswordVisibility,
}: LoginFormSectionProps) {
  return (
    <div className='relative flex w-full flex-1 items-center justify-center bg-linear-to-b from-background via-background to-muted/25 p-6 sm:p-10 lg:w-1/2'>
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.35] motion-safe:animate-pulse motion-safe:animation-duration-[6s]'
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, oklch(0.55 0.01 250 / 0.12) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      <div className='relative z-1 w-full max-w-md'>
        <div className='login-rise mb-10 flex items-center gap-4 lg:hidden'>
          <div className='flex h-14 shrink-0 items-center justify-center rounded-2xl bg-[#0A2240] px-3.5 shadow-md ring-1 ring-black/10 transition-transform duration-300 ease-out active:scale-95'>
            <img
              src={logoUrl}
              alt='Grupo FG'
              className='h-8 w-auto max-w-[120px] object-contain'
              loading='lazy'
              decoding='async'
              referrerPolicy='no-referrer'
            />
          </div>
          <div className='min-w-0 text-left'>
            <h1 className='text-xl font-semibold tracking-tight text-foreground'>
              SIRA - SH
            </h1>
          </div>
        </div>

        <div className='login-rise login-rise-delay-1 relative'>
          <Card className='rounded-3xl border border-border/70 bg-card/90 py-6 shadow-2xl shadow-[#0A2240]/12 ring-1 ring-black/4 backdrop-blur-md transition-all duration-500 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_28px_56px_-16px_rgba(10,34,64,0.2)] dark:bg-card/80 dark:shadow-black/30 dark:ring-white/6'>
            {isLoading ? (
              <div
                className='absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-3xl bg-background/75 px-6 text-center backdrop-blur-md transition-opacity duration-300'
                aria-live='polite'
                aria-busy='true'
              >
                <Loader2
                  className='h-10 w-10 animate-spin text-[#FF4D00]'
                  strokeWidth={2}
                />
                <p className='text-sm font-medium text-foreground'>
                  Verificando credenciales…
                </p>
                <p className='max-w-[240px] text-xs text-muted-foreground'>
                  Un momento, estamos validando tu acceso de forma segura.
                </p>
              </div>
            ) : null}

            <CardHeader className='space-y-2 px-6 pb-2 sm:px-8'>
              <CardTitle className='text-2xl font-semibold tracking-tight sm:text-[1.65rem]'>
                Iniciar sesión
              </CardTitle>
              <CardDescription className='text-[0.95rem] leading-relaxed'>
                Ingresa tus credenciales para acceder al sistema
              </CardDescription>
              {submitError ? (
                <p
                  role='alert'
                  className='rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive'
                >
                  {submitError}
                </p>
              ) : null}
            </CardHeader>
            <CardContent className='px-6 sm:px-8'>
              <form onSubmit={onSubmit} className='space-y-5'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='email'
                    className='text-sm font-medium text-foreground'
                  >
                    Correo electrónico
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='usuario@grupofg.com'
                    value={formData.email}
                    onChange={onEmailChange}
                    required
                    disabled={isLoading}
                    className='h-12 cursor-text rounded-xl border-border/80 bg-background/80 px-4 text-base shadow-sm transition-all duration-200 placeholder:text-muted-foreground/70 hover:border-border focus-visible:border-[#FF4D00]/50 focus-visible:ring-[#FF4D00]/25 md:text-sm'
                  />
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between gap-2'>
                    <Label
                      htmlFor='password'
                      className='text-sm font-medium text-foreground'
                    >
                      Contraseña
                    </Label>
                    <button
                      type='button'
                      className='cursor-pointer rounded-lg px-2 py-1 text-sm font-medium text-[#FF4D00] transition-colors duration-200 hover:bg-[#FF4D00]/10 hover:text-[#e64500] active:scale-[0.98]'
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className='relative'>
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      value={formData.password}
                      onChange={onPasswordChange}
                      required
                      disabled={isLoading}
                      className='h-12 cursor-text rounded-xl border-border/80 bg-background/80 px-4 pr-12 text-base shadow-sm transition-all duration-200 placeholder:text-muted-foreground/70 hover:border-border focus-visible:border-[#FF4D00]/50 focus-visible:ring-[#FF4D00]/25 md:text-sm'
                    />
                    <button
                      type='button'
                      onClick={onTogglePasswordVisibility}
                      disabled={isLoading}
                      className='absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95 disabled:pointer-events-none disabled:opacity-40'
                      aria-label={
                        showPassword
                          ? 'Ocultar contraseña'
                          : 'Mostrar contraseña'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className='h-5 w-5' />
                      ) : (
                        <Eye className='h-5 w-5' />
                      )}
                    </button>
                  </div>
                </div>

                <div className='flex cursor-pointer items-center gap-3 rounded-xl border border-transparent py-1 transition-colors duration-200 hover:border-border/60 hover:bg-muted/40'>
                  <Checkbox
                    id='remember'
                    checked={formData.remember}
                    disabled={isLoading}
                    onCheckedChange={onRememberCheckedChange}
                    className='cursor-pointer transition-transform duration-200 data-[state=checked]:scale-105'
                  />
                  <Label
                    htmlFor='remember'
                    className='cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed'
                  >
                    Recordar sesión
                  </Label>
                </div>

                <Button
                  type='submit'
                  disabled={isLoading}
                  className='h-12 w-full cursor-pointer rounded-2xl bg-[#FF4D00] text-base font-semibold text-white shadow-lg shadow-[#FF4D00]/25 ring-1 ring-white/10 transition-all duration-300 hover:bg-[#e64500] hover:shadow-xl hover:shadow-[#FF4D00]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70'
                >
                  {isLoading ? (
                    <span className='inline-flex items-center gap-2'>
                      <Loader2 className='h-5 w-5 animate-spin' />
                      Iniciando sesión…
                    </span>
                  ) : (
                    'Iniciar sesión'
                  )}
                </Button>
              </form>

              <div className='mt-8 text-center text-sm text-muted-foreground'>
                ¿Necesitas acceso?{' '}
                <button
                  type='button'
                  className='cursor-pointer rounded-md px-1.5 py-0.5 font-medium text-[#FF4D00] underline-offset-4 transition-colors duration-200 hover:bg-[#FF4D00]/10 hover:text-[#e64500] hover:underline active:scale-[0.98]'
                >
                  Contacta al administrador
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className='login-rise login-rise-delay-2 mt-10 text-center text-sm text-muted-foreground lg:hidden'>
          &copy; Grupo FG. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
