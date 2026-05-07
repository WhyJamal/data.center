import type { DashboardData } from "@/types/dashboard.types";

export const defaultDashboardData: DashboardData = {
  hr: {
    stats: [
      { label: "Всего сотрудников", value: 0 },
      { label: "Сотрудники на заводе", value: 0 },
    ],
    genderDistribution: [
      { label: "Мужчины", value: 0 },
      { label: "Женщины", value: 0 },
    ],
    employeesByDepartment: [],
    monthlyEmployees: [],
  },

  production: {
    months: [],
    series: [],
  },
};