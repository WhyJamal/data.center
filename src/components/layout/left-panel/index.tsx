'use client';

import PieArcLabel from "./pai-arc-label";
import TickPlacementBars from "./tick-placement-bars";
import { HRStatCards } from "./hr-stat-cards";
import { useDashboardData } from "@/app/context/DashboardDataContext";
import { Loading } from "@/components/loading-dot";

export default function LeftPanel() {
  const { data, loading } = useDashboardData();

  if (loading) return (
    <div className="bg-slate-900/50 backdrop-blur-sm h-full overflow-y-auto border-r border-blue-500/20 custom-scroll">
      <div className="flex rounded w-full items-center justify-center mt-16">
        <Loading />
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm h-full overflow-y-auto border-r border-blue-500/20 custom-scroll">

      <div className="flex rounded w-full items-center justify-center mt-16 mb-2">
        <HRStatCards data={data.stats} />
      </div>

      <div className="flex bg-slate-800/50 rounded py-2 mb-2 border border-blue-500/20">

        <div className="flex flex-col items-center flex-1">
          <span className="text-[10px] text-slate-400 mb-1 tracking-wide">
            Гендерное распределение
          </span>
          <PieArcLabel data={data.genderDistribution} hideLegend />
        </div>

        <div className="flex flex-col items-center flex-1">
          <span className="text-[10px] text-slate-400 mb-1 tracking-wide">
            Штат по отделам
          </span>
          <PieArcLabel data={data.employeesByDepartment} hideLegend />
        </div>

      </div>

      <div className="flex bg-slate-800/50 rounded border border-blue-500/20 items-center justify-center">
        <TickPlacementBars data={data.monthlyEmployees} />
      </div>
    </div>
  );
}