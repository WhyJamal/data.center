"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { EntryRow, EntryRow1 } from "@/app/(root)/security/security.types";

export const columns: ColumnDef<EntryRow>[] = [
  {
    accessorKey: "id",
    header: "N",
    cell: ({ getValue }) => <div className="text-xs font-medium">{getValue<number>()}</div>,
  },
  {
    accessorKey: "period",
    header: "Период",
    cell: ({ getValue }) => (
      <div className="text-xs">{String(getValue()).replace(" ", " ")}</div>
    ),
  },
  {
    accessorKey: "vehicleType",
    header: "Вид транспорта",
    cell: ({ getValue }) => <div className="text-xs">{String(getValue())}</div>,
  },
  {
    accessorKey: "vehicleNumber",
    header: "Номер транспорта",
    cell: ({ getValue }) => <div className="text-xs font-medium">{String(getValue())}</div>,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ getValue }) => (
      <div className="text-xs font-semibold">
        {String(getValue()) === "Вход" ? (
          <span className="text-green-600">{String(getValue())}</span>
        ) : (
          <span className="text-amber-600">{String(getValue())}</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "reason",
    header: "Основание",
    cell: ({ getValue }) => <div className="text-xs truncate max-w-[220px]">{String(getValue())}</div>,
  },
  {
    accessorKey: "registrar",
    header: "Регистратор",
    cell: ({ getValue }) => <div className="text-xs truncate max-w-[180px]">{String(getValue())}</div>,
  },
  {
    accessorKey: "responsible",
    header: "Ответственный",
    cell: ({ getValue }) => <div className="text-xs">{String(getValue())}</div>,
  },
];

export const columns1: ColumnDef<EntryRow1>[] = [
  {
    accessorKey: "id",
    header: "N",
    cell: ({ getValue }) => <div className="text-xs font-medium">{getValue<number>()}</div>,
  },
  {
    accessorKey: "period",
    header: "Период",
    cell: ({ getValue }) => (
      <div className="text-xs">{String(getValue()).replace(" ", " ")}</div>
    ),
  },
  {
    accessorKey: "vehicleNumber",
    header: "Номер транспорта",
    cell: ({ getValue }) => <div className="text-xs font-medium">{String(getValue())}</div>,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ getValue }) => (
      <div className="text-xs font-semibold">
        {String(getValue()) === "Вход" ? (
          <span className="text-green-600">{String(getValue())}</span>
        ) : (
          <span className="text-amber-600">{String(getValue())}</span>
        )}
      </div>
    ),
  },
  
];