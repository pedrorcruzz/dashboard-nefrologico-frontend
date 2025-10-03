export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp?: string;
}

export interface PacientesNumero {
  value: number;
}

export interface ExamesNefroNumero {
  value: number;
}

export interface ExameCategoriaItem {
  nome_exame: string;
  total_exames: string;
}

export interface PacientesGeneroItem {
  genero: "M" | "F" | string;
  quantidade: string;
}

export interface DiagnosticoCidDataItem {
  cid10: string;
  data_diagnostico: string; // may be dd/MM/yyyy
}

export interface DiagnosticoFaixaEtariaItem {
  idade: number;
  total_de_cid10: string;
}

export interface DiagnosticoTabelaPage {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Array<{
    id: number;
    cid10: string;
    title: string;
    diagnosis_date: string; // ISO
    age: number;
    gender: string;
  }>;
}

const BASE_URL = (import.meta as unknown as { env?: Record<string, unknown> })
  .env?.VITE_URL_API as string | undefined;

function getBaseUrl(): string {
  if (!BASE_URL) {
    console.warn("VITE_URL_API is not set. Defaulting to empty base URL.");
    return "";
  }
  return BASE_URL.replace(/\/$/, "");
}

async function httpGet<T>(path: string): Promise<ApiResponse<T>> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as ApiResponse<T>;
}

export async function getPacientesNumero() {
  return httpGet<number>("/pacientes/numero");
}

export async function getExamesNefroNumero() {
  return httpGet<number>("/exames/nefro/numero");
}

export async function getExamesNefroCategoria() {
  return httpGet<ExameCategoriaItem[]>("/exames/nefro/categoria");
}

export async function getPacientesGenero() {
  return httpGet<PacientesGeneroItem[]>("/pacientes/genero");
}

export async function getDiagnosticosCidData() {
  return httpGet<DiagnosticoCidDataItem[]>("/diagnosticos/cid/data");
}

export async function getDiagnosticosCidFaixaEtaria() {
  return httpGet<DiagnosticoFaixaEtariaItem[]>(
    "/diagnosticos/cid/faixa-etaria"
  );
}

export async function getDiagnosticosCidTabela(page = 0, limit = 10) {
  const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
  return httpGet<DiagnosticoTabelaPage>(`/diagnosticos/cid/tabela?${qs}`);
}
