"use client";

import { useSection } from "@/app/context/SectionContext";
import EnergyPlatformBanner from "./energy-platform-banner";
import MultiYearLineChart from "./line-pointer";
import { productionData } from "./production-data";

export default function RightPanel() {
  const { selectedSection } = useSection();

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm h-full overflow-y-auto border-l border-blue-500/20 custom-scroll">
      <div className="mb-6 mt-16">
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

      </div>

      <EnergyPlatformBanner />

      <div className="flex flex-col w-full bg-slate-800/50 rounded border border-blue-500/20 items-center">
        <span className="text-[12px] text-slate-400 mb-1 mt-1 tracking-wide">
          Анализ производства по годам
        </span>
        <MultiYearLineChart
          months={productionData.months}
          series={productionData.series}
        />
      </div>
    </div>
  );
}
