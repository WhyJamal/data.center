import React from 'react';

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
        <main className="flex-1 overflow-hidden custom-scroll">
          {children}
        </main>
        
    </div>
  );
}