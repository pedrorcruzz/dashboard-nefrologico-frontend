import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  className = "",
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`bg-card-background rounded-lg p-4 border border-card-line/40 ${className}`}
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-card-secondary/20 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-card-secondary" />
        </div>
        <div>
          <h3 className="text-card-text text-sm font-medium">{title}</h3>
          <p className="text-card-text text-lg font-semibold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};
