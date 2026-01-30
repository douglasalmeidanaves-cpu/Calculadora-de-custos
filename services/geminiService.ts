
import { VehicleReport, CarRecommendation, InsuranceQuote, BlogPost, TechSpecs, ResaleReport, GroundingSource, FipeReport } from "../types";
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `Você é um Especialista Automotivo Sênior com foco no mercado brasileiro (Vistoriador Online).
Seu objetivo é fornecer custos de manutenção REAIS e ATUALIZADOS.
REGRAS CRÍTICAS:
1. NUNCA retorne 0 (zero) para itens de manutenção básicos. Se não encontrar o valor exato, use a média de mercado para a categoria do veículo.
2. Para 'rawAmount', use sempre um número inteiro (ex: 350).
3. Para 'value', use a string formatada (ex: "R$ 350").
4. Utilize a ferramenta de busca para consultar preços em sites como Canal da Peça, Mercado Livre, e portais automotivos.
5. O campo 'details' deve conter especificações breves (ex: "5W30 Sintético", "Correia Dentada").`;

const parseGeminiResponse = (text: string | undefined) => {
  if (!text) throw new Error("O modelo não retornou conteúdo.");
  try {
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Erro ao dar parse no JSON:", text);
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

// Helper para definir o schema de um item de custo
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
    contents: `Realize uma pesquisa profunda sobre os custos de manutenção do carro: ${userInput}. 
               Gere um relatório detalhado para o mercado brasileiro. 
               Estime valores de peças e mão de obra média.`,
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
    contents: `Estimativa de seguro: ${model} ${year}. Retorne JSON InsuranceQuote.`,
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
    contents: `Melhores carros até R$ ${budget} categoria ${category}. Retorne ARRAY CarRecommendation.`,
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
    contents: `Ficha técnica: ${model}. Retorne JSON TechSpecs.`,
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
    contents: `Análise de revenda: ${modelInput}. Retorne JSON ResaleReport.`,
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
    contents: `Análise de preço Fipe e Mercado para ${model} ano ${year}. Retorne JSON FipeReport.`,
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
    contents: `Busque as 3 notícias automotivas mais RECENTES do Brasil. Retorne ARRAY de JSON BlogPost.`,
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
    contents: `Mensagem motivadora para: "${msg}"`,
    config: { systemInstruction: "Você é um mentor motivacional positivo." }
  });
  return response.text || "Foque no seu progresso!";
};
