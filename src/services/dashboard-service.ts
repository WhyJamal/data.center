import { getData } from "@/lib/requests";
import type { DashboardData } from "@/types/dashboard.types";

class DashboardService {
  async getDashboard(): Promise<DashboardData> {
    return getData<DashboardData>("/hr/data");
  }
}

export const dashboardService = new DashboardService();