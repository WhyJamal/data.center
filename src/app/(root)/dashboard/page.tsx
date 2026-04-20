"use client";

import { Building, buildings } from "@/shared/data/buildingsData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function BuildingPage() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lastBuilding, setLastBuilding] = useState<Building | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const active = buildings.find((b) => b.id === hoveredId) ?? null;
  const display = active ?? lastBuilding;

  const onEnter = (id: number) => {
    if (isExiting) return;
    const b = buildings.find((b) => b.id === id)!;
    setHoveredId(id);
    setLastBuilding(b);
  };
  const onLeave = () => {
    if (isExiting) return;
    setHoveredId(null);
  };

  const handleBuildingClick = (b: Building) => {
    if (isExiting) return;
    setZoomOrigin({ x: b.mx, y: b.my });
    setSelectedId(b.id);
    setIsExiting(true);


    setTimeout(() => {
      router.push(`/dashboard/building/${b.id}`);
    }, 900);
  };

  useEffect(() => {
    setIsExiting(false);
    setSelectedId(null);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="w-full h-full bg-[#090909] flex flex-col overflow-hidden">
      <div
        onMouseMove={handleMouseMove}
        className="relative flex-1 overflow-hidden cursor-crosshair"
      >

        <motion.img
          src="/factory/buildings.png"
          alt="Bino kompleksi aerial ko'rinishi"
          draggable={false}
          className="absolute inset-0 w-full h-full object-fill object-center select-none"
          animate={
            isExiting
              ? {
                scale: 3.2,
                x: `${(50 - zoomOrigin.x) * 2.4}%`,
                y: `${(50 - zoomOrigin.y) * 2.4}%`,
                filter: "brightness(0.2) blur(6px)",
              }
              : {
                scale: 1,
                x: "0%",
                y: "0%",
                filter: "brightness(1) blur(0px)",
              }
          }
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)] pointer-events-none" />

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="white-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 28 -8"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {buildings.map((b) => {
            if (isExiting) return null;

            const isActive = hoveredId === b.id && !isExiting;
            return (
              <g key={b.id}>
                <polygon
                  points={b.polygon}
                  fill={isActive ? "rgba(255,255,255,0.06)" : "transparent"}
                  stroke={isActive ? "rgba(255,255,255,0.35)" : "transparent"}
                  strokeWidth="6"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  className="[transition:fill_0.25s_ease,stroke_0.25s_ease]"
                />
                <polygon
                  points={b.polygon}
                  fill={isActive ? b.isUnavailable ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.22)" : "transparent"}
                  stroke={isActive ? b.isUnavailable ? "rgba(239,68,68,1)" : "rgba(255,255,255,1)" : "transparent"}
                  strokeWidth="4"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  filter={isActive ? "url(#white-glow)" : undefined}
                  className="[transition:fill_0.25s_ease,stroke_0.25s_ease]"
                />
              </g>
            );
          })}
        </svg>

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {buildings.map((b) => (
            <polygon
              key={b.id}
              points={b.polygon}
              fill="transparent"
              stroke="transparent"
              strokeWidth="6"
              vectorEffect="non-scaling-stroke"
              className="cursor-pointer"
              onMouseEnter={() => onEnter(b.id)}
              onMouseLeave={onLeave}
              onClick={() => handleBuildingClick(b)}
            />
          ))}
        </svg>

        {buildings.map((b) => {
          if (isExiting) return null;

          const isActive = hoveredId === b.id && !isExiting;
          const isSelected = selectedId === b.id;

          return (
            <div
              key={b.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: `${b.mx}%`, top: `${b.my}%` }}
              onMouseEnter={() => onEnter(b.id)}
              onMouseLeave={onLeave}
              onClick={() => handleBuildingClick(b)}
            >
              <div
                className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full pointer-events-none"
                style={{
                  animation: "pulse-ring 1.6s ease-out infinite",
                  borderWidth: "1.5px",
                  borderStyle: "solid",
                  borderColor: b.isUnavailable ? "rgba(239,68,68,0.7)" : "rgba(255,255,255,0.55)",
                }}
              />
              <motion.div
                animate={
                  isSelected
                    ? { scale: 1.3, opacity: 0 }
                    : isExiting
                      ? { scale: 0.8, opacity: 0.3 }
                      : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`
                  rounded-full flex items-center justify-center
                  text-xs font-semibold cursor-pointer
                  select-none relative z-1
                  ${b.isUnavailable
                    ? "w-8.5 h-8.5 bg-red-500/80 border-2 border-red-400/70 text-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    : "w-8.5 h-8.5 bg-white/88 border-2 border-white/70 text-[#111] shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                  }
                `}
              >
                {b.id}
              </motion.div>
            </div>
          );
        })}

        <AnimatePresence>
          {display && active && !isExiting && (
            <div
              className="fixed z-30 pointer-events-none"
              style={{
                left: mousePos.x + 50,
                top: mousePos.y + 100,
                transform: "translateY(-50%)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: -6 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative bg-slate-900/80 backdrop-blur-sm border-l border-blue-500/30 pt-5 px-6 pb-5 min-w-60 shadow-[0_12px_48px_rgba(0,0,0,0.55)]"
              >
                <div
                  className="absolute -left-4.5 top-3 w-0 h-0 pointer-events-none"
                  style={{
                    borderTop: "14px solid transparent",
                    borderBottom: "14px solid transparent",
                    borderRight: "16px solid rgba(15, 23, 42, 0.8)",
                  }}
                />

                <p className="text-[10px] tracking-[0.28em] uppercase text-white/90 mb-1 font-medium">
                  {display.type}
                </p>
                <p className="text-[11px] text-white/55 mb-1 tracking-[0.08em]">
                  {display.area.toLocaleString()} M²
                </p>
                <p className="text-[10px] text-white/80 mb-5 tracking-widest uppercase">
                  {display.floors} этаж
                </p>
                <div className="flex items-baseline gap-2 mb-2.5">
                  <span className="text-[10px] tracking-[0.45em] uppercase text-white/80 font-medium">
                    Здание
                  </span>
                  <span className="text-[62px] font-light text-white/90 leading-none tracking-[-0.02em]">
                    {display.id}
                  </span>
                </div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-white/50 font-semibold border-t border-white/10 pt-2.5">
                  {display.name}
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div
          className={`
            absolute bottom-5 left-1/2 -translate-x-1/2
            [transition:opacity_0.4s_ease] pointer-events-none z-10 text-center
            ${hoveredId && !isExiting ? "opacity-0" : isExiting ? "opacity-0" : "opacity-60"}
          `}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-white bg-black/40 py-1.5 px-4 backdrop-blur-sm" />
        </div>

        <AnimatePresence>
          {isExiting && (
            <motion.div
              className="absolute inset-0 z-50 bg-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            />
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.9; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}