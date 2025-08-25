export const useMaintenanceMode = (): boolean => {
	return import.meta.env.VITE_MAINTENANCE_MODE === 'true';
};
