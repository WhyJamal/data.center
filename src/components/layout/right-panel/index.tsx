"use client";

import { useSection } from "@/app/context/SectionContext";
import EnergyPlatformBanner from "./energy-platform-banner";
import { useDashboardData } from "@/app/context/DashboardDataContext";
import { GasPlatformBanner } from "./gas-platform-banner";
import { WaterPlatformBanner } from "./water-platform-banner";

export default function RightPanel() {
  const { selectedSection } = useSection();
  const { data, loading } = useDashboardData();

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm h-full overflow-y-auto border-l border-blue-500/20 custom-scroll">
      <div className="mb-6 mt-16">
        {/* {selectedSection?.features?.cameras && selectedSection.features.cameras.length > 0 && (
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
        )} */}
      </div>

      <EnergyPlatformBanner data={data.energy} title={selectedSection?.type} />
      
      <GasPlatformBanner />

      <WaterPlatformBanner />

    </div>
  );
}
