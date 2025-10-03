import { motion } from "motion/react";
import { useState } from "react";
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
  // valores já chegam em porcentagem; somatório pode não ser exatamente 100 devido a arredondamento
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    text: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

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
        {/* Donut chart */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 relative">
          {(() => {
            const size = 160; // viewBox
            const center = size / 2;
            const radius = 60;
            const stroke = 28;
            const circumference = 2 * Math.PI * radius;
            const total = data.reduce((s, d) => s + d.value, 0) || 1;
            let offsetAcc = 0;
            return (
              <svg
                viewBox={`0 0 ${size} ${size}`}
                role="img"
                aria-label={`Gráfico de pizza de distribuição de exames`}
                onMouseLeave={() =>
                  setTooltip({ visible: false, x: 0, y: 0, text: "" })
                }
              >
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth={stroke}
                />
                {data.map((seg, idx) => {
                  const portion = (seg.value / total) * circumference;
                  // largura mínima bem pequena para fatias minúsculas sem formar círculo
                  const portionUsed = portion < 0.5 ? 0.5 : portion;
                  const dasharray = `${portionUsed} ${circumference - portionUsed}`;
                  const dashoffset = circumference - offsetAcc;
                  offsetAcc += portionUsed;
                  // no-op: kept previously for rounded caps; not needed now
                  return (
                    <g
                      key={`pie-${seg.label}-${idx}`}
                      onPointerMove={(e) => {
                        const rect = (
                          e.currentTarget.ownerSVGElement as SVGSVGElement
                        ).getBoundingClientRect();
                        setTooltip({
                          visible: true,
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                          text: `${seg.label}: ${seg.value}%`,
                        });
                      }}
                    >
                      <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={stroke}
                        strokeDasharray={dasharray}
                        strokeDashoffset={dashoffset}
                        strokeLinecap="butt"
                        transform={`rotate(-90 ${center} ${center})`}
                      />
                      {/* sem marcador extra para não parecer um círculo grande */}
                    </g>
                  );
                })}
              </svg>
            );
          })()}
          {tooltip.visible && (
            <div
              className="absolute px-2 py-1 text-xs bg-white border border-card-line/40 rounded shadow"
              style={{
                left: tooltip.x + 8,
                top: tooltip.y + 8,
                pointerEvents: "none",
              }}
              role="tooltip"
            >
              {tooltip.text}
            </div>
          )}
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
