"use client";

import { useSection } from "@/shared/context/SectionContext";
import PieChartWithCustomizedLabel from "./pai-chart";
import ProductionLines from "./production-lines";

export default function LeftPanel() {
  const { selectedSection } = useSection();

  const qualityData = [
    { label: "Product Quality", value: "98.5%", status: "good" },
    { label: "Equipment Efficiency", value: "94.2%", status: "good" },
    { label: "Process Compliance", value: "97.8%", status: "good" },
    { label: "Safety Score", value: "99.1%", status: "excellent" },
  ];

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm p-2 h-full overflow-y-auto border-r border-blue-500/20 custom-scroll">
      <div className="mb-2 mt-16">
        <h2 className="text-[10px] font-bold text-white mb-2 flex items-center gap-1">
          <div className="w-0.5 h-4 bg-blue-500"></div>
          Quality Inspection and Security Information
        </h2>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-1.5 mb-2 border border-blue-500/20">
        <PieChartWithCustomizedLabel />
      </div>

      <div className="bg-slate-800/50 rounded-lg p-2 mb-2 border border-blue-500/20">
        <h2 className="text-[10px] font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 flex items-center gap-1">
          <span className="w-1 h-4 bg-blue-500 rounded-full" />
          Quality Metrics
        </h2>
        <div className="space-y-1">
          {qualityData.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-[10px] text-gray-300">{item.label}</span>
              <span className={`text-[10px] font-bold ${item.status === "excellent" ? "text-green-400" : "text-blue-400"}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ProductionLines />

      <div className="space-y-2 mt-2">
        <div className="bg-slate-800/50 border-blue-500/20 rounded-lg p-2 border shadow-lg">
          <h2 className="text-[10px] font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 flex items-center gap-1">
            <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
            Pioneer Demonstration
          </h2>

          <div className="grid grid-cols-1 gap-1.5">
            {[
              { initials: "ZW" },
              { initials: "HZ" },
              { initials: "LH" },
            ].map(({ initials }) => (
              <div key={initials} className="bg-slate-800/60 rounded p-2 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30 shrink-0">
                    <span className="text-blue-400 text-[9px] font-bold">{initials}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[10px] font-semibold text-white truncate">Advanced Star</h3>
                    <p className="text-[9px] text-blue-400 truncate">name name</p>
                  </div>
                  <div className="text-[9px] text-slate-400 flex items-center gap-1 ml-auto shrink-0">
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    Active
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-2 border border-blue-500/20 shadow-lg">
          <h2 className="text-[10px] font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 flex items-center gap-1">
            <span className="w-1 h-4 bg-blue-500 rounded-full" />
            Work status of each group
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800/80 border-b border-blue-500/30">
                  <th className="px-1.5 py-1 text-left text-[9px] font-semibold text-blue-300 w-6">#</th>
                  <th className="px-1.5 py-1 text-left text-[9px] font-semibold text-blue-300 w-16">Name</th>
                  <th className="px-1.5 py-1 text-left text-[9px] font-semibold text-blue-300">Note</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors">
                  <td className="px-1.5 py-1 text-[9px] text-slate-300">1</td>
                  <td className="px-1.5 py-1 text-[9px] font-medium text-white leading-tight">Electrical Group 3</td>
                  <td className="px-1.5 py-1 text-[9px] text-slate-400 leading-tight">
                    153 control cabinets for Indian Railways & Algerian projects completed in November.
                  </td>
                </tr>
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors">
                  <td className="px-1.5 py-1 text-[9px] text-slate-300">2</td>
                  <td className="px-1.5 py-1 text-[9px] font-medium text-white leading-tight">Guo Yingjun Assembly</td>
                  <td className="px-1.5 py-1 text-[9px] text-slate-400 leading-tight">
                    7 fixed ball tables & belt roller conveyors for Qinghangdao Yushu Vacuum Project completed.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-2 flex items-center justify-end gap-3 text-[9px] text-slate-500 border-t border-slate-800 pt-2">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              Total: 2
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              Done: 2/2
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 bg-red-900/20 border border-red-500/30 rounded-lg p-2">
        <div className="flex items-start gap-1.5">
          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-[9px]">!</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-red-300">Maintenance Alert</p>
            <p className="text-[9px] text-red-200 mt-0.5">Line E scheduled for maintenance</p>
          </div>
        </div>
      </div>
    </div>
  );
}