export type YearlySalesSeriesItem = {
  year: string;
  data: number[];
};

export type YearlySalesData = {
  months: string[];
  series: YearlySalesSeriesItem[];
};

export type ProductionOutputItem = {
  month: string;
  name: string;
  amount: number;
};

export type TProductionType = "bottle" | "glass" | "jar";

export type WeeklyProductionOutputItem = {
  title: string;
  type: TProductionType;
  quantity: number;
};

export type WeeklyProductionOutput = {
  week: string;
  items: WeeklyProductionOutputItem[];
}

export type TProductionData = {
  yearlySales: YearlySalesData;
  productionOutput: ProductionOutputItem[];
  weeklyProductionOutput: WeeklyProductionOutput;
};