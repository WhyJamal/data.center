import React from 'react';
import { Header } from '@/components/layout/navbar/header';
import LeftPanel from '@/components/layout/left-panel';
import RightPanel from '@/components/layout/right-panel';
import { SectionProvider } from "@/shared/context/SectionContext";
import AudioPlayer from "@/components/audio-player";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SectionProvider>
      <AudioPlayer />

      <div className="min-h-screen bg-slate-950 text-white">
        <Header />

        <div
          className="flex h-[calc(100vh-10px)]"
          style={{
            backgroundImage: "url('/factory/buildings.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >

          <aside className="w-[20%] shrink-0">
            <LeftPanel />
          </aside>

          <main className="flex-1 overflow-hidden relative">
            {children}
          </main>

          <aside className="w-[20%] shrink-0">
            <RightPanel />
          </aside>
        </div>
      </div>

    </SectionProvider>
  );
}