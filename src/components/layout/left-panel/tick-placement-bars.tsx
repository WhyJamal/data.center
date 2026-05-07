import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
    height: 300,
    margin: { left: 0, bottom: 10 },
};

interface GridDemoProps {
    data: {
        month: string;
        value: number;
    }[];
}

function valueFormatter(value: number | null) {
    return `${value}mm`;
}

export default function GridDemo({ data = [] }: GridDemoProps) {
    const dataset = data.map((item) => ({
        value: item.value,
        month: item.month,
    }));

    return (
        <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            xAxis={[{
                tickMinStep: 1,
                tickLabelStyle: { fontSize: 11 }
            }]}
            series={[{ dataKey: 'value', label: 'Количество работающих сотрудником', valueFormatter }]}
            layout="horizontal"
            grid={{ vertical: true }}
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