import si from "systeminformation";
import { NextResponse } from "next/server";

export async function GET() {
  const cpuTemp = await si.cpuTemperature();
  const load = await si.currentLoad();
  const mem = await si.mem();

  return NextResponse.json({
    cpuTemp: cpuTemp.main,
    cpuUsage: load.currentLoad,
    ramUsage: ((mem.used / mem.total) * 100).toFixed(1),
  });
}