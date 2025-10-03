import { motion } from "motion/react";
import { translateDiagnosisTitle } from "../../utils/translations";

interface DiagnosticItem {
  cid10: string;
  title: string;
  count: number;
}

interface DiagnosticsListCardProps {
  title: string;
  data: DiagnosticItem[];
  className?: string;
}

export const DiagnosticsListCard = ({
  title,
  data,
  className = "",
}: DiagnosticsListCardProps) => {
  const cardId = title.replace(/\s+/g, "-").toLowerCase();

  const total = data.reduce((sum, d) => sum + d.count, 0);
  const colors = [
    "bg-blue-500",
    "bg-orange-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`bg-card-background rounded-lg p-6 border border-card-line/40 ${className}`}
      aria-labelledby={`diagnostics-list-${cardId}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
        <h3
          id={`diagnostics-list-${cardId}`}
          className="text-card-text text-lg font-semibold"
        >
          {title}
        </h3>
      </div>

      <div className="h-64 overflow-hidden">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-card-subtext text-sm">Sem dados</span>
          </div>
        ) : (
          <div className="space-y-2 max-h-full overflow-y-auto pr-1">
            <div className="text-xs text-card-subtext mb-2 pb-2 border-b border-gray-200">
              Top {data.length} diagnósticos mais frequentes
            </div>
            {data.map((diag, index) => {
              const percentage = Math.round((diag.count / total) * 100);
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
        )}
      </div>
    </motion.section>
  );
};
