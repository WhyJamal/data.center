"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import type { DashboardData } from "@/types/dashboard.types";
import { useDashboardStore } from "@/stores/dashboard.store";
import { onecSocket } from "@/services/sockets/onec.socket";
import { timesheetSocket } from "@/services/sockets/timesheet.socket";
import { useToast } from "@/app/context/ToastContext";

type DashboardContextValue = {
  data: DashboardData;
  loading: boolean;
  error: string | null;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading, error, setData, setError, updateTimesheetStat } =
    useDashboardStore();

  const { showToast } = useToast();

  const hasConnected = useRef(false);

  useEffect(() => {
    if (hasConnected.current) return;
    hasConnected.current = true;

    onecSocket.connect({
      onData: (wsData) => {
        setData(wsData)
        showToast("1C data updated", "success");
      },
      onError: () => {
        setError("ошибка подключения с 1С")
        showToast("1C connection error", "error");
      },
    });

    timesheetSocket.connect({
      onData: (wsData) => {
        updateTimesheetStat(wsData.total_users)
        showToast("Timesheet updated", "info");
      },
      onError: () => showToast("Timesheet socket error", "warning"),
    });

    return () => {
      onecSocket.disconnect();
      timesheetSocket.disconnect();
      hasConnected.current = false;
    };
  }, [showToast]);

  return (
    <DashboardContext.Provider value={{ data, loading, error }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardData(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDashboardData must be used inside DashboardDataProvider");
  return ctx;
}