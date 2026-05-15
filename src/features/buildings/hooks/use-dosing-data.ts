"use client";

import { useEffect, useState } from "react";
import { getData } from "@/lib/requests-1c";
import type { RawMaterialItem } from "../types/feature.types";

export function useDosingData() {
  const [data, setData] = useState<RawMaterialItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);

        const res = await getData(`/v1/raw-material/table`);

        const formatted: RawMaterialItem[] = res.map((item: any) => ({
          rawmaterial: item.rawmaterial,
          quantity: item.quantity,
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
  }, []);

  return { data, loading };
}