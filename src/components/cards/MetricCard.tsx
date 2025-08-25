import { motion } from 'motion/react';

interface MetricCardProps {
	title: string;
	value: string | number;
	change?: {
		value: number;
		from: string;
	};
	showGraph?: boolean;
	graphData?: number[];
	className?: string;
}

export const MetricCard = ({
	title,
	value,
	change,
	showGraph = false,
	graphData = [],
	className = '',
}: MetricCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.4 }}
			className={`bg-card-background rounded-lg p-6 border border-card-line/40 ${className}`}
		>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-card-text text-sm font-medium'>{title}</h3>
				{change && (
					<span className='text-card-subtext text-xs'>
						+{change.value}% from {change.from}
					</span>
				)}
			</div>

			<div className='mb-6'>
				<p className='text-card-text text-3xl font-bold'>{value}</p>
			</div>

			{showGraph && graphData.length > 0 && (
				<div className='h-20 flex items-end space-x-1'>
					{graphData.map((value, index) => (
						<div
							key={index}
							className='flex-1 bg-card-items-bar rounded-t relative group cursor-pointer'
							style={{ height: `${(value / Math.max(...graphData)) * 100}%` }}
						>
							{/* Tooltip */}
							<div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-card-text text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 border border-card-line/40'>
								{value}
								{/* Seta do tooltip */}
								<div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white'></div>
							</div>
						</div>
					))}
				</div>
			)}
		</motion.div>
	);
};
