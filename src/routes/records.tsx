import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getDiagnosticosCidTabela } from "../utils/api";
import { translateDiagnosisTitle } from "../utils/translations";

export const Route = createFileRoute("/records")({
  component: DiagnosticoTablePage,
});

interface Row {
  id: number;
  cid10: string;
  title: string;
  diagnosis_date: string;
  age: number;
  gender: string;
}

function DiagnosticoTablePage() {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const limit = isMobile ? 5 : 13;
  const [rows, setRows] = useState<Row[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  // Função para gerar os números das páginas visíveis
  const getVisiblePages = () => {
    const current = page + 1; // Converter para 1-indexed
    const total = totalPages;
    const maxVisible = isMobile ? 3 : 5; // Menos páginas visíveis no mobile
    const delta = Math.floor(maxVisible / 2);

    let start = Math.max(1, current - delta);
    let end = Math.min(total, current + delta);

    // Ajustar se estivermos perto do início ou fim
    if (end - start + 1 < maxVisible) {
      if (start === 1) {
        end = Math.min(total, start + maxVisible - 1);
      } else {
        start = Math.max(1, end - maxVisible + 1);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const table = await getDiagnosticosCidTabela(page, limit);
        if (cancelled) return;
        const t = table.data;
        setRows(t.data);
        setTotalPages(t.totalPages);
        setTotal(t.total);
      } catch (e) {
        console.error("Falha ao carregar relatórios", e);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [page, limit]);

  return (
    <div className="min-h-screen bg-background-primary pb-12 md:pb-20">
      <div className="w-full space-y-6 px-2 md:px-6">
        {/* Tabela de Diagnósticos CID10 */}
        <section className="space-y-4">
          <h2 className="text-card-text text-lg font-semibold">
            Registros de Diagnósticos CID-10
          </h2>
          <div className="bg-card-background rounded-lg p-3 md:p-6 border border-card-line/40">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-card-subtext">
                    <th className="py-2 pr-4">CID-10</th>
                    <th className="py-2 pr-4">Diagnóstico</th>
                    <th className="py-2 pr-4">Data</th>
                    <th className="py-2 pr-4">Idade</th>
                    <th className="py-2 pr-0">Gênero</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t border-card-line/30 text-card-text"
                    >
                      <td className="py-2 pr-4">{r.cid10}</td>
                      <td className="py-2 pr-4">
                        {translateDiagnosisTitle(r.title)}
                      </td>
                      <td className="py-2 pr-4">
                        {new Date(r.diagnosis_date).toLocaleDateString()}
                      </td>
                      <td className="py-2 pr-4">{r.age}</td>
                      <td className="py-2 pr-0">{r.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        CID-10
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {r.cid10}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        Diagnóstico
                      </span>
                      <span className="text-sm text-gray-900 text-right flex-1 ml-2">
                        {translateDiagnosisTitle(r.title)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        Data
                      </span>
                      <span className="text-sm text-gray-900">
                        {new Date(r.diagnosis_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        Idade
                      </span>
                      <span className="text-sm text-gray-900">{r.age}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        Gênero
                      </span>
                      <span className="text-sm text-gray-900">{r.gender}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3">
              <span className="text-card-subtext text-sm text-center sm:text-left">
                Página {page + 1} de {totalPages} — Total: {total}
              </span>
              <div className="flex items-center space-x-2">
                {/* Botões Anterior e Próxima lado a lado */}
                <div className="flex space-x-1">
                  <button
                    type="button"
                    className="px-2 py-1.5 md:px-3 md:py-2 bg-yellow-500 text-white rounded disabled:opacity-50 text-xs md:text-sm font-medium cursor-pointer"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page <= 0}
                  >
                    ← Anterior
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1.5 md:px-3 md:py-2 bg-yellow-500 text-white rounded disabled:opacity-50 text-xs md:text-sm font-medium cursor-pointer"
                    onClick={() =>
                      setPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    disabled={page >= totalPages - 1}
                  >
                    Próxima →
                  </button>
                </div>

                {/* Números das páginas */}
                <div className="flex items-center space-x-1">
                  {/* Primeira página se não estiver visível */}
                  {getVisiblePages()[0] > 1 && (
                    <>
                      <button
                        type="button"
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-medium cursor-pointer"
                        onClick={() => setPage(0)}
                      >
                        1
                      </button>
                      {getVisiblePages()[0] > 2 && (
                        <span className="px-2 text-card-subtext">...</span>
                      )}
                    </>
                  )}

                  {/* Páginas visíveis */}
                  {getVisiblePages().map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                        pageNum === page + 1
                          ? "bg-yellow-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                      onClick={() => setPage(pageNum - 1)}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Última página se não estiver visível */}
                  {getVisiblePages()[getVisiblePages().length - 1] <
                    totalPages && (
                    <>
                      {getVisiblePages()[getVisiblePages().length - 1] <
                        totalPages - 1 && (
                        <span className="px-2 text-card-subtext">...</span>
                      )}
                      <button
                        type="button"
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-medium cursor-pointer"
                        onClick={() => setPage(totalPages - 1)}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
