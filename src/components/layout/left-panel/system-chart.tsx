"use client";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { lineClasses } from "@mui/x-charts/LineChart";
import { chartsAxisHighlightClasses } from "@mui/x-charts/ChartsAxisHighlight";

export default function SystemChart() {
  const [data, setData] = React.useState<number[]>([]);
  const [current, setCurrent] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/system");
      const json = await res.json();

      const value = json.cpuUsage;

      setCurrent(value);

      setData((prev) => {
        const updated = [...prev, value];
        return updated.slice(-20);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Stack sx={{ width: 320, padding: 1 }}>

        <Typography sx={{ fontSize: 14, color: "gray", mb: 1 }}>
          Использование CPU
        </Typography>

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: "2px solid rgba(0,200,255,0.2)",
            pb: 1,
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
            {current.toFixed(1)}%
          </Typography>

          <SparkLineChart
            data={data}   
            height={40}
            width={200}
            area
            showHighlight
            color="rgb(137, 86, 255)"
            baseline="min"
            margin={{ bottom: 0, top: 5, left: 4, right: 0 }}
            sx={{
              [`& .${lineClasses.area}`]: { opacity: 0.25 },
              [`& .${lineClasses.line}`]: { strokeWidth: 3 },
              [`& .${chartsAxisHighlightClasses.root}`]: {
                stroke: "rgb(137, 86, 255)",
                strokeWidth: 2,
              },
            }}
          />
        </Stack>

      </Stack>
    </Box>
  );
}