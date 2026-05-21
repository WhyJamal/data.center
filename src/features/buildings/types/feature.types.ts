import { IEnergyDevice } from "@/types/energy.types";

export interface BuildingFeatures {
  energy?: IEnergyDevice[];
  cameras?: CameraFeature[];
  component?: ComponentFeature;
}

export type CameraFeatureStatus = "online" | "offline";

export interface CameraFeature {
  location: "left" | "right";
  enabled: boolean;
  id: number;
  name: string;
  streamUrl: string;
  status: CameraFeatureStatus;
}

export type ComponentFeature =
  | ProductionComponent
  | EnergyComponent
  | CustomComponent
  | DosingComponent
  | WarehauseComponent;

export enum ProductionType {
  PRODUCTION400T = "PRODUCTION400T",
  PRODUCTION_MACHINE = "PRODUCTION_MACHINE",
}

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

export enum WarehouseType {
  WAREHOUSE_400T = "WAREHOUSE_400T",
  MACHINE_SHOP = "MACHINE_SHOP",
}

export interface WarehauseComponent {
  type: WarehouseType;
  data: Record<string, any>;
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
