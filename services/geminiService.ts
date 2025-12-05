import { VehicleReport } from "../types";

// Helper to format currency
const formatMoney = (val: number) => `R$ ${Math.round(val).toLocaleString('pt-BR')},00`;

// Helper to capitalize words
const capitalize = (str: string) => str.replace(/\b\w/g, char => char.toUpperCase());

// Local Simulation Service (No API Key needed)
export const analyzeVehicle = async (userInput: string): Promise<VehicleReport> => {
  // 1. Simulate Network Delay (1.5s)
  await new Promise(resolve => setTimeout(resolve, 1500));

  const term = userInput.toLowerCase();
  
  // 2. Identify Category Logic
  let multiplier = 1.0; // Base: Intermediate Sedan (e.g. Corolla/Civic)
  let category = "Intermediário";
  let maintenanceLevel = "Moderado";
  let partsAvailability = "Média";
  let transmissionType = "Corrente (Provável)";

  // Heuristics for Cost Multipliers
  if (term.includes("bmw") || term.includes("mercedes") || term.includes("audi") || term.includes("volvo") || term.includes("land rover") || term.includes("porsche")) {
    multiplier = 2.8;
    category = "Premium / Luxo";
    maintenanceLevel = "Caro";
    partsAvailability = "Difícil (Importados)";
    transmissionType = "Corrente";
  } else if (term.includes("toro") || term.includes("hilux") || term.includes("ranger") || term.includes("s10") || term.includes("amarok") || term.includes("diesel") || term.includes("jeep")) {
    multiplier = 1.9;
    category = "Utilitário / SUV Diesel";
    maintenanceLevel = "Caro";
    partsAvailability = "Fácil";
    transmissionType = "Correia Dentada (Maioria)";
  } else if (term.includes("gol") || term.includes("uno") || term.includes("palio") || term.includes("celta") || term.includes("mobi") || term.includes("kwid") || term.includes("hb20") || term.includes("onix")) {
    multiplier = 0.55;
    category = "Popular";
    maintenanceLevel = "Barato";
    partsAvailability = "Muito Fácil";
    transmissionType = "Correia Dentada";
  } else if (term.includes("corolla") || term.includes("civic") || term.includes("sentra") || term.includes("cruze")) {
    multiplier = 1.1;
    category = "Sedan Médio";
    maintenanceLevel = "Moderado";
    partsAvailability = "Fácil";
    transmissionType = "Corrente";
  }

  // 3. Base Costs (Reference: Intermediate Car like Civic/Corolla)
  const baseCosts = {
    oil: 320,
    brakes: 450,
    shocks: 1800,
    tires: 1600,
    battery: 450,
    plugs: 380,
    alignment: 120,
    annualService: 900,
    costPer10k: 600
  };

  // Function to calculate cost with slight randomization to feel "organic"
  const calc = (base: number) => {
    const variation = (Math.random() * 0.2) - 0.1; // +/- 10%
    return Math.round((base * multiplier) * (1 + variation));
  };

  // 4. Analysis Text Generation
  let summary = "";
  let pros = [];
  let cons = [];

  if (maintenanceLevel === "Barato") {
    summary = `O ${capitalize(userInput)} é um veículo extremamente econômico. Com mecânica simples e robusta, as peças são encontradas facilmente em qualquer autopeças, tornando o custo de manutenção um dos mais baixos do mercado brasileiro.`;
    pros = ["Baixo consumo de combustível", "Peças baratas e abundantes", "Alta liquidez na revenda"];
    cons = ["Acabamento simples", "Isolamento acústico inferior"];
  } else if (maintenanceLevel === "Caro") {
    summary = `Como um veículo da categoria ${category}, o ${capitalize(userInput)} exige manutenção especializada. O custo de peças é elevado e recomenda-se estritamente o uso de componentes originais ou de primeira linha para evitar problemas crônicos.`;
    pros = ["Conforto e Tecnologia", "Desempenho superior", "Status e Segurança"];
    cons = ["Peças de reposição caras", "Mão de obra especializada necessária", "Seguro elevado"];
  } else {
    summary = `O ${capitalize(userInput)} apresenta um equilíbrio ideal entre conforto e custo. Considerado um carro "tanque de guerra" em sua categoria, possui manutenção previsível, embora não seja tão barata quanto um popular.`;
    pros = ["Confiabilidade mecânica", "Bom valor de revenda", "Conforto de rodagem"];
    cons = ["Peças de acabamento podem ser caras", "Seguro varia conforme perfil"];
  }

  // 5. Select CTA (Generic, no brand name)
  const ctaOptions = [
    "Quer saber o histórico completo desse carro? Consulte agora a placa e obtenha o laudo.",
    "Evite surpresas: pesquise o histórico completo do veículo antes de fechar negócio.",
    "Antes de comprar, consulte a placa e descubra tudo sobre o veículo.",
    "Faça agora sua consulta completa e tenha uma análise detalhada em segundos."
  ];
  const randomCTA = ctaOptions[Math.floor(Math.random() * ctaOptions.length)];

  // 6. Build Report Object
  return {
    carName: `${capitalize(userInput)} (Estimativa)`,
    costs: {
      oil: { label: "Troca de Óleo + Filtro", value: formatMoney(calc(baseCosts.oil)), rawAmount: calc(baseCosts.oil) },
      brakes: { label: "Pastilhas de Freio", value: formatMoney(calc(baseCosts.brakes)), rawAmount: calc(baseCosts.brakes) },
      shocks: { label: "Amortecedores (Jogo)", value: formatMoney(calc(baseCosts.shocks)), rawAmount: calc(baseCosts.shocks) },
      tires: { label: "Pneus (Jogo)", value: formatMoney(calc(baseCosts.tires)), rawAmount: calc(baseCosts.tires) },
      transmission: { label: "Distribuição", value: "Consultar Manual", rawAmount: 0, details: transmissionType },
      battery: { label: "Bateria", value: formatMoney(calc(baseCosts.battery)), rawAmount: calc(baseCosts.battery) },
      plugs: { label: "Velas", value: formatMoney(calc(baseCosts.plugs)), rawAmount: calc(baseCosts.plugs) },
      alignment: { label: "Alinhamento + Balanc.", value: formatMoney(calc(baseCosts.alignment)), rawAmount: calc(baseCosts.alignment) },
      annualService: { label: "Revisão Anual Média", value: formatMoney(calc(baseCosts.annualService)), rawAmount: calc(baseCosts.annualService) },
      costPer10k: { label: "Custo por 10.000km", value: formatMoney(calc(baseCosts.costPer10k)), rawAmount: calc(baseCosts.costPer10k) },
    },
    analysis: {
      maintenanceLevel,
      partsAvailability,
      pros,
      cons,
      commonIssues: ["Desgaste de suspensão (padrão Brasil)", "Sistema de arrefecimento (verificar)"],
      summary
    },
    ctaText: randomCTA
  };
};