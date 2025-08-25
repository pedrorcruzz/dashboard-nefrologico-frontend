export interface SystemData {
  totalPatients: number;
  activePatients: number;
  newPatientsThisMonth: number;
  totalExams: number;

  kpis: {
    totalPatrimony: {
      value: number;
      change: number;
      changeType: "increase" | "decrease";
      investedValue: number;
    };
    totalProfit: {
      value: number;
      capitalGain: number;
      dividends: number;
    };
    examsPerMonth: {
      value: number;
      total: number;
    };
    patientVariation: {
      variation: number;
      change: number;
      profitability: number;
    };
  };

  charts: {
    patientEvolution: {
      labels: string[];
      data: {
        appliedValue: number[];
        capitalGain: number[];
      };
    };
    examDistribution: {
      labels: string[];
      data: number[];
    };
  };
}

export const useSystemData = (): SystemData => {
  const mockData: SystemData = {
    totalPatients: 156,
    activePatients: 142,
    newPatientsThisMonth: 8,
    totalExams: 1247,

    kpis: {
      totalPatrimony: {
        value: 8653.82,
        change: 1.2,
        changeType: "increase",
        investedValue: 8592.29,
      },
      totalProfit: {
        value: 84.27,
        capitalGain: 61.53,
        dividends: 22.74,
      },
      examsPerMonth: {
        value: 22.74,
        total: 22.74,
      },
      patientVariation: {
        variation: 0.72,
        change: 61.53,
        profitability: 0.49,
      },
    },

    charts: {
      patientEvolution: {
        labels: ["07/25", "08/25"],
        data: {
          appliedValue: [8200, 8653],
          capitalGain: [0, 453],
        },
      },
      examDistribution: {
        labels: ["Exames Básicos", "Exames Especializados"],
        data: [84.96, 15.04],
      },
    },
  };

  return mockData;
};
