import { motion } from 'motion/react';
import {
	AiOutlineCheckCircle,
	AiOutlineCloseCircle,
	AiOutlineExclamationCircle,
	AiOutlineInfoCircle,
	AiOutlineArrowUp,
	AiOutlineArrowDown,
} from 'react-icons/ai';

export type StatusType =
	| 'success'
	| 'error'
	| 'warning'
	| 'info'
	| 'increase'
	| 'decrease';

interface StatusProps {
	type: StatusType;
	value?: string | number;
	showIcon?: boolean;
	className?: string;
}

export const Status = ({
	type,
	value,
	showIcon = true,
	className = '',
}: StatusProps) => {
	const getStatusConfig = () => {
		switch (type) {
			case 'success':
				return {
					icon: AiOutlineCheckCircle,
					color: 'text-status-success',
					bgColor: 'bg-status-success/10',
					borderColor: 'border-status-success/20',
				};
			case 'error':
				return {
					icon: AiOutlineCloseCircle,
					color: 'text-status-error',
					bgColor: 'bg-status-error/10',
					borderColor: 'border-status-error/20',
				};
			case 'warning':
				return {
					icon: AiOutlineExclamationCircle,
					color: 'text-status-warning',
					bgColor: 'bg-status-warning/10',
					borderColor: 'border-status-warning/20',
				};
			case 'info':
				return {
					icon: AiOutlineInfoCircle,
					color: 'text-status-info',
					bgColor: 'bg-status-info/10',
					borderColor: 'border-status-info/20',
				};
			case 'increase':
				return {
					icon: AiOutlineArrowUp,
					color: 'text-status-success',
					bgColor: 'bg-status-success/10',
					borderColor: 'border-status-success/20',
				};
			case 'decrease':
				return {
					icon: AiOutlineArrowDown,
					color: 'text-status-error',
					bgColor: 'bg-status-error/10',
					borderColor: 'border-status-error/20',
				};
			default:
				return {
					icon: AiOutlineInfoCircle,
					color: 'text-status-info',
					bgColor: 'bg-status-info/10',
					borderColor: 'border-status-info/20',
				};
		}
	};

	const config = getStatusConfig();
	const IconComponent = config.icon;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.2 }}
			className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md border ${config.bgColor} ${config.borderColor} ${className}`}
		>
			{showIcon && <IconComponent className={`w-3 h-3 ${config.color}`} />}
			{value && (
				<span className={`text-xs font-medium ${config.color}`}>
					{type === 'increase' && '+'}
					{value}
					{type === 'increase' || type === 'decrease' ? '%' : ''}
				</span>
			)}
		</motion.div>
	);
};
