import { motion } from 'motion/react';
import { FilterCards } from './FilterCards';

interface ChartCardProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

export const ChartCard = ({
	title,
	children,
	className = '',
}: ChartCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.2 }}
			className={`bg-card-background rounded-lg p-6 border border-card-line/40 ${className}`}
		>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4'>
				<h3 className='text-card-text text-lg font-semibold'>{title}</h3>
				<FilterCards />
			</div>

			<div className='h-64'>{children}</div>
		</motion.div>
	);
};
