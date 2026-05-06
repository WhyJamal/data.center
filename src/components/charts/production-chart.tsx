"use client";

import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "yearly" | "monthly" | "daily";

interface LegendItem {
  label: string;
  key: string;
  color: string;
}

interface TabConfig {
  title: string;
  type: "bar" | "line";
  legend: LegendItem[];
  xLabels: string[];
  series: {
    data: number[];
    label: string;
    color: string;
    yAxisId: string;
  }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONFIG: Record<TabKey, TabConfig> = {
  yearly: {
    title: "Годовой объем производства",
    type: "bar",
    legend: [
      { label: "Готовая продукция (тыс. шт.)", key: "mahsulot", color: "#3b82f6" },
      { label: "Потребление сырья (тонны)", key: "xomashyo", color: "#34d399" },
    ],
    xLabels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    series: [
      { data: [4200, 3800, 4650, 5100, 5480, 6020], label: "Готовая продукция (тыс. шт.)", color: "#3b82f6", yAxisId: "left" },
      { data: [3100, 2900, 3400, 3800, 4050, 4400], label: "Потребление сырья (тонны)", color: "#34d399", yAxisId: "right" },
    ],
  },
  monthly: {
    title: "Месячный объем производства (2024)",
    type: "line",
    legend: [
      { label: "Готовая продукция (тыс. шт.)", key: "mahsulot", color: "#3b82f6" },
      { label: "Отходы (тонны)", key: "chiqindi", color: "#f87171" },
    ],
    xLabels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    series: [
      { data: [480, 420, 510, 540, 560, 590, 620, 600, 580, 640, 660, 620], label: "Готовая продукция (тыс. шт.)", color: "#3b82f6", yAxisId: "left" },
      { data: [28, 24, 31, 29, 33, 36, 38, 35, 34, 40, 41, 38], label: "Отходы (тонны)", color: "#f87171", yAxisId: "right" },
    ],
  },
  daily: {
    title: "Ежедневное производство (последние 2 недели)",
    type: "bar",
    legend: [
      { label: "Готовая продукция (шт.)", key: "mahsulot", color: "#3b82f6" },
      { label: "Количество смен", key: "smena", color: "#a78bfa" },
    ],
    xLabels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    series: [
      { data: [21200, 22400, 20800, 23100, 24500, 18200, 5400, 22800, 23600, 21900, 24100, 25200, 19300, 6100], label: "Готовая продукция (шт.)", color: "#3b82f6", yAxisId: "left" },
      { data: [3, 3, 3, 3, 3, 2, 1, 3, 3, 3, 3, 3, 2, 1], label: "Количество смен", color: "#a78bfa", yAxisId: "right" },
    ],
  },
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "yearly", label: "Годовой" },
  { key: "monthly", label: "Месячный" },
  { key: "daily", label: "Дневной" },
];

// ─── Shared MUI chart sx ──────────────────────────────────────────────────────

const chartSx = {
  "& .MuiChartsAxis-tickLabel": {
    fill: "#64748b !important",
    fontSize: "11px !important",
    fontFamily: "monospace !important",
  },
  "& .MuiChartsAxis-line": { stroke: "rgba(148,163,184,0.15) !important" },
  "& .MuiChartsAxis-tick": { stroke: "transparent !important" },
  "& .MuiChartsGrid-line": { stroke: "rgba(148,163,184,0.1) !important" },
  "& .MuiChartsLegend-root": { display: "none" },
  "& .MuiChartsTooltip-paper": {
    background: "rgba(15,23,42,0.97) !important",
    border: "1px solid rgba(59,130,246,0.3) !important",
    borderRadius: "8px !important",
    boxShadow: "0 4px 24px rgba(0,0,0,0.5) !important",
  },
  "& .MuiChartsTooltip-labelCell, & .MuiChartsTooltip-valueCell": {
    color: "#e2e8f0 !important",
    fontSize: "12px !important",
    fontFamily: "monospace !important",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductionChart() {
  const [activeTab, setActiveTab] = useState<TabKey>("yearly");
  const cfg = CONFIG[activeTab];

  const sharedProps = {
    xAxis: [
      {
        scaleType: "band" as const,
        data: cfg.xLabels,
        tickLabelStyle: {
          fill: "#64748b",
          fontSize: 11,
          fontFamily: "monospace",
        },
      },
    ],
    yAxis: [
      {
        id: "left",
        tickLabelStyle: { fill: "#60a5fa", fontSize: 11, fontFamily: "monospace" },
        valueFormatter: (v: number) =>
          v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v),
      },
      {
        id: "right",
        position: "right" as const,
        tickLabelStyle: {
          fill: cfg.series[1]?.color ?? "#94a3b8",
          fontSize: 11,
          fontFamily: "monospace",
        },
      },
    ],
    height: 120,
    margin: { top: 8, right: 44, bottom: 22, left: 44 },
    sx: chartSx,
    grid: { horizontal: true },
  };

  return (
    <div className="w-full rounded border border-blue-500/20 bg-slate-800/50 p-1.5 backdrop-blur-sm">

      <div className="mb-2 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
        </span>
        <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-slate-400">
          Производственные показатели
        </h2>
      </div>

      {/* Tabs */}
      <div className="mb-3 flex gap-1 rounded-lg border border-blue-500/20 bg-slate-900/50 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={[
              "flex-1 rounded-md py-1.5 text-sm font-medium tracking-wide transition-all duration-200",
              activeTab === tab.key
                ? "border border-blue-500/35 bg-blue-500/20 text-blue-300"
                : "text-slate-500 hover:text-slate-300",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full">
        {cfg.type === "bar" ? (
          <BarChart
            {...sharedProps}
            series={cfg.series.map((s) => ({
              data: s.data,
              label: s.label,
              color: s.color,
              yAxisId: s.yAxisId,
              valueFormatter: (v: number | null) =>
                v !== null ? v.toLocaleString() : "",
            }))}
            borderRadius={4}
          />
        ) : (
          <LineChart
            {...sharedProps}
            series={cfg.series.map((s) => ({
              data: s.data,
              label: s.label,
              color: s.color,
              yAxisId: s.yAxisId,
              area: true,
              showMark: true,
              valueFormatter: (v: number | null) =>
                v !== null ? v.toLocaleString() : "",
            }))}
          />
        )}
      </div>
    </div>
  );
}