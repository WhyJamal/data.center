import "@assets/animations/water-animation.css";

export function WaterPlatformBanner() {
  return (
    <div className="flex-col bg-blue-600/50 backdrop-blur-sm rounded flex items-center justify-center mb-2 border border-blue-500/20">
      <span className="text-sm font-bold text-blue-400 bg-blue-600/60 w-full text-center py-1 border-b border-blue-500/30 mb-2">
        ВОДНАЯ ПЛАТФОРМА
      </span>

      <div className="flex flex-col items-center flex-1 rounded-full border border-blue-500/30">
        <div className="water-circle">
          <div className="wave">
          </div>
        </div>
      </div>

      <div className="p-2 flex flex-col gap-2">
        <div className="flex gap-3 flex-wrap">
          <div>
            <div className="text-[15px] font-bold text-blue-400 leading-tight">
              0 <span className="text-[8px]">кВт·ч</span>
            </div>
            <div className="text-[13px] text-blue-400 tracking-wide">ГОДОВОЕ ПОТРЕБЛ.</div>
            <div className="text-[13px] text-blue-400">Текущий год</div>
          </div>
          <div>
            <div className="text-[15px] font-bold text-blue-400 leading-tight">
              0 <span className="text-[8px]">кВт·ч</span>
            </div>
            <div className="text-[13px] text-blue-400 tracking-wide">МЕСЯЧНОЕ ПОТРЕБЛ.</div>
            <div className="text-[13px] text-blue-400">Текущий месяц</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-t border-blue-500/30 w-full pt-2">
        <div className="flex items-center gap-1 min-w-0 justify-between px-2">
          <div className="text-[13px] text-blue-400 flex-1 truncate">
            ПОТРЕБЛЕНИЕ СЕГОДНЯ
          </div>

          <div className="text-[15px] text-blue-400 shrink-0 min-w-9 text-right glow-blue">
            0
          </div>
        </div>
      </div>
    </div>
  );
}
