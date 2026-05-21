import ProductionChart from "../components/production-chart";
import ProductionTableWrapper from "../components/production-table-wrapper";
import RawMaterialTable from "../components/raw-material-table";
import { ComponentFeature, ProductionType } from "../types/feature.types";

export function renderBuildingComponent(component?: ComponentFeature) {
  if (!component) return null;

  switch (component.type) {
    case ProductionType.PRODUCTION400T:
      return <ProductionTableWrapper type={ProductionType.PRODUCTION400T}/>;
    case ProductionType.PRODUCTION_MACHINE:
      return <ProductionTableWrapper type={ProductionType.PRODUCTION_MACHINE}/>;
    case "DOSING":
      return <RawMaterialTable />;
    default:
      return null;
  }
}