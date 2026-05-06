import { THRStatItem } from "./hr.types";

export type ChartItem = {
  label: string;
  value: number;
};

export type DashboardData = {
  stats: THRStatItem[];
  genderDistribution: ChartItem[];
  employeesByDepartment: ChartItem[];
  monthlyEmployees: {
    month: string;
    value: number;
  }[];
};