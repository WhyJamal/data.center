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

type ShiftDetail = {
  production: string;
  line: string;
  machineType: string;
  quantity: number;
};

type ShiftRow = {
  shift: string;
  totalQuantity: number;
  details: ShiftDetail[];
};

const rows: ShiftRow[] = [
  {
    shift: "1-smena",
    totalQuantity: 120,
    details: [
      {
        production: "Produksiya A",
        line: "Liniya 1",
        machineType: "Tip mashin 1",
        quantity: 50,
      },
      {
        production: "Produksiya B",
        line: "Liniya 2",
        machineType: "Tip mashin 2",
        quantity: 70,
      },
    ],
  },
  {
    shift: "2-smena",
    totalQuantity: 90,
    details: [
      {
        production: "Produksiya C",
        line: "Liniya 3",
        machineType: "Tip mashin 1",
        quantity: 40,
      },
      {
        production: "Produksiya D",
        line: "Liniya 4",
        machineType: "Tip mashin 3",
        quantity: 50,
      },
    ],
  },
  {
    shift: "3-smena",
    totalQuantity: 60,
    details: [
      {
        production: "Produksiya E",
        line: "Liniya 2",
        machineType: "Tip mashin 2",
        quantity: 25,
      },
      {
        production: "Produksiya F",
        line: "Liniya 5",
        machineType: "Tip mashin 4",
        quantity: 35,
      },
    ],
  },
  {
    shift: "3-smena",
    totalQuantity: 60,
    details: [
      {
        production: "Produksiya E",
        line: "Liniya 2",
        machineType: "Tip mashin 2",
        quantity: 25,
      },
      {
        production: "Produksiya F",
        line: "Liniya 5",
        machineType: "Tip mashin 4",
        quantity: 35,
      },
    ],
  },
  {
    shift: "3-smena",
    totalQuantity: 60,
    details: [
      {
        production: "Produksiya E",
        line: "Liniya 2",
        machineType: "Tip mashin 2",
        quantity: 25,
      },
      {
        production: "Produksiya F",
        line: "Liniya 5",
        machineType: "Tip mashin 4",
        quantity: 35,
      },
    ],
  },
];

function Row({ row }: { row: ShiftRow }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={60}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
          {row.shift}
        </TableCell>

        <TableCell align="right" sx={{ fontWeight: 600 }}>
          {row.totalQuantity}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Table size="medium" aria-label="shift details">
                <TableHead>
                  <TableRow>
                    <TableCell>Продукция</TableCell>
                    <TableCell>Линия</TableCell>
                    <TableCell>Тип машины</TableCell>
                    <TableCell align="right">Количество</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.details.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell>{detail.production}</TableCell>
                      <TableCell>{detail.line}</TableCell>
                      <TableCell>{detail.machineType}</TableCell>
                      <TableCell align="right">{detail.quantity}</TableCell>
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

export default function CollapsibleShiftTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 1, overflow: "hidden" }}>
      <Table aria-label="collapsible shift table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "" }}>
            <TableCell />
            <TableCell sx={{ fontWeight: 700 }}>Смена</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700 }}>
              Количество
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}