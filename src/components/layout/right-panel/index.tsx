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
      <div className="mt-16 px-2 pb-4 flex flex-col gap-2">
        <div className="flex rounded w-full items-center justify-center">

          {selectedSection?.features?.cameras && selectedSection.features.cameras.length > 0 && (
            <div className="flex flex-col border w-full gap-2 border-blue-500/30">
              {selectedSection?.features.cameras.map((camera, index) => (
                camera.location === "right" && (
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
          <EnergyPlatformBanner data={data.energy} title={selectedSection?.type} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <GasPlatformBanner />
          </div>
          <div className="flex flex-col">
            <WaterPlatformBanner />
          </div>
        </div>


      </div>
    </div>
  );
}
