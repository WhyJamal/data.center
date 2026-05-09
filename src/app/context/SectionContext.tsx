"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { IBuilding } from "@/features/buildings/types/building.type";

type SectionContextType = {
  selectedSection: IBuilding | null;
  setSelectedSection: (s: IBuilding | null) => void;
  clearSelectedSection: () => void;
};

const SectionContext = createContext<SectionContextType | null>(null);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [selectedSection, setSelectedSection] = useState<IBuilding | null>(null);

  const clearSelectedSection = () => setSelectedSection(null);

  return (
    <SectionContext.Provider
      value={{ selectedSection, setSelectedSection, clearSelectedSection }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSection must be used within SectionProvider");
  return ctx;
}