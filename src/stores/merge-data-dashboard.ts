import type { DashboardData } from "@/types/dashboard.types";

export function mergeDashboardData(
    prev: DashboardData,
    next: Partial<DashboardData>
): DashboardData {
    const prevStats = prev.hr?.stats ?? [];
    const nextStats = next.hr?.stats ?? [];

    const timesheetStat = prevStats.find(
        (s) => s.label === "Сотрудники на заводе"
    );

    const mergedStats = timesheetStat
        ? [
              ...nextStats.filter(
                  (s) => s.label !== "Сотрудники на заводе"
              ),
              timesheetStat,
          ]
        : nextStats;

    return {
        ...prev,
        ...next,

        hr: next.hr
            ? {
                  ...prev.hr,
                  ...next.hr,
                  stats: mergedStats,
              }
            : prev.hr,

        production: next.production
            ? {
                  ...prev.production,
                  ...next.production,
              }
            : prev.production,

        energy: next.energy
            ? {
                  ...prev.energy,
                  ...next.energy,
              }
            : prev.energy,
    };
}