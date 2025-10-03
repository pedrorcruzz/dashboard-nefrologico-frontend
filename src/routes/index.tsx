import { createFileRoute } from "@tanstack/react-router";
import { useId } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useSystemData } from "../hooks/useSystemData";
import {
  translateDiagnosisTitle,
  formatNumberWithDot,
} from "../utils/translations";
import {
  KPICard,
  StatCard,
  ChartCard,
  DistributionCard,
} from "../components/cards";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { MdOutlineMedicalServices } from "react-icons/md";
import { FaStethoscope, FaMicroscope, FaUserMd } from "react-icons/fa";

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
              value={formatNumberWithDot(data.totalPatients)}
              icon={FaUserMd}
            />

            <KPICard
              title="Pacientes Masculinos"
              value={formatNumberWithDot(data.gender.M)}
              icon={BsGenderMale}
            />

            <KPICard
              title="Pacientes Femininos"
              value={formatNumberWithDot(data.gender.F)}
              icon={BsGenderFemale}
            />
            <KPICard
              title="Total de Exames"
              value={formatNumberWithDot(data.totalExams)}
              icon={FaStethoscope}
            />
          </fieldset>
        </section>

        {/* Gráficos */}
        <section aria-labelledby={chartsHeadingId} className="space-y-6">
          <h2 id={chartsHeadingId} className="sr-only">
            Gráficos e Visualizações
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Pacientes por Idade">
              <div
                className="h-full w-full"
                role="img"
                aria-label="Gráfico de colunas de pacientes por idade"
              >
                {(() => {
                  const items = (data.patientsByAge ?? [])
                    .slice()
                    .sort((a, b) => a.age - b.age);
                  if (items.length === 0) {
                    return (
                      <span className="text-card-subtext text-sm">
                        Sem dados
                      </span>
                    );
                  }
                  return (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={items}
                        margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="age"
                          tickFormatter={(v) => String(v).padStart(2, "0")}
                          tick={{ fill: "#6b7280", fontSize: 10 }}
                          axisLine={{ stroke: "#e5e7eb" }}
                        />
                        <YAxis
                          allowDecimals={false}
                          tick={{ fill: "#6b7280", fontSize: 10 }}
                          axisLine={{ stroke: "#e5e7eb" }}
                        />
                        <Tooltip
                          cursor={{ fill: "rgba(2, 6, 23, 0.04)" }}
                          labelFormatter={(v) =>
                            `Idade ${String(v).padStart(2, "0")}`
                          }
                          formatter={(value: number) =>
                            [value, "Pacientes"] as [number, string]
                          }
                        />
                        <Bar
                          dataKey="total"
                          fill="#2563eb"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  );
                })()}
              </div>
            </ChartCard>

            <DistributionCard
              title="Distribuição de Exames"
              data={(() => {
                const labels = data.charts.examDistribution.labels;
                const values = data.charts.examDistribution.data;
                const palette = [
                  "#0171be", // Ultrasound (azul)
                  "#fcc730", // Ultrasonic B (amarelo)
                  "#34d399", // MRI (verde)
                  "#f59e0b", // CTU (laranja)
                  "#9ca3af", // MR Urography (cinza)
                  "#8b5cf6", // Fine-needle Aspiration biopsy (roxo)
                ];
                return labels.map((l, i) => ({
                  label: l,
                  value: values[i] ?? 0,
                  color: palette[i % palette.length],
                }));
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
              title="Idade com Mais Pacientes"
              value={(() => {
                const ages = data.patientsByAge ?? [];
                if (ages.length === 0) return "-";
                const maxAge = ages.reduce((max, current) =>
                  current.total > max.total ? current : max
                );
                return `${maxAge.age} anos`;
              })()}
              icon={FaUserMd}
            />
            <StatCard
              title="Categorias de Exames"
              value={data.charts.examDistribution.labels.length}
              icon={MdOutlineMedicalServices}
            />

            <StatCard
              title="Exame Mais Feito"
              value={data.topCategory ?? "-"}
              icon={FaMicroscope}
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
            <ChartCard title="Diagnósticos Mais Frequentes | CID-10">
              <div className="h-full w-full overflow-hidden">
                {(() => {
                  const diagnostics = data.topDiagnostics ?? [];
                  if (diagnostics.length === 0) {
                    return (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-card-subtext text-sm">
                          Sem dados
                        </span>
                      </div>
                    );
                  }

                  const total = diagnostics.reduce(
                    (sum, d) => sum + d.count,
                    0
                  );
                  const colors = [
                    "bg-blue-500",
                    "bg-orange-500",
                    "bg-green-500",
                    "bg-purple-500",
                    "bg-red-500",
                  ];

                  return (
                    <div className="space-y-2 max-h-full overflow-y-auto pr-1">
                      <div className="text-xs text-card-subtext mb-2 pb-2 border-b border-gray-200">
                        Top {diagnostics.length} diagnósticos mais frequentes
                      </div>
                      {diagnostics.map((diag, index) => {
                        const percentage = Math.round(
                          (diag.count / total) * 100
                        );
                        return (
                          <div key={diag.cid10} className="space-y-1 pb-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-card-text truncate flex-1 mr-2">
                                {translateDiagnosisTitle(diag.title)}
                              </span>
                              <span className="text-sm font-semibold text-card-text flex-shrink-0">
                                {percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${colors[index % colors.length]}`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-card-subtext break-words leading-tight block">
                              {diag.cid10}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </ChartCard>

            <ChartCard title="Diagnósticos por Faixa Etária">
              <div className="h-full w-full overflow-hidden">
                {(() => {
                  const ages = (data.diagnosticsByAge ?? [])
                    .slice()
                    .sort((a, b) => b.total - a.total) // ordena por quantidade
                    .slice(0, 6); // pega top 6 idades

                  if (ages.length === 0) {
                    return (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-card-subtext text-sm">
                          Sem dados
                        </span>
                      </div>
                    );
                  }

                  const maxTotal = Math.max(...ages.map((a) => a.total));

                  return (
                    <div className="space-y-2 max-h-full overflow-y-auto pr-1">
                      {ages.map((age) => {
                        const percentage = Math.round(
                          (age.total / maxTotal) * 100
                        );
                        return (
                          <div key={age.age} className="space-y-1 pb-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-card-text truncate flex-1 mr-2">
                                {String(age.age).padStart(2, "0")} anos
                              </span>
                              <span className="text-sm font-semibold text-card-text flex-shrink-0">
                                {age.total}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-green-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </ChartCard>
          </fieldset>
        </section>
      </div>
    </div>
  );
}
