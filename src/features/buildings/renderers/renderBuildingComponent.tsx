import ProductionChart from "../components/production-chart";
import ProductionTableWrapper from "../components/production-table-wrapper";
import RawMaterialTable from "../components/raw-material-table";
import { ComponentFeature } from "../types/feature.types";

export function renderBuildingComponent(component?: ComponentFeature) {
  if (!component) return null;

  switch (component.type) {
    case "PRODUCTION400T":
      return <ProductionTableWrapper type="PRODUCTION400T"/>;
    case "PRODUCTION_MACHINE":
      return <ProductionTableWrapper type="PRODUCTION_MACHINE"/>;
    case "DOSING":
      return <RawMaterialTable />;
    default:
      return null;
  }
}