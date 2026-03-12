import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getAgencyInfo() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Extraia as principais informações da VMM Agência do site https://www.agenciavmm.com.br para criar uma landing page. Inclua: Slogan, serviços principais, estatísticas (leads gerados, experiência), depoimentos (se houver), e planos de preços ou pacotes. Retorne em JSON.",
    config: {
      tools: [{ urlContext: {} }],
      responseMimeType: "application/json",
    },
  });
  
  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse agency info", e);
    return {};
  }
}
