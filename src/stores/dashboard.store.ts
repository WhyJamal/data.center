import { useState, useCallback } from "react";
import type { DashboardData } from "@/types/dashboard.types";
import { defaultDashboardData } from "@/lib/dashboard-defaults";

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

    const setData = useCallback((data: DashboardData) => {
        setState((prev) => {
            const timesheetStat = prev.data.hr.stats.find(
                (s) => s.label === "Сотрудники на заводе"
            );

            const stats = timesheetStat
                ? [...data.hr.stats.filter((s) => s.label !== "Сотрудники на заводе"), timesheetStat]
                : data.hr.stats;

            return {
                ...prev,
                loading: false,
                error: null,
                data: {
                    ...data,
                    hr: {
                        ...data.hr,
                        stats,
                    },
                },
            };
        });
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
                    stats: [
                        ...prev.data.hr.stats.filter(
                            (s) => s.label !== "Сотрудники на заводе"
                        ),
                        { label: "Сотрудники на заводе", value: totalUsers },
                    ],
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