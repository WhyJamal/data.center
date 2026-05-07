import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";
import type { TProductionData } from "@/types/production.types";

interface Props {
    data: TProductionData;
}

export default function MultiYearLineChart({ data }: Props) {
    const dataset = data.months.map((month, index) => {
        const row: any = { month };

        data.series.forEach((s) => {
            row[s.year] = s.data[index];
        });

        return row;
    });

    return (
        <Box sx={{ width: "100%", height: 300 }}>
            <LineChart
                dataset={dataset}
                xAxis={[
                    {
                        dataKey: "month",
                        scaleType: "point",
                        tickMinStep: 1,
                        tickLabelStyle: { fontSize: 11 },
                    },
                ]}
                series={data.series.map((s) => ({
                    dataKey: s.year,
                    label: s.year,
                }))}
                margin={{ left: 0, right: 10, top: 0, bottom: 10 }}
            />
        </Box>
    );
}