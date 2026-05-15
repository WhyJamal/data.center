import { BarChart } from "@mui/x-charts/BarChart";
import { ProductionOutputItem } from "@/types/production.types";
import { formatNumber } from "@/utils/formatter-number";

const chartSetting = {
  height: 300,
  margin: { left: 0, bottom: 0, right: 10, top: 0 },
};

export default function BarsChart({
  data = [],
}: {
  data?: ProductionOutputItem[];
}) {
  const names = [...new Set(data.map((item) => item.name))];

  const groupedData = data.reduce((acc: any[], item) => {
    let monthObj = acc.find((x) => x.month === item.month);

    if (!monthObj) {
      monthObj = {
        month: item.month,
      };

      acc.push(monthObj);
    }

    monthObj[item.name] = item.amount;

    return acc;
  }, []);

  return (
    <BarChart
      dataset={groupedData}
      xAxis={[
        {
          dataKey: "month",
          tickMinStep: 1,
          tickLabelStyle: { fontSize: 11 },
        },
      ]}
      series={names.map((name) => ({
        dataKey: name,
        label: name,
        valueFormatter: (value: number | null) =>
          value !== null ? formatNumber(value) : "0",
      }))}
      {...chartSetting}
      sx={{
        "& .MuiChartsLegend-label": {
          color: "#90a1b9",
          fontSize: 11,
        },
      }}
    />
  );
}