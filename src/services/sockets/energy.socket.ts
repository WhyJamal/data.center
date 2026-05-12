import { BaseSocket } from "./base.socket";
import { DashboardData } from "@/types/dashboard.types";

class EnergySocket extends BaseSocket<DashboardData> {
  connectToDevice(
    deviceId?: string
  ) {
    this.disconnect();

    const url = deviceId
      ? `ws://localhost:8000/ws/data/energy/${deviceId}`
      : "ws://localhost:8000/ws/data/energy";

    this.url = url;
  }
}

export const energySocket = new EnergySocket(
  "ws://localhost:8000/ws/data/energy"
);