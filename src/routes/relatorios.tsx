import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  getDiagnosticosCidFaixaEtaria,
  getDiagnosticosCidTabela,
} from "../utils/api";

export const Route = createFileRoute("/relatorios")({
  component: ReportPage,
});

interface Row {
  id: number;
  cid10: string;
  title: string;
  diagnosis_date: string;
  age: number;
  gender: string;
}

function ReportPage() {
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [rows, setRows] = useState<Row[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [ageData, setAgeData] = useState<{ age: number; total: number }[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [table, ages] = await Promise.all([
          getDiagnosticosCidTabela(page, limit),
          getDiagnosticosCidFaixaEtaria(),
        ]);
        if (cancelled) return;
        const t = table.data;
        setRows(t.data);
        setTotalPages(t.totalPages);
        setTotal(t.total);
        setAgeData(
          (ages.data ?? []).map((a) => ({
            age: a.idade,
            total: Number(a.total_de_cid10 ?? 0) || 0,
          }))
        );
      } catch (e) {
        console.error("Falha ao carregar relatórios", e);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [page, limit]);

  const maxAge = useMemo(
    () => Math.max(1, ...ageData.map((a) => a.total)),
    [ageData]
  );

  return (
    <div className="min-h-screen bg-background-primary pb-12 md:pb-20">
      <div className="w-full space-y-6 px-2 md:px-6">
        <section className="space-y-4">
          <h2 className="text-card-text text-lg font-semibold">
            CID10 por Faixa Etária
          </h2>
          <div className="bg-card-background rounded-lg p-6 border border-card-line/40">
            <ul className="space-y-2" aria-label="CID10 por idade">
              {ageData
                .sort((a, b) => a.age - b.age)
                .map((a) => (
                  <li
                    key={`age-${a.age}`}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-card-text text-sm w-10">{a.age}</span>
                    <div className="flex-1 bg-card-tertiary rounded-full h-3">
                      <div
                        className="h-3 bg-card-items rounded-full"
                        style={{ width: `${(a.total / maxAge) * 100}%` }}
                        aria-label={`Idade ${a.age}: ${a.total}`}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={maxAge}
                        aria-valuenow={a.total}
                      />
                    </div>
                    <span className="text-card-text text-sm w-12 text-right">
                      {a.total}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-card-text text-lg font-semibold">
            Tabela de Diagnósticos CID10
          </h2>
          <div className="bg-card-background rounded-lg p-6 border border-card-line/40">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-card-subtext">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">CID-10</th>
                    <th className="py-2 pr-4">Título</th>
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
                      <td className="py-2 pr-4">{r.id}</td>
                      <td className="py-2 pr-4">{r.cid10}</td>
                      <td className="py-2 pr-4">{r.title}</td>
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
            <div className="flex items-center justify-between mt-4">
              <span className="text-card-subtext text-sm">
                Página {page + 1} de {totalPages} — Total: {total}
              </span>
              <div className="space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 bg-card-items text-white rounded disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page <= 0}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-card-items text-white rounded disabled:opacity-50"
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={page >= totalPages - 1}
                >
                  Próxima
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
