import type { BuildingFeatures } from "./feature.types";

export interface IBuilding {
  id: number;
  name: string;
  type: string;
  description?: string;

  area: number;
  floors: number;

  isUnavailable: boolean;

  geometry: BuildingGeometry;
  visual: BuildingVisual;

  features?: BuildingFeatures;
}

export interface BuildingGeometry {
  polygon: string;
  mx: number;
  my: number;
}

export interface BuildingVisual {
  innerImage?: string;

  zones?: {
    items: BuildingZone[]; 
  };
}

export interface BuildingZone {
  id: number;
  name: string;
  polygon: string;
  isUnavailable?: boolean;
}

