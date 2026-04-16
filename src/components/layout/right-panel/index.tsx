"use client";

import { useSection } from "@/shared/context/SectionContext";
import ShinyBarChartHorizontal from "./shiny-bar-chart-horizontal";

export default function RightPanel() {
  const { selectedSection } = useSection();

  const energyData = {
    current: 1247,
    target: 1500,
    efficiency: 83.1,
  };

  const monthlyData = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 72 },
    { month: "Mar", value: 68 },
    { month: "Apr", value: 85 },
    { month: "May", value: 78 },
    { month: "Jun", value: 92 },
  ];

  const metrics = [
    {
      label: "Power Consumption",
      value: "1,247 kWh",
      trend: "down",
      change: "-3.2%",
    },
    { label: "Water Usage", value: "842 L", trend: "up", change: "+1.8%" },
    { label: "Temperature", value: "22.5°C", trend: "stable", change: "0%" },
    { label: "Humidity", value: "45%", trend: "down", change: "-2.1%" },
  ];

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm p-4 h-full overflow-y-auto border-l border-blue-500/20 custom-scroll">
      <div className="mb-6 mt-16">
        <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500"></div>
          Energy Management Room
        </h2>
        {selectedSection?.cameras && selectedSection.cameras.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-white mb-2">Cameras</h4>
            <div className="flex flex-col items-center gap-2 overflow-y-auto max-h-96 custom-scroll">
              {selectedSection.cameras.map((link, index) => (
                <video
                  key={index}
                  src={link}
                  className="w-full h-48 rounded-lg border border-blue-500/30 object-cover"
                  autoPlay
                  muted
                  loop
                />
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 ml-3">
          Real-time monitoring and analytics
        </p>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-amber-500/20">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#1e293b"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="8"
                strokeDasharray={`${
                  (energyData.current / energyData.target) * 251.2
                } 251.2`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-amber-400">
                {energyData.efficiency}%
              </div>
              <div className="text-xs text-gray-400">Efficiency</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <div>
            <p className="text-gray-400">Current</p>
            <p className="text-white font-semibold">{energyData.current} kWh</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">Target</p>
            <p className="text-white font-semibold">{energyData.target} kWh</p>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 space-x-6">
        <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-blue-500/20">
          <h3 className="text-sm font-semibold text-blue-300 mb-3">
            Monthly Statistics
          </h3>
          <div className="flex items-end justify-between h-32 gap-2">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-slate-700 rounded-t relative"
                  style={{ height: `${item.value}%` }}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-amber-500 to-amber-300 rounded-t"></div>
                </div>
                <span className="text-xs text-gray-400 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div> */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-blue-500/20">
          <ShinyBarChartHorizontal />
        </div>
      {/* </div> */}

      <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-blue-500/20">
        <h3 className="text-sm font-semibold text-blue-300 mb-3">
          Real-time Metrics
        </h3>
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-slate-700/50 last:border-0"
            >
              <div>
                <p className="text-xs text-gray-300">{metric.label}</p>
                <p className="text-sm font-bold text-white">{metric.value}</p>
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${
                  metric.trend === "down"
                    ? "text-green-400"
                    : metric.trend === "up"
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                {metric.trend === "down" && "↓"}
                {metric.trend === "up" && "↑"}
                {metric.trend === "stable" && "→"}
                <span>{metric.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
        <h3 className="text-sm font-semibold text-blue-300 mb-3">
          Equipment Status
        </h3>
        <div className="space-y-2">
          {["HVAC System", "Lighting", "Ventilation", "Backup Power"].map(
            (equipment, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-gray-300">{equipment}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Online</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-xs">i</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-300">System Update</p>
            <p className="text-xs text-blue-200 mt-1">
              Energy optimization complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
