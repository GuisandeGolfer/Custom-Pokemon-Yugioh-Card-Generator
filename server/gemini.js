import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateCardText({ cardStyle, eventName, eventDate, location, people, theme, elementType }) {
  const styleLabel = cardStyle === 'pokemon' ? 'Pokémon' : 'Yu-Gi-Oh!';

  const prompt = `You are a creative trading card game designer. Generate a ${styleLabel} trading card inspired by a real-life event.

Event details:
- Event: ${eventName}
- Date: ${eventDate}
- Location: ${location}
- People involved: ${people}
- Theme/Aesthetic: ${theme}
- Element: ${elementType}

Return ONLY valid JSON (no markdown, no code fences) with these fields:
- cardName: a creative, thematic card name (max 30 characters)
- description: flavor text that weaves the event details into a ${styleLabel}-style card narrative (2-3 sentences)
- level: a number 1-12 representing the card's power level
- stats: { hp: number 50-300, attack: number 30-200, defense: number 30-200 }`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });

  const text = response.text.trim();
  // Strip markdown code fences if present
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  return JSON.parse(cleaned);
}

export async function generateCardImage({ cardStyle, eventName, location, theme, elementType }) {
  const styleLabel = cardStyle === 'pokemon' ? 'Pokémon' : 'Yu-Gi-Oh!';

  const prompt = `Generate an anime-style illustration for a ${styleLabel} trading card.
The scene should depict: "${eventName}" set in ${location}.
Art style: ${theme} aesthetic, ${elementType}-themed, vibrant colors, dynamic composition.
This should look like professional trading card game art — detailed, colorful, and exciting.
Do NOT include any text, borders, or card frames — just the illustration.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: prompt,
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
      imageConfig: { aspectRatio: '1:1' },
    },
  });

  // Extract the image from response parts
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const { mimeType, data } = part.inlineData;
      return `data:${mimeType};base64,${data}`;
    }
  }

  throw new Error('No image returned from Gemini');
}
