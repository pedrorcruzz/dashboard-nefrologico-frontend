import { createFileRoute } from '@tanstack/react-router';
import { useSystemData } from '../hooks/useSystemData';
import {
	KPICard,
	StatCard,
	ChartCard,
	DistributionCard,
	MetricCard,
} from '../components/cards';
import {
	AiOutlineUser,
	AiOutlineBarChart,
	AiOutlineEye,
	AiOutlineWallet,
} from 'react-icons/ai';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	const data = useSystemData();

	return (
		<div className='min-h-screen bg-background-primary pb-12 md:pb-20'>
			<div className='w-full space-y-4 px-2 md:px-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					<KPICard
						title='Total de Pacientes'
						value={data.totalPatients.toLocaleString()}
						subtitle={`${data.activePatients} ativos este mês`}
						change={{
							value: data.kpis.patientVariation.variation,
							type:
								data.kpis.patientVariation.variation > 0
									? 'increase'
									: 'decrease',
						}}
						icon={AiOutlineUser}
					/>

					<KPICard
						title='Total de Exames'
						value={data.totalExams.toLocaleString()}
						subtitle={`${data.kpis.examsPerMonth.value} este mês`}
						icon={AiOutlineBarChart}
					/>

					<KPICard
						title='Novos Pacientes'
						value={data.newPatientsThisMonth}
						subtitle='Este mês'
						icon={AiOutlineEye}
					/>

					<KPICard
						title='Taxa de Retenção'
						value={`${((data.activePatients / data.totalPatients) * 100).toFixed(1)}%`}
						subtitle='Pacientes ativos'
						icon={AiOutlineWallet}
					/>
				</div>

				{/* Gráficos */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					<ChartCard title='Evolução de Pacientes'>
						<div className='h-full flex items-center justify-center'>
							<div className='text-center'>
								<div className='text-card-subtext text-sm mb-4'>
									Gráfico de evolução dos pacientes ao longo do tempo
								</div>
								<div className='space-y-2'>
									{data.charts.patientEvolution.labels.map((label, index) => (
										<div key={index} className='flex items-center space-x-4'>
											<span className='text-card-text text-sm w-16'>
												{label}
											</span>
											<div className='flex-1 bg-card-tertiary rounded-full h-4 flex'>
												<div
													className='h-4 bg-card-items rounded-l-full'
													style={{
														width: `${(data.charts.patientEvolution.data.appliedValue[index] / 10000) * 100}%`,
													}}
												/>
												<div
													className='h-4 bg-card-items-bar rounded-r-full'
													style={{
														width: `${((10000 - data.charts.patientEvolution.data.appliedValue[index]) / 10000) * 100}%`,
													}}
												/>
											</div>
											<span className='text-card-text text-sm w-16 text-right'>
												{data.charts.patientEvolution.data.appliedValue[index]}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</ChartCard>

					<DistributionCard
						title='Distribuição de Exames'
						data={[
							{
								label: 'Exames Básicos',
								value: data.charts.examDistribution.data[0],
								color: '#0171be',
							},
							{
								label: 'Exames Especializados',
								value: data.charts.examDistribution.data[1],
								color: '#fcc730',
							},
						]}
					/>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<StatCard
						title='Pacientes em Tratamento'
						value={data.activePatients}
						icon={AiOutlineUser}
					/>

					<StatCard
						title='Exames Pendentes'
						value={Math.floor(data.totalExams * 0.15)}
						icon={AiOutlineBarChart}
					/>

					<StatCard title='Taxa de Sucesso' value='94.2%' icon={AiOutlineEye} />
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<MetricCard
						title='Tempo Médio de Atendimento'
						value='25 min'
						change={{ value: -8, from: 'last month' }}
						showGraph={true}
						graphData={[32, 30, 28, 27, 26, 25, 24, 25]}
					/>

					<MetricCard
						title='Satisfação do Paciente'
						value='4.8/5.0'
						change={{ value: 5, from: 'last month' }}
						showGraph={true}
						graphData={[4.2, 4.3, 4.5, 4.6, 4.7, 4.8, 4.8, 4.8]}
					/>
				</div>
			</div>
		</div>
	);
}
