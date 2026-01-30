import { VehicleReport, CarRecommendation, InsuranceQuote, BlogPost, TechSpecs, ResaleReport, GroundingSource, FipeReport } from "../types";
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `Você é um Especialista Automotivo Sênior com foco no mercado brasileiro (Vistoriador Online).
Seu objetivo é fornecer custos de manutenção REAIS e ATUALIZADOS.

REGRAS OBRIGATÓRIAS PARA VALORES:
1. JAMAIS retorne 0 (zero) ou "N/A" para itens como Óleo, Freios, Pneus ou Bateria.
2. Se não encontrar o valor exato da peça para o modelo específico, use a MÉDIA DE MERCADO de carros da mesma categoria (Ex: Se for um Corolla, use preços de Sedans Médios).
3. 'rawAmount' deve ser um NÚMERO INTEIRO (ex: 450).
4. 'value' deve ser a string formatada em Reais (ex: "R$ 450").
5. Realize uma busca no Google Search para verificar os preços mais recentes em sites como Mercado Livre, Canal da Peça ou portais de notícias automotivas.
6. Forneça detalhes técnicos reais no campo 'details' (ex: "5W30 Sintético", "Bateria 60Ah").`;

const parseGeminiResponse = (text: string | undefined) => {
  if (!text) throw new Error("O modelo não retornou conteúdo.");
  try {
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Erro ao processar JSON da IA:", text);
    throw new Error("Erro de processamento de dados.");
  }
};

const extractSources = (response: GenerateContentResponse): GroundingSource[] => {
  const sources: GroundingSource[] = [];
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  if (chunks && Array.isArray(chunks)) {
    chunks.forEach((chunk: any) => {
      if (chunk.web && chunk.web.uri && chunk.web.title) {
        sources.push({ title: chunk.web.title, uri: chunk.web.uri });
      }
    });
  }
  return sources;
};

const MAIN_MODEL = 'gemini-3-flash-preview';

const costItemSchema = {
  type: Type.OBJECT,
  properties: {
    label: { type: Type.STRING },
    value: { type: Type.STRING },
    rawAmount: { type: Type.NUMBER },
    details: { type: Type.STRING }
  },
  required: ["label", "value", "rawAmount"]
};

export const analyzeVehicle = async (userInput: string): Promise<VehicleReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const response = await ai.models.generateContent({
    model: MAIN_MODEL,
    contents: `PESQUISE AGORA: Quais os custos de manutenção preventiva e corretiva para o veículo ${userInput} no Brasil em 2024/2025? 
               Não aceite valores zerados. Se necessário, estime com base em componentes compatíveis.
               Retorne o relatório técnico completo em JSON.`,
    config: { 
      responseMimeType: "application/json",
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          carName: { type: Type.STRING },
          costs: {
            type: Type.OBJECT,
            properties: {
              oil: costItemSchema,
              brakes: costItemSchema,
              shocks: costItemSchema,
              tires: costItemSchema,
              transmission: costItemSchema,
              battery: costItemSchema,
              plugs: costItemSchema,
              alignment: costItemSchema,
              annualService: costItemSchema,
              costPer10k: costItemSchema
            }
          },
          analysis: {
            type: Type.OBJECT,
            properties: {
              maintenanceLevel: { type: Type.STRING },
              partsAvailability: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
              summary: { type: Type.STRING },
              commonIssues: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    severity: { type: Type.STRING }
                  }
                }
              }
            }
          },
          ctaText: { type: Type.STRING }
        },
        required: ["carName", "costs", "analysis", "ctaText"]
      }
    }
  });
  const report = parseGeminiResponse(response.text);
  report.sources = extractSources(response);
  return report;
};

export const calculateInsurance = async (model: string, year: number): Promise<InsuranceQuote> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const response = await ai.models.generateContent({
    model: MAIN_MODEL,
    contents: `Simule os custos de seguro para: ${model} ${year} no Brasil. Utilize dados de mercado. Retorne JSON InsuranceQuote.`,
    config: { 
      responseMimeType: "application/json",
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }] 
    }
  });
  const quote = parseGeminiResponse(response.text);
  quote.sources = extractSources(response);
  return quote;
};

export const getRecommendations = async (budget: number, category: string): Promise<CarRecommendation[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const response = await ai.models.generateContent({
    model: MAIN_MODEL,
    contents: `Busque no mercado de usados os melhores carros até R$ ${budget} na categoria ${category}. Retorne ARRAY de CarRecommendation em JSON.`,
    config: { 
      responseMimeType: "application/json",
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }] 
    }
  });
  const recommendations = parseGeminiResponse(response.text);
  const sources = extractSources(response);
  return recommendations.map((item: any) => ({ ...item, sources }));
};

export const getCarSpecs = async (model: string): Promise<TechSpecs> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const response = await ai.models.generateContent({
    model: MAIN_MODEL,
    contents: `Ficha técnica detalhada Inmetro/Fabricante: ${model}. Retorne JSON TechSpecs.`,
    config: { 
      responseMimeType: "application/json",
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }] 
    }
  });
  const specs = parseGeminiResponse(response.text);
  specs.sources = extractSources(response);
  return specs;
};

export const analyzeResale = async (modelInput: string): Promise<ResaleReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const response = await ai.models.generateContent({
    model: MAIN_MODEL,
    contents: `Analise a facilidade de revenda e desvalorização para: ${modelInput}. Retorne JSON ResaleReport.`,
    config: { 
      responseMimeType: "application/json",
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }] 
    }
  });
  const report = parseGeminiResponse(response.text);
  report.sources = extractSources(response);
  return report;
};

export const getFipeReport = async (model: string, year: number): Promise<FipeReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const response = await ai.models.generateContent({
    model: MAIN_MODEL,
    contents: `Consulte o valor da Tabela Fipe e média de mercado para: ${model} ${year}. Retorne JSON FipeReport.`,
    config: { 
      responseMimeType: "application/json",
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }] 
    }
  });
  const report = parseGeminiResponse(response.text);
  report.sources = extractSources(response);
  return report;
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const response = await ai.models.generateContent({
    model: MAIN_MODEL,
    contents: `Busque no Google as 3 notícias automotivas mais RECENTES (últimas 24h/semana) do Brasil. Retorne ARRAY de JSON BlogPost.`,
    config: { 
      responseMimeType: "application/json",
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }] 
    }
  });
  return parseGeminiResponse(response.text);
};

export const getMotivationalMessage = async (msg: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const response = await ai.models.generateContent({
    model: MAIN_MODEL,
    contents: `Crie uma mensagem curta e motivadora respondendo a: "${msg}"`,
    config: { systemInstruction: "Você é um mentor positivo e empático." }
  });
  return response.text || "Continue firme em seus objetivos!";
};