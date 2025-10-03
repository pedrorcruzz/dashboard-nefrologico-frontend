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
  KPICard,
  StatCard,
  ChartCard,
  DistributionCard,
} from "../components/cards";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { MdOutlineMedicalServices } from "react-icons/md";
import { FaStethoscope, FaMicroscope, FaUserMd } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend } from "recharts";

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
              icon={FaUserMd}
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
            <ChartCard title="Top Diagnósticos CID-10">
              <div className="h-full w-full" role="img" aria-label="Gráfico dos principais diagnósticos CID-10">
                {(() => {
                  const diagnostics = data.topDiagnostics ?? [];
                  if (diagnostics.length === 0) {
                    return (
                      <span className="text-card-subtext text-sm">Sem dados</span>
                    );
                  }
                  const colors = ["#2563eb", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"];
                  return (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={diagnostics}
                          dataKey="count"
                          nameKey="cid10"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ cid10 }) => cid10}
                        >
                          {diagnostics.map((entry) => (
                            <Cell key={`cell-${entry.cid10}`} fill={colors[diagnostics.indexOf(entry) % colors.length]} />
                          ))}
                        </Pie>
                        <Legend 
                          formatter={(value) => {
                            const diag = diagnostics.find(d => d.cid10 === value);
                            return diag ? `${diag.cid10}: ${diag.title}` : value;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  );
                })()}
              </div>
            </ChartCard>

            <ChartCard title="Diagnósticos por Faixa Etária">
              <div className="h-full w-full" role="img" aria-label="Gráfico de diagnósticos por idade">
                {(() => {
                  const ages = (data.diagnosticsByAge ?? [])
                    .slice()
                    .sort((a, b) => a.age - b.age);
                  if (ages.length === 0) {
                    return (
                      <span className="text-card-subtext text-sm">Sem dados</span>
                    );
                  }
                  return (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ages} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
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
                          labelFormatter={(v) => `Idade ${String(v).padStart(2, "0")}`}
                          formatter={(value: number) => [value, "Diagnósticos"] as [number, string]}
                        />
                        <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
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
