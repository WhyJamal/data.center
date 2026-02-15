import React from 'react';
import { Header } from '@/components/layout/navbar/header';
import LeftPanel from '@/components/layout/left-panel';
import RightPanel from '@/components/layout/right-panel';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      
      <div className="flex h-[calc(100vh-10px)]">

        <aside className="w-250 sm:w-175 shrink-0">
          <LeftPanel />
        </aside>
        
        <main className="flex-1 overflow-hidden custom-scroll">
          {children}
        </main>
        
        <aside className="w-250 sm:w-175 shrink-0">
          <RightPanel />
        </aside>
      </div>
    </div>
  );
}