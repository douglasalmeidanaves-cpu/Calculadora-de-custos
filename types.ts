export interface CostItem {
  label: string;
  value: string; // "R$ X"
  rawAmount: number; // For charts
  details?: string; // e.g., "Corrente" or "Correia"
}

export interface AnalysisData {
  maintenanceLevel: string; // "Barato", "Moderado", "Caro"
  partsAvailability: string;
  pros: string[];
  cons: string[];
  commonIssues: string[];
  summary: string;
}

export interface VehicleReport {
  carName: string;
  costs: {
    oil: CostItem;
    brakes: CostItem;
    shocks: CostItem;
    tires: CostItem;
    transmission: CostItem; // Belt vs Chain
    battery: CostItem;
    plugs: CostItem;
    alignment: CostItem;
    annualService: CostItem;
    costPer10k: CostItem;
  };
  analysis: AnalysisData;
  ctaText: string;
}
