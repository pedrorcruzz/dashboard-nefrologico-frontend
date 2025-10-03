import { createFileRoute } from "@tanstack/react-router";
import { useId } from "react";
import { useSystemData } from "../hooks/useSystemData";
import { formatNumberWithDot } from "../utils/translations";
import {
  KPICard,
  StatCard,
  DistributionCard,
  CircularProgressCard,
  DiagnosticsListCard,
  PatientsAgeChartCard,
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
            <PatientsAgeChartCard
              title="Pacientes por Idade"
              data={data.patientsByAge ?? []}
            />

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
            <DiagnosticsListCard
              title="Diagnósticos Mais Frequentes | CID-10"
              data={data.topDiagnostics ?? []}
            />

            <CircularProgressCard
              title="Diagnósticos por Faixa Etária"
              data={(data.diagnosticsByAge ?? []).map((age) => ({
                label: `${age.age} ${age.age === 0 || age.age === 1 ? "ano" : "anos"}`,
                value: age.total,
                total: age.total,
                color: "",
              }))}
              maxItems={20}
            />
          </fieldset>
        </section>
      </div>
    </div>
  );
}
