"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { DashboardData } from "@/types/dashboard.types";
import { defaultDashboardData } from "@/lib/dashboard-defaults";
import { dashboardService } from "@/services/dashboard-service";

type DashboardContextValue = {
  data: DashboardData;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData>(defaultDashboardData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await dashboardService.getDashboard();
      setData(res);

    } catch (e: any) {
      //setError(e?.message || "Data yuklashda xatolik");
      setData(defaultDashboardData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <DashboardContext.Provider value={{ data, loading, error, refetch: load }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardData() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboardData must be used inside DashboardDataProvider");
  return ctx;
}