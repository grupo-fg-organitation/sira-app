import type { LucideIcon } from 'lucide-react';

export type ReportExportKind = 'actions-excel';

export interface ReportSummary {
  id: string;
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
  tipo: string;
  exportKind: ReportExportKind | null;
}

export interface ReportDownloadFile {
  blob: Blob;
  filename: string;
}
