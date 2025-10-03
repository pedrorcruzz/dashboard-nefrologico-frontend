import { useEffect, useMemo, useState } from "react";
import {
  getDiagnosticosCidData,
  getExamesNefroCategoria,
  getExamesNefroNumero,
  getPacientesGenero,
  getPacientesNumero,
  getPacientesIdade,
} from "../utils/api";

export interface SystemData {
  totalPatients: number;
  activePatients: number;
  newPatientsThisMonth: number;
  totalExams: number;
  gender: { M: number; F: number };
  ages?: Array<{ age: number; total: number }>;
  topCategory?: string;
  patientsByAge?: Array<{ age: number; total: number }>;

  kpis: {
    examsPerMonth: {
      value: number; // last full month's exams/diagnoses count (proxy)
      total: number; // same as value, retained for compatibility
    };
    patientVariation: {
      variation: number; // MoM variation based on diagnoses data
      change: number; // alias of variation for compatibility
      profitability: number; // not applicable; set to 0
    };
  };

  charts: {
    patientEvolution: {
      labels: string[];
      data: {
        appliedValue: number[]; // monthly counts
        capitalGain: number[]; // deltas
      };
    };
    examDistribution: {
      labels: string[]; // category names
      data: number[]; // percentages (0-100)
    };
  };
}

function formatMonthLabel(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  return `${mm}/${yy}`;
}

function parseBrDate(d: string): Date | null {
  // expects dd/MM/yyyy
  const m = d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]) - 1;
  const year = Number(m[3]);
  const dt = new Date(year, month, day);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

export const useSystemData = (): SystemData => {
  const [totals, setTotals] = useState({ patients: 0, exams: 0 });
  const [gender, setGender] = useState<{ M: number; F: number }>({
    M: 0,
    F: 0,
  });
  const [categories, setCategories] = useState<
    Array<{ label: string; count: number }>
  >([]);
  const [diagnosisDates, setDiagnosisDates] = useState<Date[]>([]);
  const [ages, setAges] = useState<Array<{ age: number; total: number }>>([]);
  const [topCategory, setTopCategory] = useState<string>("");
  const [patientsByAge, setPatientsByAge] = useState<
    Array<{ age: number; total: number }>
  >([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [pNum, eNum, cats, gen, diag] = await Promise.all([
          getPacientesNumero(),
          getExamesNefroNumero(),
          getExamesNefroCategoria(),
          getPacientesGenero(),
          getDiagnosticosCidData(),
        ]);

        if (cancelled) return;

        setTotals({ patients: pNum.data ?? 0, exams: eNum.data ?? 0 });

        const g = { M: 0, F: 0 } as { M: number; F: number };
        (gen.data ?? []).forEach((it) => {
          const qty = Number(it.quantidade ?? 0) || 0;
          if (it.genero === "M") g.M += qty;
          else if (it.genero === "F") g.F += qty;
        });
        setGender(g);

        const mappedCats = (cats.data ?? []).map((c) => ({
          label: c.nome_exame,
          count: Number(c.total_exames ?? 0) || 0,
        }));
        setCategories(mappedCats);
        if (mappedCats.length > 0) {
          setTopCategory(
            mappedCats.slice().sort((a, b) => b.count - a.count)[0].label
          );
        }

        const dates: Date[] = [];
        (diag.data ?? []).forEach((d) => {
          const parsed = parseBrDate(d.data_diagnostico);
          if (parsed) dates.push(parsed);
        });
        setDiagnosisDates(dates);
        // pacientes por idade
        getPacientesIdade()
          .then((res) => {
            const arr = (res.data ?? []).map((i) => ({
              age: i.idade,
              total: Number(i.quantidade ?? 0) || 0,
            }));
            setPatientsByAge(arr);
          })
          .catch(() => {});
        // lazy fetch faixa etária (não bloqueia UI)
        import("../utils/api").then(({ getDiagnosticosCidFaixaEtaria }) => {
          getDiagnosticosCidFaixaEtaria()
            .then((agesRes) => {
              const arr = (agesRes.data ?? []).map((a) => ({
                age: a.idade,
                total: Number(a.total_de_cid10 ?? 0) || 0,
              }));
              setAges(arr);
            })
            .catch(() => {});
        });
      } catch (e) {
        console.error("Failed to load system data", e);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Compute evolution over last 12 months from diagnosisDates
  const evolution = useMemo(() => {
    const now = new Date();
    // Create buckets for last 12 months (oldest -> newest)
    const months: { start: Date; label: string }[] = [];
    for (let i = 11; i >= 0; i -= 1) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ start: d, label: formatMonthLabel(d) });
    }
    const counts = new Array(months.length).fill(0);
    diagnosisDates.forEach((d) => {
      months.forEach((m, idx) => {
        const next = new Date(m.start.getFullYear(), m.start.getMonth() + 1, 1);
        if (d >= m.start && d < next) counts[idx] += 1;
      });
    });
    const deltas = counts.map((c, i) => (i === 0 ? 0 : c - counts[i - 1]));
    return {
      labels: months.map((m) => m.label),
      counts,
      deltas,
    };
  }, [diagnosisDates]);

  // Compute new patients this month as diagnoses in current month (proxy)
  const newThisMonth = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return diagnosisDates.filter((d) => d >= start && d < next).length;
  }, [diagnosisDates]);

  const examDistribution = useMemo(() => {
    const total = categories.reduce((s, c) => s + c.count, 0) || 1;
    const labels = categories.map((c) => c.label);
    const data = categories.map((c) =>
      Number(((c.count / total) * 100).toFixed(2))
    );
    return { labels, data };
  }, [categories]);

  const examsLastMonth = evolution.counts.at(-2) ?? 0;
  const examsThisMonth = evolution.counts.at(-1) ?? 0;
  const variation = examsThisMonth - examsLastMonth;

  const systemData: SystemData = {
    totalPatients: totals.patients,
    activePatients: gender.M + gender.F,
    newPatientsThisMonth: newThisMonth,
    totalExams: totals.exams,
    gender,
    ages,
    topCategory,
    patientsByAge,

    kpis: {
      examsPerMonth: {
        value: examsLastMonth,
        total: examsLastMonth,
      },
      patientVariation: {
        variation,
        change: variation,
        profitability: 0,
      },
    },

    charts: {
      patientEvolution: {
        labels: evolution.labels,
        data: {
          appliedValue: evolution.counts,
          capitalGain: evolution.deltas,
        },
      },
      examDistribution: examDistribution,
    },
  };

  return systemData;
};
