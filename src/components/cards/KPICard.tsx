import { motion } from 'motion/react';
import { Status } from '../Status';

interface KPICardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	change?: {
		value: number;
		type: 'increase' | 'decrease';
	};
	icon: React.ComponentType<{ className?: string }>;
	className?: string;
}

export const KPICard = ({
	title,
	value,
	subtitle,
	change,
	icon: Icon,
	className = '',
}: KPICardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className={`bg-card-background rounded-lg p-4 border border-card-line/40 ${className}`}
		>
			<div className='flex items-center justify-between mb-3'>
				<div className='w-10 h-10 bg-card-items/20 rounded-lg flex items-center justify-center'>
					<Icon className='w-5 h-5 text-card-items' />
				</div>
				{change && (
					<Status type={change.type} value={change.value} className='text-xs' />
				)}
			</div>

			<div className='mb-2'>
				<h3 className='text-card-text text-sm font-medium mb-1'>{title}</h3>
				<p className='text-card-text text-2xl font-bold'>{value}</p>
			</div>

			{subtitle && <p className='text-card-subtext text-xs'>{subtitle}</p>}
		</motion.div>
	);
};
