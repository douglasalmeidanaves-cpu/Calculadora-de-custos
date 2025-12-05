import { GoogleGenAI, Type } from "@google/genai";
import { VehicleReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-2.5-flash";

export const analyzeVehicle = async (userInput: string): Promise<VehicleReport> => {
  const prompt = `
    Você é uma Calculadora Inteligente de Custos de Manutenção Automotiva especializada no mercado brasileiro.
    INPUT DO USUÁRIO: "${userInput}".

    O usuário informará o carro (ex: “Honda Civic 2017”, “Fiesta 1.6 2015”, “Toro 2.0 Diesel 2020”).
    
    SEU OBJETIVO:
    1. Identifique o veículo, sua categoria, motor e perfil de manutenção com base no input.
    2. Gere uma estimativa realista baseada na média nacional (Brasil), considerando peças paralelas de boa qualidade + mão de obra comum.
    3. Retorne os custos detalhados conforme solicitado no JSON schema.

    ITENS CALCULADOS (Estimativas em Reais R$):
    - Troca de óleo + filtro
    - Pastilhas de freio
    - Jogo de amortecedores
    - Jogo de pneus
    - Correia dentada ou corrente (informar qual usa em 'details')
    - Bateria
    - Velas (convencional ou iridium)
    - Alinhamento e balanceamento
    - Revisão anual média
    - Custo médio a cada 10.000 km

    ANÁLISE:
    Explique brevemente se o carro é barato ou caro de manter, facilidade de peças, pontos fortes e fracos.

    Retorne APENAS um JSON válido seguindo estritamente este schema.
    
    Escolha uma CTA (Chamada para ação) aleatória entre estas opções para o campo 'ctaText':
    1. "Quer saber o histórico completo desse carro? Consulte agora a placa no Vistoriador Online."
    2. "Evite surpresas: pesquise o histórico do veículo no Vistoriador Online."
    3. "Antes de comprar, consulte a placa no Vistoriador Online e descubra tudo sobre o veículo."
    4. "Faça agora sua consulta completa no Vistoriador Online e tenha análise detalhada em segundos."
  `;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          carName: { type: Type.STRING, description: "Nome completo e identificado do carro (Ex: Honda Civic G10 2.0 2018)" },
          costs: {
            type: Type.OBJECT,
            properties: {
              oil: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, rawAmount: { type: Type.NUMBER } } },
              brakes: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, rawAmount: { type: Type.NUMBER } } },
              shocks: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, rawAmount: { type: Type.NUMBER } } },
              tires: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, rawAmount: { type: Type.NUMBER } } },
              transmission: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, rawAmount: { type: Type.NUMBER }, details: { type: Type.STRING, description: "Correia ou Corrente" } } },
              battery: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, rawAmount: { type: Type.NUMBER } } },
              plugs: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, rawAmount: { type: Type.NUMBER } } },
              alignment: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, rawAmount: { type: Type.NUMBER } } },
              annualService: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, rawAmount: { type: Type.NUMBER } } },
              costPer10k: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, rawAmount: { type: Type.NUMBER } } },
            }
          },
          analysis: {
            type: Type.OBJECT,
            properties: {
              maintenanceLevel: { type: Type.STRING, description: "Barato, Moderado ou Caro" },
              partsAvailability: { type: Type.STRING, description: "Fácil, Média ou Difícil" },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
              commonIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
              summary: { type: Type.STRING, description: "Resumo explicativo sobre se o carro é caro/barato de manter e pontos de atenção." }
            }
          },
          ctaText: { type: Type.STRING }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Não foi possível gerar a análise.");
  }

  return JSON.parse(response.text) as VehicleReport;
};