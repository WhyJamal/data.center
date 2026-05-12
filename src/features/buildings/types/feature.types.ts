import { IEnergyDevice } from "@/types/energy.types";

export interface BuildingFeatures {
  energy?: IEnergyDevice[];
  cameras?: CameraFeature;
  component?: ComponentFeature;
}

export interface CameraFeature {
  enabled: boolean;
  cameras: {
    id: number;
    name: string;
    streamUrl: string;
    status: "online" | "offline";
  }[];
}

export type ComponentFeature =
  | ProductionComponent
  | EnergyComponent
  | CustomComponent;

export type ProductionType = "PRODUCTION400T" | "PRODUCTION_MACHINE"

export interface ProductionComponent {
  type: ProductionType;
  data: {
    chart: {
      label: string;
      value: number;
    }[];
  };
}

export interface EnergyComponent {
  type: "energy";
  data: {
    total: number;
    usage: number;
    unit: string;
  };
}

export interface CustomComponent {
  type: "custom";
  componentName: string;
  data?: Record<string, any>;
}