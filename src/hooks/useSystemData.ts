import { useEffect, useMemo, useState } from "react";
import {
  getDiagnosticosCidData,
  getExamesNefroCategoria,
  getExamesNefroNumero,
  getPacientesGenero,
  getPacientesNumero,
} from "../utils/api";

export interface SystemData {
  totalPatients: number;
  activePatients: number;
  newPatientsThisMonth: number;
  totalExams: number;
  gender: { M: number; F: number };

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

        setCategories(
          (cats.data ?? []).map((c) => ({
            label: c.nome_exame,
            count: Number(c.total_exames ?? 0) || 0,
          }))
        );

        const dates: Date[] = [];
        (diag.data ?? []).forEach((d) => {
          const parsed = parseBrDate(d.data_diagnostico);
          if (parsed) dates.push(parsed);
        });
        setDiagnosisDates(dates);
      } catch (e) {
        console.error("Failed to load system data", e);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Compute evolution over last 6 months from diagnosisDates
  const evolution = useMemo(() => {
    const now = new Date();
    // Create buckets for last 6 months (oldest -> newest)
    const months: { start: Date; label: string }[] = [];
    for (let i = 5; i >= 0; i -= 1) {
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

  // Exam distribution as percentages by category
  const examDistribution = useMemo(() => {
    const total = categories.reduce((s, c) => s + c.count, 0) || 1;
    const labels = categories.map((c) => c.label);
    const data = categories.map((c) =>
      Number(((c.count / total) * 100).toFixed(2))
    );
    return { labels, data };
  }, [categories]);

  const examsLastMonth = evolution.counts.at(-2) ?? 0; // last full month (previous bucket)
  const examsThisMonth = evolution.counts.at(-1) ?? 0;
  const variation = examsThisMonth - examsLastMonth;

  const systemData: SystemData = {
    totalPatients: totals.patients,
    activePatients: gender.M + gender.F, // proxy until specific endpoint exists
    newPatientsThisMonth: newThisMonth,
    totalExams: totals.exams,
    gender,

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
