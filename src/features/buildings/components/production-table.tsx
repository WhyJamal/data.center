"use client";

import * as React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatNumber } from "@/utils/formatter-number";

export type ShiftDetail = {
  production: string;
  line: string;
  machineType: string;
  quantity: number;
};

export type ShiftRow = {
  shift: string;
  totalQuantity: number;
  details: ShiftDetail[];
};

function Row({ row }: { row: ShiftRow }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={60}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell sx={{ fontWeight: 600 }}>{row.shift}</TableCell>

        <TableCell align="right" sx={{ fontWeight: 600 }}>
          {formatNumber(row.totalQuantity)}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={3} sx={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Table size="small">
                <TableHead sx={{padding: 0}}>
                  <TableRow>
                    <TableCell>Продукция</TableCell>
                    <TableCell>Линия</TableCell>
                    <TableCell>Тип машины</TableCell>
                    <TableCell align="right">Количество</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.details.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell>{d.production}</TableCell>
                      <TableCell>{d.line}</TableCell>
                      <TableCell>{d.machineType}</TableCell>
                      <TableCell align="right">{formatNumber(d.quantity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleShiftTable({
  data,
}: {
  data: ShiftRow[];
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 200,
        overflow: "auto",
      }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Смена</TableCell>
            <TableCell align="right">Количество</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}