'use client';

import PieArcLabel from "./pai-arc-label";
import { HRStatCards } from "./hr-stat-cards";
import { useDashboardData } from "@/app/context/DashboardDataContext";
import { Loading } from "@/components/loading-dot";
import SystemChart from "./system-chart";
import BarsChart from "./bar-chart";
import ProductionCard from "./production-card";
import MultiYearLineChart from "./line-pointer";
import Combining from "./combining";
import { useSection } from "@/app/context/SectionContext";

export default function LeftPanel() {
  const { selectedSection } = useSection();
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

      <div className="mt-16 px-2 pb-4 flex flex-col gap-2">

        <div className="flex rounded w-full items-center justify-center">

          {selectedSection?.features?.cameras && selectedSection.features.cameras.length > 0 && (
            <div className="flex flex-col border w-full gap-2 border-blue-500/30">
              {selectedSection?.features.cameras.map((camera, index) => (
                camera.location === "left" && (
                  <iframe
                    key={index}
                    src={camera.streamUrl}
                    className="object-cover"
                    allowFullScreen
                  />
                )
              ))}
            </div>
          )}

        </div>

        <div className="w-full">
          <HRStatCards data={data.hr.stats} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col items-center bg-slate-800/50 rounded border border-blue-500/20 py-2">
            <span className="text-[10px] text-slate-400 mb-1 tracking-wide text-center">
              Штат по отделам
            </span>
            <PieArcLabel data={data.hr.employeesByDepartment} hideLegend variant="green" />
          </div>

          <div className="flex flex-col items-center bg-slate-800/50 rounded border border-blue-500/20 py-2">
            <span className="text-[10px] text-slate-400 mb-1 tracking-wide text-center">
              Гендерное распределение
            </span>
            <PieArcLabel data={data.hr.genderDistribution} hideLegend />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex bg-slate-800/50 rounded border border-blue-500/20 items-center justify-center">
            <BarsChart data={data.production.productionOutput} />
          </div>

          <div className="flex bg-slate-800/50 rounded border border-blue-500/20 items-center justify-center">
            <Combining />
          </div>
        </div>

        <div className="flex flex-col bg-slate-800/50 rounded border border-blue-500/20 py-2 px-2">
          <span className="text-[10px] text-slate-400 mb-1 tracking-wide">
            Недельное производство <span className="font-bold text-blue-500">{data.production?.weeklyProductionOutput?.week || ""}</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            {data.production?.weeklyProductionOutput?.items.length > 0 ? (
              data.production?.weeklyProductionOutput?.items.map((item, index) => (
                <ProductionCard key={index} data={item} />
              ))
            ) : (
              <span className="text-slate-400 text-center col-span-2 text-xs">No production data available</span>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full bg-slate-800/50 rounded border border-blue-500/20 items-center">
          <span className="text-[12px] text-slate-400 mb-1 mt-1 tracking-wide">
            Анализ производства по годам
          </span>
          <MultiYearLineChart data={data.production.yearlySales} />
        </div>

        {/* 
        <div className="flex bg-slate-800/50 rounded border border-blue-500/20 items-center justify-center">
          <SystemChart />
        </div> 
        */}

      </div>
    </div>
  );
}
