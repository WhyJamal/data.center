export type TProductionSeriesItem = {
  year: string;
  data: number[];
};

export type TProductionData = {
  months: string[];
  series: TProductionSeriesItem[];
};