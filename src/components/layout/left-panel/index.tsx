'use client';

import PieArcLabel from "./pai-arc-label";
// import TickPlacementBars from "./tick-placement-bars";
import { HRStatCards } from "./hr-stat-cards";
import { useDashboardData } from "@/app/context/DashboardDataContext";
import { Loading } from "@/components/loading-dot";
import SystemChart from "./system-chart";
import BarsChart from "./bar-chart";
import ProductionCard from "./production-card";
import MultiYearLineChart from "./line-pointer";

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

      {/* <iframe
        src="http://localhost:1984/stream.html?src=cam1"
        className="mt-16 mb-2 overflow-hidden"
        allowFullScreen
      /> */}

      <div className="flex rounded w-full items-center justify-center mt-16 mb-2">
        <HRStatCards data={data.hr.stats} />
      </div>

      <div className="flex bg-slate-800/50 rounded py-2 mb-2 border border-blue-500/20">

        <div className="flex flex-col items-center flex-1">
          <span className="text-[10px] text-slate-400 mb-1 tracking-wide">
            Штат по отделам
          </span>
          <PieArcLabel data={data.hr.employeesByDepartment} hideLegend variant="green" />
        </div>

        <div className="flex flex-col items-center flex-1">
          <span className="text-[10px] text-slate-400 mb-1 tracking-wide">
            Гендерное распределение
          </span>
          <PieArcLabel data={data.hr.genderDistribution} hideLegend />
        </div>

      </div>

      <div className="flex bg-slate-800/50 rounded border border-blue-500/20 items-center justify-center mb-2">
        {/* <TickPlacementBars data={data.hr.monthlyEmployees} variant="red" /> */}
        <BarsChart data={data.production.productionOutput} />
      </div>

      <div className="flex flex-col items-center flex-1 bg-slate-800/50 rounded border border-blue-500/20 py-2 px-2 mb-2">
        <span className="text-[10px] text-slate-400 mb-1 tracking-wide">
          Недельное производство продукции <span className="font-bold text-blue-500">{data.production?.weeklyProductionOutput?.week || ""}</span>
        </span>
        <div className="flex w-full gap-2 items-stretch">
          {data.production?.weeklyProductionOutput?.items.length > 0 ? (
            data.production?.weeklyProductionOutput?.items.map((item, index) => (
              <ProductionCard key={index} data={item} />
            ))
          ) : (
            <span className="text-slate-400 text-center w-full text-xs">No production data available</span>
          )}
        </div>
      </div>
      
      <div className="flex flex-col w-full bg-slate-800/50 rounded border border-blue-500/20 items-center mb-2">
        <span className="text-[12px] text-slate-400 mb-1 mt-1 tracking-wide">
          Анализ производства по годам
        </span>
        <MultiYearLineChart data={data.production.yearlySales} />
      </div>

      <div className="flex bg-slate-800/50 rounded border border-blue-500/20 items-center justify-center mb-8">
        <SystemChart />
      </div>

    </div>
  );
}