export interface AuthMeUser {
  userId: number;
  email: string;
  fullName: string;
  role: string;
  roleLabel: string;
  initials: string;
  companyId: number;
  areaId: number | null;
}
