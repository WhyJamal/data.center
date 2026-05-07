import { THRData } from "./hr.types";
import { TProductionData } from "./production.types";

export type DashboardData = {
  hr: THRData;
  production: TProductionData;
};