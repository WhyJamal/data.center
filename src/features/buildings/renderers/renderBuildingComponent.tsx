import ProductionChart from "../components/production-chart";
import { ComponentFeature } from "../types/feature.types";

export function renderBuildingComponent(component?: ComponentFeature) {
  if (!component) return null;

  switch (component.type) {
    case "production":
      return <ProductionChart />;
    default:
      return null;
  }
}