import axios, { type InternalAxiosRequestConfig } from 'axios';
import { siraApi } from '@/api/sira-api';
import {
  clearAccessTokenCookie,
  getAccessTokenCookie,
} from './access-token.cookie';

function isAuthLoginRequest(config: InternalAxiosRequestConfig): boolean {
  const method = config.method?.toLowerCase();
  const url = config.url ?? '';
  return (
    method === 'post' &&
    (url === 'auth/login' || url.endsWith('/auth/login'))
  );
}

function redirectToLoginWhenSessionInvalid(): void {
  if (window.location.pathname.startsWith('/login')) {
    return;
  }
  window.location.assign('/login');
}

siraApi.interceptors.request.use(config => {
  if (!isAuthLoginRequest(config)) {
    const token = getAccessTokenCookie();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return config;
});

siraApi.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearAccessTokenCookie();
      redirectToLoginWhenSessionInvalid();
    }
    return Promise.reject(error);
  },
);
