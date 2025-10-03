import { motion } from "motion/react";
import { FilterCards } from "./FilterCards";

interface DistributionCardProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  className?: string;
}

export const DistributionCard = ({
  title,
  data,
  className = "",
}: DistributionCardProps) => {
  const cardId = title.replace(/\s+/g, "-").toLowerCase();
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className={`bg-card-background rounded-lg p-6 border border-card-line/40 ${className}`}
      aria-labelledby={`distribution-${cardId}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
        <h3
          id={`distribution-${cardId}`}
          className="text-card-text text-lg font-semibold"
        >
          {title}
        </h3>
        <FilterCards />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
        <div
          className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 bg-card-tertiary rounded-full flex items-center justify-center"
          role="img"
          aria-label={`Total: ${totalValue.toFixed(1)}%`}
        >
          <span className="text-card-tertiary-text text-2xl sm:text-3xl lg:text-3xl font-bold">
            {totalValue.toFixed(1)}%
          </span>
        </div>

        <ul
          className="space-y-2 sm:space-y-3"
          aria-label="Distribuição por categoria"
        >
          {data.map((item, index) => (
            <li
              key={`distribution-item-${item.label}-${index}`}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className="text-card-text text-xs sm:text-sm font-medium">
                {item.label}
              </span>
              <span className="text-card-subtext text-xs sm:text-sm font-semibold">
                {item.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};
