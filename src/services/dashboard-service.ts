import { getData } from "@/lib/requests-1c";
import { getFastData } from "@/lib/requests-fast";
import { DashboardData } from "@/types/dashboard.types";
import { THRData } from "@/types/hr.types";
import { TProductionData } from "@/types/production.types";

class DashboardService {
  async getDashboard(): Promise<DashboardData> {
    const [hr, production] = await Promise.all([
      getData<THRData>("v1/hr/data"),
      getData<TProductionData>("v1/production/data"),
      //getFastData<{ total_users: number }>("api/timesheet/present-employees"),
    ]);

    const hrStats = [...hr.stats];

    // const totalUsers = Array.isArray(timesheetRes)
    //   ? timesheetRes[0]?.total_users ?? 0
    //   : timesheetRes?.total_users ?? 0;

    // hrStats.push({
    //   label: "Сотрудники на заводе",
    //   value: totalUsers
    // });

    return {
      hr: {
        ...hr,
        stats: hrStats,
      },
      production,
    };
  }
}

export const dashboardService = new DashboardService();