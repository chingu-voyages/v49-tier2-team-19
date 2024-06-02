// src/service/groqaiService.js
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  basePath: '/api/openai/v1',
  dangerouslyAllowBrowser: true
});

export const getColors = async (hexCode, description) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a Color Expert that returns JSON',
        },
        {
          role: 'user',
          content: `Give me two contrast color palettes with 5 colors in each, for my ${description} using the color ${hexCode}, convert result to JSON like:
{
  "Palette 1": {
    "Name": "Desert Dream",
    "Colors": [
      {"Hex Code": "#FF5733", "Name": "Sunset Orange"},
      {"Hex Code": "#F7DC6F", "Name": "Desert Sand"},
      {"Hex Code": "#964B00", "Name": "Sienna"},
      {"Hex Code": "#8B4513", "Name": "Cinnamon"},
      {"Hex Code": "#7F7F7F", "Name": "Weathered Wood"}
    ],
    "Description": "This palette is inspired by the vibrant colors of a desert sunset and adds warmth and energy. The bold oranges and yellows evoke feelings of excitement and joy, while the earthy tones of sienna and terracotta bring a sense of grounding and stability."
  },
  "Palette 2": {
    "Name": "Mountain Meadow",
    "Colors": [
      {"Hex Code": "#32CD32", "Name": "Fresh Mint"},
      {"Hex Code": "#66D9EF", "Name": "River Rock"},
      {"Hex Code": "#4682B4", "Name": "Alpine Blue"},
      {"Hex Code": "#3E8E41", "Name": "Forest Floor"},
      {"Hex Code": "#964B00", "Name": "Rustic Wood"}
    ],
    "Description": "Inspired by the serene beauty of a mountain meadow, this palette combines calming greens and blues to create a sense of tranquility and relaxation. The earthy tones of forest floor and rustic wood bring warmth and coziness, while the soft greens and blues evoke a sense of serenity."
  }
}`
        }
      ],
      //model: 'llama3-8b-8192',
      model:  'gemma-7b-it',
      temperature: 1,
      max_tokens: 800,
      stream: true
    });

    let resp = '';  // Initialize response variable correctly

    for await (const chunk of chatCompletion) {
      resp += chunk.choices[0]?.delta?.content || '';
    }

    const pattern = /\{[\s\S]*\}/;
    const match = resp.match(pattern);
    if (match) {
      const jsonObject = JSON.parse(match[0]);  // Parse the matched JSON string
      return jsonObject;
    } else {
      console.log("No valid JSON found.");
      return {};
    }
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
};
