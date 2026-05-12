"use client";

import { useEffect, useState } from "react";
import { ShiftRow } from "../components/production-table";
import { getData } from "@/lib/requests-1c";
import { ProductionType } from "../types/feature.types";

export function useProductionData(type: ProductionType, dateFrom: string, dateTo: string) {
  const [data, setData] = useState<ShiftRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!dateFrom || !dateTo) return;

    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);

        const res = await getData(`/v1/production/table?from=${dateFrom}&to=${dateTo}&product=${type}`);

        const formatted: ShiftRow[] = res.map((item: any) => ({
          shift: item.shift,
          totalQuantity: item.totalQuantity,
          details: item.details,
        }));

        setData(formatted);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [dateFrom, dateTo]);

  return { data, loading };
}