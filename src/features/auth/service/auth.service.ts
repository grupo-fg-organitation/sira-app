import axios from 'axios';
import {
  clearAccessTokenCookie,
  siraApi,
  type ApiErrorResponse,
  type ApiSuccessResponse,
} from '@/infrastructure/http';
import type { AuthLoginPayload } from '../interfaces/authloginpayload.interface';
import type { AuthMeUser } from '../interfaces/authmeuser.interface';

export async function authLogin(
  email: string,
  password: string,
): Promise<AuthLoginPayload> {
  const { data } = await siraApi.post<ApiSuccessResponse<AuthLoginPayload>>(
    'auth/login',
    { email, password },
  );
  return data.data;
}

export async function authLogout(): Promise<void> {
  try {
    await siraApi.post('auth/logout');
  } finally {
    clearAccessTokenCookie();
  }
}

let authGetMeInflight: Promise<AuthMeUser> | null = null;

export async function authGetMe(): Promise<AuthMeUser> {
  if (authGetMeInflight !== null) {
    return authGetMeInflight;
  }
  authGetMeInflight = siraApi
    .get<ApiSuccessResponse<AuthMeUser>>('auth/me')
    .then(response => response.data.data)
    .finally(() => {
      authGetMeInflight = null;
    });
  return authGetMeInflight;
}

export function getAuthErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as ApiErrorResponse | undefined;
    if (body && typeof body.message === 'string' && body.message.length > 0) {
      return body.message;
    }
  }
  return 'No se pudo iniciar sesión. Intenta de nuevo.';
}
