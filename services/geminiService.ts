
import { GoogleGenAI, Type } from '@google/genai';
import { AiResponse } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAppCode = async (prompt: string): Promise<AiResponse> => {
  try {
    const model = 'gemini-2.5-flash';

    const generationPromise = ai.models.generateContent({
      model: model,
      contents: `You are a world-class senior frontend React engineer creating a new web application.
      User prompt: "${prompt}"

      Your task is to:
      1.  Provide a detailed, step-by-step thought process on how to build this application. Explain the component structure and logic.
      2.  List all the files and folders you would create for this React application. Use a flat list of full paths starting from the 'src/' directory.

      Provide the response in a structured JSON format.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            thought: {
              type: Type.STRING,
              description: "Your detailed thought process on how to build the application, including component structure and logic.",
            },
            fileList: {
              type: Type.ARRAY,
              description: "A flat list of full file paths you would create, e.g., ['App.tsx', 'components/Button.tsx'].",
              items: {
                type: Type.STRING,
              },
            },
          },
          required: ['thought', 'fileList'],
        },
      },
    });

    const response = await generationPromise;
    const jsonText = response.text.trim();
    // Sometimes the response might be wrapped in markdown backticks
    const cleanedJsonText = jsonText.replace(/^```json\n|```$/g, '');
    const parsedResponse: AiResponse = JSON.parse(cleanedJsonText);

    return parsedResponse;
  } catch (error) {
    console.error("Error generating app code:", error);
    throw new Error("Failed to get a response from the AI. Please check your API key and try again.");
  }
};
