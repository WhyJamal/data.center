"use client";

import { useMemo, useState } from "react";
import ProductionTable from "./production-table";
import ProductionDateFilter from "./production-date-filter";
import Box from "@mui/material/Box";
import { useProductionData } from "../hooks/use-production-data";
import { ProductionType } from "../types/feature.types";
import { formatDate } from "@/utils/format-date"

type Props = {
  initialFrom?: string;
  initialTo?: string;

  type: ProductionType;
};

export default function ProductionTableWrapper({
  initialFrom,
  initialTo,
  type,
}: Props) {
    const defaults = useMemo(() => {
    const today = new Date();

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    return {
      from: initialFrom || formatDate(oneMonthAgo),
      to: initialTo || formatDate(today),
    };
  }, [initialFrom, initialTo]);

  const [dateFrom, setDateFrom] = useState(defaults.from);
  const [dateTo, setDateTo] = useState(defaults.to);

  const { data, loading } = useProductionData(type, dateFrom, dateTo);

  return (
    <Box className="space-y-1 mt-2">
      <ProductionDateFilter
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
      />

      {loading ? (
        <div className="text-white/60 text-sm p-2">Loading...</div>
      ) : (
        <ProductionTable data={data} />
      )}
    </Box>
  );
}