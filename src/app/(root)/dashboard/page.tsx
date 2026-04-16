"use client";

import { Building, buildings } from "@/shared/data/buildingsData";
import { useState } from "react";

export default function BuildingPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lastBuilding, setLastBuilding] = useState<Building | null>(null);

  const active = buildings.find((b) => b.id === hoveredId) ?? null;
  const display = active ?? lastBuilding;

  const onEnter = (id: number) => {
    const b = buildings.find((b) => b.id === id)!;
    setHoveredId(id);
    setLastBuilding(b);
  };
  const onLeave = () => setHoveredId(null);

  return (
    <div className="w-full h-full bg-[#090909] flex flex-col overflow-hidden">

      <div className="relative flex-1 overflow-hidden cursor-crosshair">
        <img
          src={"/factory/buildings.png"}
          alt="Bino kompleksi aerial ko'rinishi"
          draggable={false}
          className="absolute inset-0 w-full h-full object-fill object-center select-none"
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
            const isActive = hoveredId === b.id;
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
                  fill={isActive ? "rgba(255,255,255,0.22)" : "transparent"}
                  stroke={isActive ? "rgba(255,255,255,1)" : "transparent"}
                  strokeWidth="2.5"
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
            />
          ))}
        </svg>

        {buildings.map((b) => {
          const isActive = hoveredId === b.id;
          return (
            <div
              key={b.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: `${b.mx}%`, top: `${b.my}%` }}
              onMouseEnter={() => onEnter(b.id)}
              onMouseLeave={onLeave}
            >
              {isActive && (
                <>
                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full border-[1.5px] border-white/55 pointer-events-none"
                    style={{ animation: "pulse-ring 1.6s ease-out infinite" }}
                  />
                </>
              )}

              <div
                className={`
                    rounded-full flex items-center justify-center
                    text-xs font-semibold text-[#111] cursor-pointer 
                    select-none transition-all duration-200 ease-in-out relative z-1
                      ${isActive
                        ? "w-10 h-10 bg-white border-[2.5px] border-white shadow-[0_0_0_3px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.5)]"
                        : "w-8.5 h-8.5 bg-white/88 border-2 border-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                      }
                `}
              >
                {b.id}
              </div>
            </div>
          );
        })}

        <div
          className={`
                absolute right-8 bottom-8 z-30 pointer-events-none
                [transition:opacity_0.3s_ease,transform_0.3s_ease]
                ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"}
            `}
        >
          {display && (
            <div className="bg-[rgba(234,227,214,0.97)] backdrop-blur-[20px] pt-6.5 px-7.5 pb-6 min-w-67.5 shadow-[0_12px_48px_rgba(0,0,0,0.45)]">

              <p className="text-[10px] tracking-[0.28em] uppercase text-[#5c4f3a] mb-1 font-medium">
                {display.type}
              </p>

              <p className="text-[11px] text-[#9a8e7d] mb-1 tracking-[0.08em]">
                {display.area.toLocaleString()} M²
              </p>

              <p className="text-[10px] text-[#b0a28e] mb-5 tracking-widest uppercase">
                {display.floors} QAVAT
              </p>

              <div className="flex items-baseline gap-2 mb-2.5">
                <span className="text-[10px] tracking-[0.45em] uppercase text-[#7a6e5a] font-medium">
                  BINO
                </span>
                <span className="text-[62px] font-light text-[#1e1508] leading-none tracking-[-0.02em]">
                  {display.id}
                </span>
              </div>

              <p className="text-[10px] tracking-[0.22em] uppercase text-[#4a3e2a] font-semibold border-t border-black/10 pt-2.5">
                {display.name}
              </p>
            </div>
          )}
        </div>

        <div
          className={`
            absolute bottom-5 left-1/2 -translate-x-1/2
            [transition:opacity_0.4s_ease] pointer-events-none z-10 text-center
            ${hoveredId ? "opacity-0" : "opacity-60"}
          `}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-white bg-black/40 py-1.5 px-4 backdrop-blur-sm">

          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse-ring {
            0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.9; }
            100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0;   }
          }
        `}
      </style>
    </div>
  );
}
