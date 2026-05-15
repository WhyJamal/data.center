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
  | CustomComponent
  | DosingComponent;

export type ProductionType = "PRODUCTION400T" | "PRODUCTION_MACHINE"

export type ShiftDetail = {
  production: string;
  line: string;
  machineType: string;
  quantity: number;
};

export type ShiftRow = {
  shift: string;
  totalQuantity: number;
  details: ShiftDetail[];
};

export interface ProductionComponent {
  type: ProductionType;
  data: ShiftRow;
}

export interface RawMaterialItem {
  rawmaterial: string;
  quantity: number;
}

export interface DosingComponent {
  type: "DOSING";
  data: RawMaterialItem[];
};

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