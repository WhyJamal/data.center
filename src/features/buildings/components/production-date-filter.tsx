"use client";

import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type Props = {
    dateFrom: string;
    dateTo: string;
    setDateFrom: (v: string) => void;
    setDateTo: (v: string) => void;
};

export default function ProductionDateFilter({
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
}: Props) {
    return (
        <Box className="flex gap-3">
            <TextField
                type="date"
                label="Период с"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                size="small"
                placeholder=""
            />

            <TextField
                type="date"
                label="по"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                size="small"
                placeholder=""
            />
        </Box>
    );
}