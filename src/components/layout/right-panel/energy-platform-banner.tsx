"use client";

export default function EnergyPlatformBanner() {
  const meters = [
    { icon: "⚙", val: "6500кВт·ч", pct: 85, color: "#00e5ff" },
    { icon: "☁", val: "2300кВт·ч", pct: 55, color: "#0099bb" },
    { icon: "💡", val: "1900кВт·ч", pct: 42, color: "#005577" },
  ];

  const rows = [
    { num: "①", label: "ПОТРЕБЛЕНИЕ СЕГОДНЯ", bars: [6, 10, 14, 18, 12, 8], val: "68 кВт·ч" },
    { num: "②", label: "ПОТРЕБЛЕНИЕ ВЧЕРА",   bars: [10, 16, 12, 18, 9, 6], val: "225 кВт·ч" },
  ];

  return (
    <div className="w-full mb-2 border border-blue-500/20 rounded overflow-hidden bg-slate-800/50 text-cyan-300">

      <div className="text-center text-[9px] font-bold tracking-[2px] text-[#e0f0ff] py-1.5 border-b border-blue-500/20 bg-slate-800/50">
        ПЛАТФОРМА УПРАВЛЕНИЯ ЭНЕРГИЕЙ
      </div>

      <div className="flex flex-col divide-y divide-[#1a3050]">

        <div className="p-2 flex flex-col gap-2">
          <div className="flex gap-3 flex-wrap">
            <div>
              <div className="text-[12px] font-bold text-cyan-400 leading-tight">
                48461.4 <span className="text-[8px]">кВт·ч</span>
              </div>
              <div className="text-[7px] text-[#4a9abe] tracking-wide">ГОДОВАЯ ВЫРАБОТКА</div>
              <div className="text-[7px] text-[#2a6a8a]">Солнечная энергия</div>
            </div>
            <div>
              <div className="text-[12px] font-bold text-cyan-400 leading-tight">
                64.1 <span className="text-[8px]">кВт·ч</span>
              </div>
              <div className="text-[7px] text-[#4a9abe] tracking-wide">СУТОЧНАЯ ВЫРАБОТКА</div>
              <div className="text-[7px] text-[#2a6a8a]">За сегодня</div>
            </div>
          </div>

          <div className="flex gap-1">
            {meters.map((m, i) => (
              <div
                key={i}
                className="flex-1 bg-[#0d1a2e] border border-[#1a3a5a] rounded px-1 py-1 flex flex-col items-center gap-0.5 min-w-0"
              >
                <span className="text-[10px]">{m.icon}</span>
                <div className="w-full h-1 bg-[#0a1a2e] rounded overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{ width: `${m.pct}%`, background: m.color }}
                  />
                </div>
                <span className="text-[7px] text-cyan-400 truncate w-full text-center">
                  {m.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-2 flex items-center justify-center gap-3">
          <span className="text-[10px] font-bold text-cyan-400 text-center leading-tight">
            СОЛНЕЧНАЯ<br />ГЕНЕРАЦИЯ
          </span>

          <div className="w-14 h-14 shrink-0 rounded-full border-2 border-[#1a4060] flex items-center justify-center relative">
            <div className="absolute inset-1.5 rounded-full border border-[#0d2a40]" />
            <span className="text-lg drop-shadow-[0_0_6px_#ffcc00] glow-orange">⚡</span>
          </div>

          <span className="text-[10px] font-bold text-orange-400 text-center leading-tight">
            ПОТРЕБЛЕНИЕ<br />ЗАВОДОВ
          </span>
        </div>

        <div className="p-2 flex flex-col gap-2">
          <div className="flex gap-3 flex-wrap">
            <div>
              <div className="text-[14px] font-bold text-orange-400 leading-tight">
                53746 <span className="text-[8px]">кВт·ч</span>
              </div>
              <div className="text-[10px] text-[#c06010]">ГОДОВОЕ ПОТРЕБЛ.</div>
              <div className="text-[10px] text-[#7a3a00]">Все заводы</div>
            </div>
            <div>
              <div className="text-[14px] font-bold text-orange-400 leading-tight">
                53746 <span className="text-[8px]">кВт·ч</span>
              </div>
              <div className="text-[10px] text-[#c06010]">МЕСЯЧНОЕ ПОТРЕБЛ.</div>
              <div className="text-[10px] text-[#7a3a00]">Текущий месяц</div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {rows.map((row, i) => (
              <div key={i} className="flex items-center gap-1 min-w-0">
                <div className="w-3.5 h-3.5 shrink-0 rounded-full border border-orange-500 flex items-center justify-center text-[7px] text-orange-500">
                  {row.num}
                </div>
                <div className="text-[10px] text-white flex-1 truncate">
                  {row.label}
                </div>
                <div className="flex gap-0.5 items-end h-3.5 shrink-0">
                  {row.bars.map((h, bi) => (
                    <div
                      key={bi}
                      className="w-0.75 bg-orange-500 rounded-[1px]"
                      style={{ height: `${h}px`, opacity: h < 10 ? 0.4 : h < 14 ? 0.65 : 1 }}
                    />
                  ))}
                </div>
                <div className="text-[12px] text-orange-400 shrink-0 min-w-9 text-right glow-orange">
                  {row.val}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}