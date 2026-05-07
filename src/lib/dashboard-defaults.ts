import type { DashboardData } from "@/types/dashboard.types";

export const defaultDashboardData: DashboardData = {
  hr: {
    stats: [
      { label: "Всего сотрудников", value: 0 },
      { label: "Сотрудники на заводе", value: 0 },
    ],
    genderDistribution: [
      { label: "Мужчины", value: 12 },
      { label: "Женщины", value: 122 },
    ],
    employeesByDepartment: [{label: "Мужчины", value: 29}, {label: "Мужчиныc", value: 124},{label: "Мужчиныq", value: 132},{label: "Мужчиныw", value: 212},{label: "Мужчиныjk", value: 132},],
    monthlyEmployees: [{month: "Мужчины", value: 29},{month: "Мужч2ины", value: 29},{month: "Мужwчины", value: 29},{month: "Мужчwинeы", value: 29}, {month: "Мужrчины", value: 12}],
  },

  production: {
    months: [],
    series: [],
  },
};