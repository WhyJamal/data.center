"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  RotateCw,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EntryRow, EntryRow1 } from "@/app/(root)/security/security.types";
import { DataTable } from "@/components/data-table";
import { columns, columns1 } from "@/components/columns";

const sampleData1: EntryRow[] = [
  {
    id: 1,
    period: "07.02.2025 23:03:26",
    vehicleType: "Железнодорожный",
    vehicleNumber: "ф232ва",
    status: "Вход",
    reason: "Заезд транспорта Ven-00000..",
    registrar: "Заезд транспорта Ven-00000..",
    responsible: "<>",
  },
  {
    id: 2,
    period: "07.02.2025 23:03:40",
    vehicleType: "Железнодорожный",
    vehicleNumber: "авава",
    status: "Вход",
    reason: "Заезд транспорта Ven-00000..",
    registrar: "Заезд транспорта Ven-00000..",
    responsible: "<>",
  },
];

const sampleData2: EntryRow1[] = [
  {
    id: 3,
    period: "08.02.2025 09:12:00",
    vehicleNumber: "A123BC",
    status: "Выход",
  },
  {
    id: 4,
    period: "08.02.2025 09:15:22",
    vehicleNumber: "B555XY",
    status: "Вход",
  },
];

export default function SecurityPage() {
  const [vehicleType, setVehicleType] = useState("");
  const [onTerritory, setOnTerritory] = useState(2);
  const [loaded, setLoaded] = useState(0);
  const [number, setNumber] = useState("");
  const [region, setRegion] = useState("");

  return (
    <div className="min-h-screen bg-white p-4">
      <Card className="shadow-sm mb-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <CardHeader className="py-1">
              <CardTitle className="text-sm text-green-600">Ввод данных</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-xs">
              <div className="space-y-1">
                <Label>Вид транспорта</Label>
                <Select onValueChange={setVehicleType}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Выберите..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truck">Грузовой</SelectItem>
                    <SelectItem value="car">Легковой</SelectItem>
                    <SelectItem value="bus">Автобус</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label>Транспорт</Label>
                  <Input className="h-8 text-xs" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label>Водитель</Label>
                  <Input className="h-8 text-xs" />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Телефон</Label>
                <Input className="h-8 text-xs" placeholder="+998..." />
              </div>
            </CardContent>
          </div>

          <div>
            <CardHeader className="py-1">
              <CardTitle className="text-sm text-green-600">Количество транспорта</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>На территории</Label>
                <Input type="number" value={onTerritory} onChange={(e) => setOnTerritory(Number(e.target.value))} className="h-8 text-xs text-center" />
              </div>
              <div className="space-y-1">
                <Label>Погружено</Label>
                <Input type="number" value={loaded} onChange={(e) => setLoaded(Number(e.target.value))} className="h-8 text-xs text-center" />
              </div>
            </CardContent>
          </div>

          <div>
            <CardHeader className="py-1">
              <CardTitle className="text-sm text-green-600">Распознанный номер</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label>Номер</Label>
                <Input value={number} onChange={(e) => setNumber(e.target.value)} className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <Label>Регион</Label>
                <Input value={region} onChange={(e) => setRegion(e.target.value)} className="h-8 text-xs" />
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      <div className="flex gap-2 mb-4">
        <Button size="sm" variant="outline" className="h-8 text-xs text-black">
          <ArrowDownToLine className="w-3.5 h-3.5 mr-1" /> Вход
        </Button>

        <Button size="sm" className="h-8 text-xs">
          <ArrowUpFromLine className="w-3.5 h-3.5 mr-1" /> Выход
        </Button>

        <Button size="sm" variant="secondary" className="h-8 text-xs">
          <RotateCw className="w-3.5 h-3.5 mr-1" /> Обновить
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 min-w-[420px]">
          
          <div className="overflow-auto">
            <DataTable columns={columns} data={sampleData1} />
          </div>
        </div>

        <div className="w-px bg-slate-200" />

        <div className="flex">
          <div className="overflow-auto">
            <DataTable columns={columns1} data={sampleData2} />
          </div>
        </div>
      </div>
    </div>
  );
}