
import { VehicleReport, CarRecommendation, InsuranceQuote, BlogPost, TechSpecs, ResaleReport, GroundingSource, FipeReport } from "../types";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

export const ensureApiKey = async () => {
  if (typeof window.aistudio !== 'undefined' && window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
    }
  }
};

const createAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION = `Você é um Especialista Automotivo Sênior com foco no mercado brasileiro.
Seu objetivo é fornecer dados precisos e atualizados.
Sempre utilize a ferramenta de busca para consultar fontes confiáveis como Quatro Rodas, Motor1 e AutoEsporte.
Garanta que objetos aninhados nunca sejam nulos ou undefined.`;

const parseGeminiResponse = (text: string | undefined) => {
  if (!text) throw new Error("O modelo não retornou conteúdo.");
  try {
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    throw new Error("Não foi possível processar os dados. Tente novamente.");
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

const handleApiCall = async (fn: () => Promise<any>) => {
  try {
    return await fn();
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found") || error.message?.includes("404")) {
      throw new Error("API_KEY_INVALID");
    }
    throw error;
  }
};

export const analyzeVehicle = async (userInput: string): Promise<VehicleReport> => {
  return handleApiCall(async () => {
    await ensureApiKey();
    const ai = createAiClient();
    const response = await ai.models.generateContent({
      model: MAIN_MODEL,
      contents: `Análise técnica e custos para: ${userInput} no Brasil. Retorne JSON VehicleReport.`,
      config: { 
        responseMimeType: "application/json",
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }] 
      }
    });
    const report = parseGeminiResponse(response.text);
    report.sources = extractSources(response);
    return report;
  });
};

export const calculateInsurance = async (model: string, year: number): Promise<InsuranceQuote> => {
  return handleApiCall(async () => {
    await ensureApiKey();
    const ai = createAiClient();
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
  });
};

export const getRecommendations = async (budget: number, category: string): Promise<CarRecommendation[]> => {
  return handleApiCall(async () => {
    await ensureApiKey();
    const ai = createAiClient();
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
  });
};

export const getCarSpecs = async (model: string): Promise<TechSpecs> => {
  return handleApiCall(async () => {
    await ensureApiKey();
    const ai = createAiClient();
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
  });
};

export const analyzeResale = async (modelInput: string): Promise<ResaleReport> => {
  return handleApiCall(async () => {
    await ensureApiKey();
    const ai = createAiClient();
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
  });
};

export const getFipeReport = async (model: string, year: number): Promise<FipeReport> => {
  return handleApiCall(async () => {
    await ensureApiKey();
    const ai = createAiClient();
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
  });
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return handleApiCall(async () => {
    await ensureApiKey();
    const ai = createAiClient();
    const response = await ai.models.generateContent({
      model: MAIN_MODEL,
      contents: `Busque as 3 notícias automotivas mais RECENTES do Brasil. Retorne ARRAY de JSON BlogPost. Use URLs Unsplash contextuais para imageUrl.`,
      config: { 
        responseMimeType: "application/json",
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }] 
      }
    });
    return parseGeminiResponse(response.text);
  });
};

export const getMotivationalMessage = async (msg: string): Promise<string> => {
  return handleApiCall(async () => {
    await ensureApiKey();
    const ai = createAiClient();
    const response = await ai.models.generateContent({
      model: MAIN_MODEL,
      contents: `Mensagem motivadora para: "${msg}"`,
      config: { systemInstruction: "Você é um mentor motivacional positivo." }
    });
    return response.text || "Foque no seu progresso!";
  });
};
