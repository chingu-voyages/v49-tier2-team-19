// src/openaiService.js
import axios from 'axios';

// Access the API key using import.meta.env
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openaiService = axios.create({
  baseURL: 'https://api.openai.com/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

export const generateRecommendedColors = async (hexCode, text) => {
  try {
    const adjectives = ['warm', 'cool', 'vivid', 'desaturated', 'happy'];
    console.log("Recommended colors:");

    for (const adj of adjectives) {
      const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Given the hex code "${hexCode}" and the phrase "${text}", recommend a ${adj} color.` }
      ];

      const response = await openaiService.post('chat/completions', {
        messages: messages,
        model: 'gpt-4'
      });

      const choice = response.data.choices[0];
      const recommendedColor = choice.message.content.trim();

      console.log(`${adj} ${recommendedColor}`);
    }
  } catch (error) {
    console.error("Error generating recommended colors:", error.message);
  }
};
