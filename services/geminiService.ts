import { GoogleGenAI } from "@google/genai";

// As per instructions, we assume process.env.API_KEY is pre-configured and valid.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY!});

export const generateSeoText = async (topic: string): Promise<string> => {
  console.log(`Generating SEO text for topic: "${topic}"`);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, engaging, and SEO-friendly Facebook post about the following topic: "${topic}". Include relevant hashtags.`,
      config: {
        temperature: 0.7,
        topP: 1,
        topK: 1,
        maxOutputTokens: 200,
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No text generated.");
    }
    return text;
  } catch (error) {
    console.error("Error generating SEO text:", error);
    throw new Error("Failed to generate text from Gemini API.");
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  console.log(`Generating image with prompt: "${prompt}"`);

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9', // Common Facebook post aspect ratio
        },
    });

    const base64ImageBytes = response.generatedImages[0]?.image?.imageBytes;
    if (!base64ImageBytes) {
        throw new Error("No image data received.");
    }

    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image from Gemini API.");
  }
};
