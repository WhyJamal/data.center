import { BaseSocket } from "./base.socket";
import { DashboardData } from "@/types/dashboard.types";

export const onecSocket = new BaseSocket<DashboardData>(
  "ws://localhost:8000/ws/dashboard/data"
);