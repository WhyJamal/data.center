export interface BuildingFeatures {
  energy?: EnergyFeature;
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

export interface EnergyFeature {
  enabled: boolean;
  meters: {
    id: number;
    name: string;
    value: number;
  }[];
}

export type ComponentFeature =
  | ProductionComponent
  | EnergyComponent
  | CustomComponent;

  export interface ProductionComponent {
  type: "production";
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