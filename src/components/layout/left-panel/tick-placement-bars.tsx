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
    variant?: 'orange' | 'green' | 'blue' | 'red';
}

function valueFormatter(value: number | null) {
    return `${value}mm`;
}

const COLOR_MAP = {
    orange: '#ff9800',
    green: '#4caf50',
    blue: '#2196f3',
    red: "#ef5350",
};

export default function GridDemo({ data = [], variant = 'blue' }: GridDemoProps) {
    const dataset = data.map((item) => ({
        value: item.value,
        month: item.month,
    }));

    const color = COLOR_MAP[variant];

    return (
        <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            xAxis={[{
                tickMinStep: 1,
                tickLabelStyle: { fontSize: 11 }
            }]}
            series={[
                {
                    dataKey: 'value',
                    label: 'Количество работающих сотрудником',
                    valueFormatter,
                    color, 
                }
            ]}
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