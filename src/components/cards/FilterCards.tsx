import { AiOutlineCalendar, AiOutlineWallet } from 'react-icons/ai';

interface FilterCardsProps {
	className?: string;
}

export const FilterCards = ({ className = '' }: FilterCardsProps) => {
	return (
		<div className={`flex flex-row items-center gap-2 ${className}`}>
			<div className='flex items-center space-x-1 sm:space-x-2 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-card-tertiary/20 rounded-md sm:rounded-lg border border-card-line/40'>
				<AiOutlineCalendar className='w-2.5 h-2.5 sm:w-4 sm:h-4 text-card-secondary' />
				<span className='text-xs sm:text-sm text-card-text whitespace-nowrap'>
					12 Meses
				</span>
			</div>
			<div className='flex items-center space-x-1 sm:space-x-2 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-card-tertiary/20 rounded-md sm:rounded-lg border border-card-line/40'>
				<AiOutlineWallet className='w-2.5 h-2.5 sm:w-4 sm:h-4 text-card-secondary' />
				<span className='text-xs sm:text-sm text-card-text whitespace-nowrap'>
					Todos os tipos
				</span>
			</div>
		</div>
	);
};
