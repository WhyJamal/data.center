"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Section } from "@/types/section.types";

const SectionContext = createContext({
  selectedSection: null as Section | null,
  setSelectedSection: (s: Section | null) => {},
});

export function SectionProvider({ children }: { children: ReactNode }) {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  return (
    <SectionContext.Provider value={{ selectedSection, setSelectedSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  return useContext(SectionContext);
}
