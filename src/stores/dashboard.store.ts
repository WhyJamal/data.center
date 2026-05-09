import { useState, useCallback } from "react";
import type { DashboardData } from "@/types/dashboard.types";
import { defaultDashboardData } from "@/lib/dashboard-defaults";
import { mergeDashboardData } from "./merge-data-dashboard";

interface DashboardState {
    data: DashboardData;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    data: defaultDashboardData,
    loading: true,
    error: null,
};

export function useDashboardStore() {
    const [state, setState] = useState<DashboardState>(initialState);

    const setData = useCallback((data: Partial<DashboardData>) => {
        setState((prev) => ({
            ...prev,
            loading: false,
            error: null,
            data: mergeDashboardData(prev.data, data),
        }));
    }, []);

    const setLoading = useCallback((loading: boolean) => {
        setState((prev) => ({ ...prev, loading }));
    }, []);

    const setError = useCallback((error: string) => {
        setState((prev) => ({ ...prev, error, loading: false }));
    }, []);

    const updateTimesheetStat = useCallback((totalUsers: number) => {
        setState((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                hr: {
                    ...prev.data.hr,
                    stats: prev.data.hr.stats.map((s) =>
                        s.label === "Сотрудники на заводе"
                            ? { ...s, value: totalUsers }
                            : s
                    ),
                },
            },
        }));
    }, []);

    return {
        ...state,
        setData,
        setLoading,
        setError,
        updateTimesheetStat,
    };
}