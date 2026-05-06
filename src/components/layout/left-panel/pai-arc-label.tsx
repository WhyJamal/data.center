import { PieChart, pieClasses } from "@mui/x-charts/PieChart";

interface PaiArcLabelProps {
  data: {
    label: string;
    value: number;
  }[];
  hideLegend?: boolean;
}

export default function PaiArcLabel({ data, hideLegend = false }: PaiArcLabelProps) {
  const chartData = data.map((item) => ({
    id: item.label,
    value: item.value,
    label: item.label,
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