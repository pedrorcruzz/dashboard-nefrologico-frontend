import { createFileRoute } from "@tanstack/react-router";
import { useId } from "react";
import { useSystemData } from "../hooks/useSystemData";
import {
  KPICard,
  StatCard,
  ChartCard,
  DistributionCard,
  MetricCard,
} from "../components/cards";
import { AiOutlineUser, AiOutlineBarChart, AiOutlineEye } from "react-icons/ai";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const data = useSystemData();
  const kpiHeadingId = useId();
  const chartsHeadingId = useId();
  const statsHeadingId = useId();
  const metricsHeadingId = useId();

  return (
    <div className="min-h-screen bg-background-primary pb-12 md:pb-20">
      <div className="w-full space-y-4 px-2 md:px-6">
        <section aria-labelledby={kpiHeadingId} className="space-y-4">
          <h2 id={kpiHeadingId} className="sr-only">
            Indicadores Principais de Performance
          </h2>
          <fieldset
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            aria-label="Indicadores principais"
          >
            <KPICard
              title="Total de Pacientes"
              value={data.totalPatients.toLocaleString()}
              icon={AiOutlineUser}
            />

            <KPICard
              title="Pacientes Masculinos"
              value={data.gender.M}
              icon={BsGenderMale}
            />

            <KPICard
              title="Pacientes Femininos"
              value={data.gender.F}
              icon={BsGenderFemale}
            />
            <KPICard
              title="Total de Exames"
              value={data.totalExams.toLocaleString()}
              icon={AiOutlineBarChart}
            />
          </fieldset>
        </section>

        {/* Gráficos */}
        <section aria-labelledby={chartsHeadingId} className="space-y-6">
          <h2 id={chartsHeadingId} className="sr-only">
            Gráficos e Visualizações
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Diagnósticos por Mês (últimos 12 meses)">
              <div
                className="h-full flex flex-col justify-center gap-2"
                role="img"
                aria-label="Barras com total de diagnósticos por mês"
              >
                {data.charts.patientEvolution.labels.map((label, index) => (
                  <div
                    key={`diag-month-${label}-${data.charts.patientEvolution.data.appliedValue[index]}`}
                    className="flex items-center gap-3"
                  >
                    <span className="text-card-text text-xs w-12">{label}</span>
                    <div className="flex-1 bg-card-tertiary rounded-full h-3">
                      <div
                        className="h-3 bg-card-items rounded-full"
                        style={{
                          width: `${Math.min(100, (data.charts.patientEvolution.data.appliedValue[index] / Math.max(1, Math.max(...data.charts.patientEvolution.data.appliedValue))) * 100)}%`,
                        }}
                        title={`${label}: ${data.charts.patientEvolution.data.appliedValue[index]}`}
                      />
                    </div>
                    <span className="text-card-text text-xs w-10 text-right">
                      {data.charts.patientEvolution.data.appliedValue[index]}
                    </span>
                  </div>
                ))}
              </div>
            </ChartCard>

            <DistributionCard
              title="Distribuição de Exames"
              data={(() => {
                const labels = data.charts.examDistribution.labels;
                const values = data.charts.examDistribution.data;
                const pairs = labels.map((l, i) => ({
                  label: l,
                  value: values[i] ?? 0,
                }));
                const sorted = pairs.sort((a, b) => b.value - a.value);
                const top = sorted.slice(0, 4);
                const rest = sorted.slice(4);
                const restValue = rest.reduce((s, x) => s + x.value, 0);
                const palette = [
                  "#0171be",
                  "#fcc730",
                  "#34d399",
                  "#f59e0b",
                  "#9ca3af",
                ];
                const topWithColors = top.map((t, i) => ({
                  ...t,
                  color: palette[i % palette.length],
                }));
                return restValue > 0
                  ? [
                      ...topWithColors,
                      {
                        label: "Outros",
                        value: Number(restValue.toFixed(2)),
                        color: palette[4],
                      },
                    ]
                  : topWithColors;
              })()}
            />
          </div>
        </section>

        <section aria-labelledby={statsHeadingId} className="space-y-4">
          <h2 id={statsHeadingId} className="sr-only">
            Estatísticas Adicionais
          </h2>
          <fieldset
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            aria-label="Estatísticas do sistema"
          >
            <StatCard
              title="Pacientes em Tratamento"
              value={data.activePatients}
              icon={AiOutlineUser}
            />

            <StatCard
              title="Exames Pendentes"
              value={Math.floor(data.totalExams * 0.15)}
              icon={AiOutlineBarChart}
            />

            <StatCard
              title="Taxa de Sucesso"
              value="94.2%"
              icon={AiOutlineEye}
            />
          </fieldset>
        </section>

        <section aria-labelledby={metricsHeadingId} className="space-y-4">
          <h2 id={metricsHeadingId} className="sr-only">
            Métricas de Performance
          </h2>
          <fieldset
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            aria-label="Métricas de atendimento"
          >
            <MetricCard
              title="Tempo Médio de Atendimento"
              value="25 min"
              change={{ value: -8, from: "last month" }}
              showGraph={true}
              graphData={[32, 30, 28, 27, 26, 25, 24, 25]}
            />

            <MetricCard
              title="Satisfação do Paciente"
              value="4.8/5.0"
              change={{ value: 5, from: "last month" }}
              showGraph={true}
              graphData={[4.2, 4.3, 4.5, 4.6, 4.7, 4.8, 4.8, 4.8]}
            />
          </fieldset>
        </section>
      </div>
    </div>
  );
}
