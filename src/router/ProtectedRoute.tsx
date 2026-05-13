import { useEffect, useState, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthSessionProvider } from '@/features/auth/context';
import { authGetMe } from '@/features/auth/service/auth.service';
import { getAccessTokenCookie } from '@/infrastructure/http';
import type { AuthMeUser } from '@/features/auth/interfaces/authmeuser.interface';

type ProtectedRouteProps = {
  children: ReactElement;
};

type SessionState =
  | { status: 'loading' }
  | { status: 'unauth' }
  | { status: 'authed'; user: AuthMeUser };

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getAccessTokenCookie();
  const [session, setSession] = useState<SessionState>(() =>
    token ? { status: 'loading' } : { status: 'unauth' },
  );

  useEffect(() => {
    if (!token) {
      setSession({ status: 'unauth' });
      return;
    }
    let cancelled = false;
    authGetMe()
      .then(user => {
        if (!cancelled) {
          setSession({ status: 'authed', user });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSession({ status: 'unauth' });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (session.status === 'unauth') {
    return <Navigate to='/login' replace />;
  }
  if (session.status === 'loading') {
    return (
      <div className='flex min-h-screen w-full items-center justify-center bg-background'>
        <Loader2
          className='h-9 w-9 animate-spin text-muted-foreground'
          aria-hidden
        />
      </div>
    );
  }
  return (
    <AuthSessionProvider user={session.user}>{children}</AuthSessionProvider>
  );
}
