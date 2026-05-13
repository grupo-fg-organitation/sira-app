import axios from 'axios';
import { siraApi, type ApiErrorResponse } from '@/infrastructure/http';
import type {
  ReportDownloadFile,
  ReportExportKind,
} from '@/features/reports/interfaces/reports.interfaces';

const excelMimeType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

function getFilenameFromDisposition(
  contentDisposition: string | undefined,
): string | null {
  if (!contentDisposition) {
    return null;
  }

  const filenameMatch = /filename="?([^"]+)"?/i.exec(contentDisposition);
  return filenameMatch?.[1] ?? null;
}

export async function downloadReportFile(
  exportKind: ReportExportKind,
): Promise<ReportDownloadFile> {
  const endpointByKind: Record<ReportExportKind, string> = {
    'actions-excel': 'actions/export/excel',
  };

  const response = await siraApi.get<Blob>(endpointByKind[exportKind], {
    responseType: 'blob',
  });

  const filename =
    getFilenameFromDisposition(response.headers['content-disposition']) ??
    'acciones.xlsx';

  return {
    blob: new Blob([response.data], { type: excelMimeType }),
    filename,
  };
}

export function saveReportFile(file: ReportDownloadFile): void {
  const downloadUrl = window.URL.createObjectURL(file.blob);
  const link = document.createElement('a');

  link.href = downloadUrl;
  link.download = file.filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}

export function getReportsApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as ApiErrorResponse | undefined;
    if (body && typeof body.message === 'string' && body.message.length > 0) {
      return body.message;
    }
  }
  return 'No se pudo descargar el reporte. Intenta de nuevo.';
}
