import { PieChart, pieClasses } from "@mui/x-charts/PieChart";

interface PaiArcLabelProps {
  data: {
    label: string;
    value: number;
  }[];
  hideLegend?: boolean;
  variant?: "blue" | "green" | "orange";
}

const COLOR_VARIANTS = {
  blue: [
    "#1d4ed8",
    "#2563eb",
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
  ],

  green: [
    "#047857",
    "#059669",
    "#10b981",
    "#34d399",
    "#6ee7b7",
  ],

  orange: [
    "#c2410c",
    "#ea580c",
    "#f97316",
    "#fb923c",
    "#fdba74",
  ],
};

export default function PaiArcLabel({
  data = [],
  hideLegend = false,
  variant = "blue",
}: PaiArcLabelProps) {
  const colors = COLOR_VARIANTS[variant];

  const chartData = data.map((item, index) => ({
    id: item.label,
    value: item.value,
    label: item.label,
    color: colors[index % colors.length],
  }));

  return (
    <PieChart
      series={[
        {
          data: chartData,
          arcLabel: (item) => `${item.label}-${item.value}%`,
          arcLabelMinAngle: 10,
          arcLabelRadius: "60%",
        },
      ]}
      slotProps={{
        legend: {
          direction: "horizontal",
          position: { vertical: "bottom", horizontal: "center" },
        },
      }}
      sx={{
        [`& .${pieClasses.arcLabel}`]: {
          fontWeight: "bold",
          fill: "#fff",
          fontSize: "8px",
        },

        [`& .${pieClasses.arc}`]: {
          stroke: "#fff",
          strokeWidth: 1,
        },
      }}
      width={150}
      height={150}
      hideLegend={hideLegend}
    />
  );
}