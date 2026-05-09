import ElectricBoltIcon from "@mui/icons-material/ElectricBoltRounded";
import localFont from "next/font/local";

const digital = localFont({
  src: "../../../app/fonts/digital-7.ttf",
});

interface EnergyMeterProps {
  value?: number;
}

export default function EnergyMeterBlock({
  value = 12345.6,
}: EnergyMeterProps) {
  return (
    <div className="w-full mb-2 rounded-md border border-blue-500/20 bg-slate-800/50 overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)]">

      <div className="h-7 flex items-center justify-center border-b border-blue-500/20 bg-slate-800/50">
        <span className="text-[14px] text-gray-200 font-medium tracking-wide">
          kWh
        </span>
      </div>

      <div className="px-1 py-1 bg-black flex items-end justify-center">
            <div 
                className={`${digital.className} relative text-[#ff2b2b] text-[40px] font-bold leading-none drop-shadow-[0_0_6px_#ff0000]`}
            >
              {value}
            </div>
      </div>

      <div className="h-10 flex items-center justify-center bg-slate-800/50 border-t border-blue-500/20">
        <div className="relative flex items-center justify-center">

          <svg width="34" height="34" viewBox="0 0 24 24" className="absolute">
            <polygon
              points="12,2 22,20 2,20"
              fill="#facc15"
              stroke="#000"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>

          <ElectricBoltIcon
            sx={{
              fontSize: 15,
              color: "#000",
              filter: "drop-shadow(0 0 3px #eab308)",
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
}