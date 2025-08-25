import { AiOutlineTool, AiOutlineClockCircle } from 'react-icons/ai';

export const MaintenanceMode = () => {
	return (
		<div className='min-h-screen bg-background-primary flex items-center justify-center p-4'>
			<div className='max-w-lg w-full text-center space-y-6'>
				<div className='flex justify-center'>
					<img
						src='/cesmac-logo.png'
						alt='CESMAC Centro Universitário'
						className='h-20 lg:h-24'
					/>
				</div>

				<div className='flex justify-center'>
					<div className='w-24 h-24 bg-card-secondary/20 rounded-full flex items-center justify-center'>
						<AiOutlineTool className='w-12 h-12 text-card-secondary' />
					</div>
				</div>

				<div className='space-y-3'>
					<h1 className='text-3xl lg:text-4xl font-bold text-card-text'>
						Sistema em Manutenção
					</h1>
					<p className='text-card-subtext text-lg'>
						Estamos realizando melhorias no sistema para oferecer uma
						experiência ainda melhor.
					</p>
				</div>

				<div className='flex items-center justify-center gap-2 text-card-subtext'>
					<AiOutlineClockCircle className='w-5 h-5' />
					<span className='text-sm'>Voltaremos em breve</span>
				</div>

				<div className='bg-card-background/50 rounded-lg p-4 border border-card-line/40'>
					<p className='text-card-subtext text-sm'>
						Agradecemos sua compreensão. Em caso de urgência, entre em contato
						com o suporte técnico.
					</p>
				</div>
			</div>
		</div>
	);
};
