export type THRStatItem = {
  label: string;
  value: number;
};

export type TChartItem = {
  label: string;
  value: number;
};

export type THRData = {
  stats: THRStatItem[];

  genderDistribution: TChartItem[];

  employeesByDepartment: TChartItem[];

  monthlyEmployees: {
    month: string;
    value: number;
  }[];
};