import './sira-api.interceptors';

export { siraApi } from '@/api/sira-api';
export type { ApiSuccessResponse } from './api-success-response.interface';
export type { ApiErrorResponse } from './api-error-response.interface';
export {
  clearAccessTokenCookie,
  getAccessTokenCookie,
  setAccessTokenCookie,
} from './access-token.cookie';
