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
    weeklyProductionOutput: {
      week: "",
      items: [],
    },
    yearlySales: {
      months: [],
      series: [],
    },
    productionOutput: [],
  },
  energy: {
    "success": true,
    "devices": [{ "device_id": "", "used_kwh": 0 }],
    "total_used_kwh": 0,
    "total_sum": 0,

    "yesterday_used": 0,
    "yesterday_sum": 0,
    "monthly_used": 0,
    "monthly_sum": 0,
    "yearly_used": 0,
    "yearly_sum": 0,
  }
};