"use client";

import React, { useRef, useState } from "react";
import { useSection } from "@/shared/context/SectionContext";
import { sections } from "@/shared/data/sectionsData";
import { SpinnerBadge } from "./spinner-badge";
import { useThreeScene } from "@/hooks/useThreeScene";

export default function Factory3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { selectedSection, setSelectedSection } = useSection();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const { loading } = useThreeScene({
    containerRef,
    sections,
    onSectionSelect: setSelectedSection,
    onSectionHover: setHoveredSection,
  });

  return (
    <div className="relative h-full w-full select-none">
      <div
        ref={containerRef}
        className="w-full h-full rounded-lg overflow-hidden"
      />

      {loading && (
        <div className="absolute inset-0 flex justify-center items-center text-gray-400 z-10">
          <SpinnerBadge />
        </div>
      )}

      {selectedSection && (
        <div
          className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 max-w-xs shadow-xl 
                    before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-linear-to-b before:from-white/10 before:to-transparent before:backdrop-blur-xl
                    after:absolute after:inset-0 after:-z-20 after:rounded-lg after:bg-linear-to-r after:from-blue-500/10 after:to-purple-500/10"
        >
          <div className="flex items-center justify-between mb-3 relative z-10">
            <h3 className="text-lg font-bold text-white">
              {selectedSection.name}
            </h3>
            <button
              onClick={() => setSelectedSection(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400 font-medium">Active</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div
                className="bg-slate-800/50 backdrop-blur-sm rounded p-3 border border-blue-500/20 
                          before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-b before:from-white/5 before:to-transparent
                          relative overflow-hidden"
              >
                <p className="text-xs text-gray-400 mb-1">Efficiency</p>
                <p className="text-xl font-bold text-cyan-400">
                  {selectedSection.efficiency}%
                </p>
              </div>
              <div
                className="bg-slate-800/50 backdrop-blur-sm rounded p-3 border border-blue-500/20
                          before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-b before:from-white/5 before:to-transparent
                          relative overflow-hidden"
              >
                <p className="text-xs text-gray-400 mb-1">Uptime</p>
                <p className="text-xl font-bold text-green-400">
                  {selectedSection.uptime}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {hoveredSection && !selectedSection && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-2 shadow-lg
                    before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-linear-to-t before:from-white/10 before:to-transparent
                    after:absolute after:inset-0 after:-z-20 after:rounded-lg after:bg-linear-to-r after:from-blue-500/10 after:to-purple-500/10
                    overflow-hidden"
        >
          <p className="text-sm text-white font-medium relative z-10">
            {hoveredSection}
          </p>
          <p className="text-xs text-gray-400 relative z-10">
            Click to view details
          </p>
        </div>
      )}
    </div>
  );
}