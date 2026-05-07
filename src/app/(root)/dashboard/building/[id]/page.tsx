"use client";

import { buildings } from "@/features/buildings/data/buildings.dataset";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PolygonOverlay from "@/components/polygon-overlay";
import ProductionChart from "@/features/buildings/components/production-chart";
import { renderBuildingComponent } from "@/features/buildings/renderers/renderBuildingComponent";

export default function BuildingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const building = buildings.find((b) => b.id === id);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleBack = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => router.push("/dashboard"), 900);
  };

  if (!building) {
    return (
      <div className="w-full h-full bg-[#090909] flex items-center justify-center">
        <p className="text-white/40 text-sm tracking-widest uppercase">Bino topilmadi</p>
      </div>
    );
  }

  const imageVariants = {
    initial: { scale: 1.18, filter: "brightness(0.25) blur(10px)" },
    enter: { scale: 1, filter: "brightness(1) blur(0px)" },
    exit: { scale: 3.0, filter: "brightness(0.15) blur(8px)" },
  };

  const currentImage = exiting ? "exit" : mounted ? "enter" : "initial";

  return (
    <div className="w-full h-full bg-[#090909] flex flex-col overflow-hidden relative">

      <motion.div
        className="absolute inset-0"
        variants={imageVariants}
        initial="initial"
        animate={currentImage}
        transition={{ duration: exiting ? 0.85 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full h-full">
          
          {building.visual.innerImage &&
            <img
              src={building.visual.innerImage}
              alt={building.name}
              draggable={false}
              className="absolute inset-0 w-full h-full object-center select-none"
            />
          }
          
          <PolygonOverlay
            items={building.visual.zones?.items ?? []}
            hoveredId={hoveredZone}
            onEnter={(id) => setHoveredZone(id)}
            onLeave={() => setHoveredZone(null)}
            onClick={(zone) => { console.log("ZONE CLICK:", zone); }}
            showGlow={false}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.0) 38%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.88) 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: exiting ? 0.35 : 0.6, delay: exiting ? 0 : 0.2 }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.38)_100%)] pointer-events-none" />

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30"
        initial={{ y: "100%" }}
        animate={exiting ? { y: "100%" } : mounted ? { y: "0%" } : { y: "100%" }}
        transition={{
          duration: exiting ? 0.5 : 0.75,
          ease: exiting ? [0.4, 0, 0.6, 1] : [0.16, 1, 0.3, 1],
          delay: exiting ? 0 : 0.3,
        }}
      >
        <div className="bg-slate-900/50 backdrop-blur-sm border-l border-blue-500/20 px-4 pt-1 pb-1 shadow-[0_-12px_60px_rgba(0,0,0,0.5)]">

          <div className="border-t border-white/10 mb-1" />

          <motion.div
            className="flex items-start justify-between mb-5"
            initial={{ opacity: 0, y: 14 }}
            animate={exiting ? { opacity: 0, y: 8 } : mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: exiting ? 0.18 : 0.5, delay: exiting ? 0 : 0.62 }}
          >
            <div className="flex flex-col">
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-white/45 font-medium mb-1">
                  {building.type}
                </p>
                <p className="text-[11px] text-white/50 tracking-[0.08em]">
                  {building.area.toLocaleString()} M²
                </p>
                <p className="text-[10px] text-white/50 tracking-widest uppercase mt-0.5">
                  {building.floors} Этаж
                </p>
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[10px] tracking-[0.45em] uppercase text-white/60 font-medium">
                    Здание
                  </span>
                  <span className="text-[72px] font-light text-white/90 leading-none tracking-[-0.02em]">
                    {building.id}
                  </span>
                </div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-white/80 font-semibold">
                  {building.name}
                </p>
              </div>
            </div>

            <div className="w-full px-4">
              {renderBuildingComponent(building.features?.component)}
            </div>

            <IconButton
              onClick={handleBack}
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </motion.div>

          {building.description && (
            <motion.p
              className="text-[11px] text-white/50 leading-[1.7] border-t border-black/8 pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={exiting ? { opacity: 0, y: 8 } : mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: exiting ? 0.15 : 0.5, delay: exiting ? 0 : 0.7 }}
            >
              {building.description}
            </motion.p>
          )}

        </div>
      </motion.div>
    </div>
  );
}