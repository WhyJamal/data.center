import React from 'react';
import { Header } from '@/components/layout/navbar/header';
import LeftPanel from '@/components/layout/left-panel';
import RightPanel from '@/components/layout/right-panel';
import { SectionProvider } from "@/app/context/SectionContext";
import AudioPlayer from "@/components/audio-player";
import { DashboardDataProvider } from '@/app/context/DashboardDataContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SectionProvider>
      <DashboardDataProvider>
        <AudioPlayer />

        <div className="min-h-screen bg-slate-950 text-white">
          <Header />

          {/* 
            10:2 aspect ratio layout
            Left panel: 2 columns (wide)
            Center: main content
            Right panel: 2 columns (wide)
            BG image: positioned to fit wide landscape 10:2 screen
          */}
          <div
            className="flex h-[calc(100vh-10px)]"
            style={{
              backgroundImage: "url('/factory/buildings.png')",
              backgroundSize: "cover",
              backgroundPosition: "center 60%",
              backgroundRepeat: "no-repeat",
            }}
          >

            {/* LEFT PANEL — 2-column grid layout */}
            <aside className="w-[28%] shrink-0 overflow-x-hidden">
              <LeftPanel />
            </aside>

            <main className="flex-1 overflow-hidden relative">
              {children}
            </main>

            {/* RIGHT PANEL — 2-column grid layout */}
            <aside className="w-[28%] shrink-0">
              <RightPanel />
            </aside>
          </div>
        </div>
      </DashboardDataProvider>
    </SectionProvider>
  );
}
