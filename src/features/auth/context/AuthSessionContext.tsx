import { createContext, useContext, type ReactNode } from 'react';
import type { AuthMeUser } from '../interfaces/authmeuser.interface';

export type AuthSessionContextValue = {
  user: AuthMeUser;
};

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

export function AuthSessionProvider({
  user,
  children,
}: {
  user: AuthMeUser;
  children: ReactNode;
}) {
  return (
    <AuthSessionContext.Provider value={{ user }}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession(): AuthSessionContextValue {
  const value = useContext(AuthSessionContext);
  if (value === null) {
    throw new Error('useAuthSession debe usarse dentro de AuthSessionProvider');
  }
  return value;
}

export function useAuthSessionOptional(): AuthSessionContextValue | null {
  return useContext(AuthSessionContext);
}
