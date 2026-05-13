export interface ApiErrorResponse {
  data: null;
  message: string;
  error: string | Record<string, unknown>;
}
