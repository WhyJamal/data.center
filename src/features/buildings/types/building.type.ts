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

export interface BuildingZone {
  id: number;
  name: string;
  polygon: string;
  isUnavailable?: boolean;
}

interface ImageVisual {
  type: "IMAGE";
  innerImage?: string;

  zones?: {
    items: BuildingZone[];
  };
}

interface VideoVisual {
  type: "VIDEO";
  videoUrl: string;
  autoplay?: boolean;
}

interface StreamVisual {
  type: "STREAM";
  streamId: string;
  provider: "go2rtc" | "hikvision" | "rtsp";
}

type BuildingVisual =
  | ImageVisual
  | VideoVisual
  | StreamVisual;


