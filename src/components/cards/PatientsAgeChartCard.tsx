import { motion } from "motion/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface AgeData {
  age: number;
  total: number;
}

interface PatientsAgeChartCardProps {
  title: string;
  data: AgeData[];
  className?: string;
}

export const PatientsAgeChartCard = ({
  title,
  data,
  className = "",
}: PatientsAgeChartCardProps) => {
  const cardId = title.replace(/\s+/g, "-").toLowerCase();

  const sortedData = data.slice().sort((a, b) => a.age - b.age);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`bg-card-background rounded-lg p-6 border border-card-line/40 ${className}`}
      aria-labelledby={`patients-age-chart-${cardId}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
        <h3
          id={`patients-age-chart-${cardId}`}
          className="text-card-text text-lg font-semibold"
        >
          {title}
        </h3>
      </div>

      <div
        className="h-64"
        role="img"
        aria-label={`Gráfico de colunas de ${title}`}
      >
        {sortedData.length === 0 ? (
          <span className="text-card-subtext text-sm">Sem dados</span>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
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
                labelFormatter={(v) => `Idade ${String(v).padStart(2, "0")}`}
                formatter={(value: number) =>
                  [value, "Pacientes"] as [number, string]
                }
              />
              <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.section>
  );
};
