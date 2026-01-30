
export interface GroundingSource {
  title: string;
  uri: string;
}

export interface CostItem {
  label: string;
  value: string; // "R$ X"
  rawAmount: number; // For charts
  details?: string; // e.g., "Corrente" or "Correia"
}

export interface CommonIssue {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface AnalysisData {
  maintenanceLevel: string; // "Barato", "Moderado", "Caro"
  partsAvailability: string;
  pros: string[];
  cons: string[];
  commonIssues: CommonIssue[];
  summary: string;
}

export interface VehicleReport {
  carName: string;
  costs: {
    oil: CostItem;
    brakes: CostItem;
    shocks: CostItem;
    tires: CostItem;
    transmission: CostItem;
    battery: CostItem;
    plugs: CostItem;
    alignment: CostItem;
    annualService: CostItem;
    costPer10k: CostItem;
  };
  analysis: AnalysisData;
  ctaText: string;
  sources?: GroundingSource[];
}

export interface CarRecommendation {
  model: string;
  avgPrice: number;
  yearRange: string;
  pros: string[];
  cons: string[];
  verdict: string;
  maintenanceScore: 'Baixo' | 'Médio' | 'Alto';
  liquidityScore: 'Alta' | 'Média' | 'Baixa';
  sources?: GroundingSource[];
}

export interface InsuranceQuote {
  carModel: string;
  year: number;
  estimatedValue: number;
  annualCostMin: number;
  annualCostMax: number;
  monthlyCostAverage: number;
  riskCategory: 'Baixo' | 'Médio' | 'Alto';
  mainFactors: string[];
  coverageDetails: {
    label: string;
    included: boolean;
  }[];
  sources?: GroundingSource[];
}

export interface TechSpecs {
  modelName: string;
  yearRef: string;
  engine: {
    type: string;
    valves: string;
    fuel: string;
    power: string;
    torque: string;
    displacement: string;
    aspiration: string;
  };
  transmission: {
    type: string;
    gears: string;
    traction: string;
  };
  performance: {
    maxSpeed: string;
    zeroToHundred: string;
  };
  dimensions: {
    length: string;
    width: string;
    height: string;
    wheelbase: string;
    weight: string;
    trunk: string;
    tank: string;
    groundClearance: string;
  };
  consumption: {
    cityEthanol: string;
    roadEthanol: string;
    cityGas: string;
    roadGas: string;
  };
  chassis: {
    frontSuspension: string;
    rearSuspension: string;
    frontBrakes: string;
    rearBrakes: string;
    steering: string;
    tires: string;
  };
  sources?: GroundingSource[];
}

export interface ResaleReport {
  modelName: string;
  liquidityStatus: 'Excelente' | 'Boa' | 'Média' | 'Ruim' | 'Péssima';
  score: number;
  avgTimeToSell: string;
  depreciation1Year: string;
  marketVerdict: string;
  positivePoints: string[];
  negativePoints: string[];
  sources?: GroundingSource[];
}

/**
 * FipeReport interface for car price analysis
 */
export interface FipeReport {
  model: string;
  year: number;
  referenceMonth: string;
  fipePrice: number;
  variationCode: number;
  variationValue: string;
  marketAverage: number;
  marketMin: number;
  marketMax: number;
  history: {
    month: string;
    price: number;
  }[];
  sources?: GroundingSource[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'Lançamento' | 'Mercado' | 'Dicas' | 'IPVA';
  date: string;
  imageUrl: string;
  readTime: string;
  sourceUrl: string;
}

export type AppView = 'home' | 'calculator' | 'comparison' | 'insurance' | 'conversation' | 'affiliate' | 'blog' | 'specs' | 'resale' | 'fipe';
