import type { DashboardData } from "@/types/dashboard.types";

export const defaultDashboardData: DashboardData = {
  hr: {
    stats: [
      { label: "Всего сотрудников", value: 0 },
      { label: "Сотрудники на заводе", value: 0 },
    ],
    genderDistribution: [],
    employeesByDepartment: [],
    monthlyEmployees: [],
  },

  production: {
    months: [],
    series: [],
  },
};