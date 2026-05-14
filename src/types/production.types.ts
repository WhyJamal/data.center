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

export type TProductionData = {
  yearlySales: YearlySalesData;
  productionOutput: ProductionOutputItem[];
};