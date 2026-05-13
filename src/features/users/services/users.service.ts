import axios from 'axios';
import {
  siraApi,
  type ApiErrorResponse,
  type ApiSuccessResponse,
} from '@/infrastructure/http';

export const USERS_CATALOG_QUERY_ROOT = ['users', 'catalog'] as const;

export const CATALOG_AREAS_QUERY_ROOT = ['users', 'catalog', 'areas'] as const;

export interface CatalogAreaItem {
  id: number;
  name: string;
  createdAt: string;
  companyId: number;
  companyName: string;
}

export type SiraApiRole = 'ADMIN' | 'RESPONSABLE' | 'GENERAL';

export const CATALOG_COMPANIES_QUERY_ROOT = ['users', 'catalog', 'companies'] as const;

export interface CompanyUserCatalogItem {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  department: string;
  role: SiraApiRole;
  isActive: boolean;
  areaId: number | null;
  companyId: number;
  companyName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  companyId: number;
  fullName: string;
  email: string;
  phone?: string;
  department: string;
  password: string;
  role: SiraApiRole;
}

export interface UpdateUserPayload {
  fullName: string;
  email: string;
  phone: string | null;
  department: string;
  role: SiraApiRole;
  password?: string;
}

export async function fetchCatalogAreas(): Promise<CatalogAreaItem[]> {
  const { data } = await siraApi.get<ApiSuccessResponse<CatalogAreaItem[]>>(
    'users/catalog/areas',
  );
  return data.data;
}

export interface CatalogCompanyItem {
  id: number;
  name: string;
  createdAt: string;
}

export async function fetchCatalogCompanies(): Promise<CatalogCompanyItem[]> {
  const { data } = await siraApi.get<ApiSuccessResponse<CatalogCompanyItem[]>>(
    'users/catalog/companies',
  );
  return data.data;
}

export type FetchCompanyUsersCatalogOptions = {
  maxResults?: number;
};

export async function fetchCompanyUsersCatalog(
  search?: string,
  options?: FetchCompanyUsersCatalogOptions,
): Promise<CompanyUserCatalogItem[]> {
  const q = search?.trim();
  const max = options?.maxResults;
  const { data } = await siraApi.get<
    ApiSuccessResponse<CompanyUserCatalogItem[]>
  >(
    'users/catalog/users',
    q !== undefined && q.length > 0 ? { params: { q } } : {},
  );
  const list = data.data;
  return max !== undefined ? list.slice(0, max) : list;
}

export async function createUser(payload: CreateUserPayload): Promise<void> {
  await siraApi.post('users', payload);
}

export async function updateUser(
  userId: number,
  payload: UpdateUserPayload,
): Promise<void> {
  await siraApi.patch(`users/${userId}`, payload);
}

export async function toggleUserActive(userId: number): Promise<void> {
  await siraApi.patch(`users/${userId}/toggle-active`);
}

export function getUsersApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as ApiErrorResponse | undefined;
    if (body && typeof body.message === 'string' && body.message.length > 0) {
      return body.message;
    }
  }
  return 'No se pudo completar la operación. Intenta de nuevo.';
}
