import "@assets/animations/flame-animation.css";

export function GasPlatformBanner() {
  return (
    <div className="flex-col bg-orange-600/50 backdrop-blur-sm rounded flex items-center justify-center mb-2 border border-orange-500/20">
      <span className="text-sm font-bold text-orange-400 bg-orange-600/60 w-full text-center py-1 border-b border-orange-500/30 mb-2">
        ГАЗОВАЯ ПЛАТФОРМА
      </span>

      <div className="flex flex-col items-center flex-1 bg-black rounded-full border border-orange-500/30 p-10">
        <div className="flame-container">
          <div className="red flame"></div>
          <div className="orange flame"></div>
          <div className="yellow flame"></div>
          <div className="white flame"></div>
          <div className="blue circle"></div>
          <div className="black circle"></div>
        </div>
      </div>

      <div className="p-2 flex flex-col gap-2">
        <div className="flex gap-3 flex-wrap">
          <div>
            <div className="text-[15px] font-bold text-orange-400 leading-tight">
              0 <span className="text-[8px]">кВт·ч</span>
            </div>
            <div className="text-[13px] text-orange-400 tracking-wide">ГОДОВОЕ ПОТРЕБЛ.</div>
            <div className="text-[13px] text-orange-400">Текущий год</div>
          </div>
          <div>
            <div className="text-[15px] font-bold text-orange-400 leading-tight">
              0 <span className="text-[8px]">кВт·ч</span>
            </div>
            <div className="text-[13px] text-orange-400 tracking-wide">МЕСЯЧНОЕ ПОТРЕБЛ.</div>
            <div className="text-[13px] text-orange-400">Текущий месяц</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-t border-orange-500/30 w-full pt-2">
        <div className="flex items-center gap-1 min-w-0 justify-between px-2">
          <div className="text-[13px] text-orange-400 flex-1 truncate">
            ПОТРЕБЛЕНИЕ СЕГОДНЯ
          </div>

          <div className="text-[15px] text-orange-400 shrink-0 min-w-9 text-right glow-orange">
            0
          </div>
        </div>
      </div>
    </div>
  );
}
