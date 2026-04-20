
export interface Building {
  id: number;
  name: string;
  type: string;
  area: number;
  floors: number;
  polygon: string;
  innerImage?: string;
  description?: string;
  units?: number;
  isUnavailable: boolean;
  mx: number;
  my: number;
}

export const buildings: Building[] = [
  {
    id: 1,
    name: "Производство",
    type: "400т цех",
    area: 8640,
    floors: 1,
    polygon: "11.7,7.6 11.1,9 10.1,12.5 10.1,13.2 5.6,28.6 6.1,29.5 21.9,30.5 22.2,28.4 29.3,28.6 31.8,17.8 34.6,17.8 34.7,15.3 39.5,15.3 39.3,18.4 39.7,19.3 43,19.3 43.4,15.8 44.8,15.8 44.5,19 49.8,19.6 50,17.4 58.1,17.5 58.6,11.5 58.5,10.6 51.2,10.3 51.1,10.8 32.7,9.4 32.6,9.1",
    mx: 27,
    my: 11,
    innerImage: "/factory/inside/lines.png",
    isUnavailable: false,
  },
  {
    id: 2,
    name: "Склад",
    type: "Склад",
    area: 3150,
    floors: 1,
    polygon: "35.8,39.2 35.3,41.7 35.2,45 35.4,46 57.8,44.9 57.8,40.7 57.6,38",
    innerImage: "/factory/inside/lines.png",
    mx: 45,
    my: 40,
    isUnavailable: false,
  },
  {
    id: 3,
    name: "Производство",
    type: "200т цех",
    area: 720,
    floors: 1,
    polygon: "27.2,55.1 25.5,68.5 26,69.7 57.8,68 57.6,66.7 57.8,56.5 45.2,56.9 45.4,54.7 44.8,54",
    innerImage: "/factory/inside/lines.png",
    mx: 42,
    my: 60,
    isUnavailable: true,
  },
  {
    id: 4,
    name: "Дозировочный корпус",
    type: "Дозировочно-смесительный цех",
    area: 1920,
    floors: 1,
    polygon: "30.6,77.7 29.8,83.2 30.1,84 29.7,85.4 29.9,87.8 43.8,87 44.2,87.7 60.2,86.8 59.8,74.4 53.2,74.3 53.2,73.7 52.8,73.5 49,73.5 44,73.6 43.7,76.7",
    innerImage: "/factory/inside/lines.png",
    mx: 41,
    my: 80,
    isUnavailable: false,
  },
  {
    id: 5,
    name: "Производство",
    type: "Машинный цех",
    area: 5380,
    floors: 1,
    polygon: "81.1,41.9 77.1,41.9 76.9,42.1 68.5,42.6 68.7,46.7 64.6,46.7 65.6,69.7 65.9,70.3 70.5,70.1 70.7,75.2 66.2,75.7 66.5,81.8 66.3,82.6 71.2,82.4 71.5,82 85.3,81.2 86,80.1 84.3,68.2 83.9,68.4 81.4,46.6 81.6,45.9",
    innerImage: "/factory/inside/lines.png",
    mx: 75,
    my: 52,
    isUnavailable: false,
  },
  {
    id: 6,
    name: "Главный комплекс",
    type: "Штаб-квартира",
    area: 5400,
    floors: 3,
    polygon: "91.1,41.7 88.5,41.6 87.9,43 89.6,53 89.9,52.4 90,53.2 91.5,62.5 91.5,62.6 93.4,62.4 92,53.3 93,52.4",
    innerImage: "/factory/inside/lines.png",
    mx: 90,
    my: 45,
    isUnavailable: false,
  },
];