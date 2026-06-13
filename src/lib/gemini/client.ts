import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  console.warn("[gemini] GEMINI_API_KEY manquante — les appels réels échoueront.");
}

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
