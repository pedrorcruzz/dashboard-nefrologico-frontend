import { motion } from "motion/react";

interface CircularProgressData {
  label: string;
  value: number;
  total: number;
  color: string;
}

interface CircularProgressCardProps {
  title: string;
  data: CircularProgressData[];
  maxItems?: number;
  className?: string;
}

export const CircularProgressCard = ({
  title,
  data,
  maxItems = 5,
  className = "",
}: CircularProgressCardProps) => {
  const cardId = title.replace(/\s+/g, "-").toLowerCase();

  const processedData = data
    .slice()
    .sort((a, b) => b.value - a.value)
    .slice(0, maxItems);

  const colors = [
    "stroke-blue-500",
    "stroke-green-500",
    "stroke-purple-500",
    "stroke-orange-500",
    "stroke-red-500",
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`bg-card-background rounded-lg p-6 border border-card-line/40 ${className}`}
      aria-labelledby={`circular-progress-${cardId}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
        <h3
          id={`circular-progress-${cardId}`}
          className="text-card-text text-lg font-semibold"
        >
          {title}
        </h3>
      </div>

      <div className="h-64 overflow-hidden">
        {processedData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-card-subtext text-sm">Sem dados</span>
          </div>
        ) : (
          <div className="space-y-2 max-h-full overflow-y-auto pr-1">
            <div className="text-xs text-card-subtext mb-2 pb-2 border-b border-gray-200">
              Top {processedData.length} idades com mais diagnósticos
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-2">
              {processedData.map((item, index) => {
                const circumference = 2 * Math.PI * 45; // raio 45 para círculo maior
                const strokeDasharray = circumference;
                const strokeDashoffset = 0; // círculo completo (100%)

                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="relative">
                      <svg
                        className="w-28 h-28 transform -rotate-90"
                        role="img"
                        aria-label={`Diagnósticos para ${item.label}`}
                      >
                        <circle
                          cx="56"
                          cy="56"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-gray-200"
                        />
                        <circle
                          cx="56"
                          cy="56"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className={colors[index % colors.length]}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-semibold text-card-text">
                          {item.total}
                        </span>
                        <span className="text-xs text-card-subtext leading-tight">
                          diagnósticos
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-card-text">
                        {item.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};
