import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";

type YearSeries = {
    year: string;
    data: number[];
};

interface Props {
    months: string[];
    series: YearSeries[];
}

export default function MultiYearLineChart({ months, series }: Props) {
    const dataset = months.map((month, index) => {
        const row: any = { month };

        series.forEach((s) => {
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
                        tickLabelStyle: { fontSize: 11 }
                    },
                ]}
                series={series.map((s) => ({
                    dataKey: s.year,
                    label: s.year,
                }))}
                margin={{ left: 0, right: 10, top: 0, bottom: 10 }}
            />
        </Box>
    );
}