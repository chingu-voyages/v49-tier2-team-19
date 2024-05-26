import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getColors = async (hexCode, text) => {
  const adjectives = ['warm', 'cool', 'vivid', 'desaturated', 'happy'];
  try {
    console.log("Recommended colors:");
    for (const adj of adjectives) {
      const messages = [
        { role: 'system', content: 'You are a fashionable and creative assistant.' },
        { role: 'user', content: `Given the hex code "${hexCode}" and the phrase "${text}", recommend a ${adj} color.` }
      ];
      const response = await groq.chat.completions.create({ messages, model: "llama3-8b-8192" });
      const choice = response.choices[0];
      const recommendedColor = choice.message.content.trim();
      console.log(`${adj}: ${recommendedColor}`);
    }
  } catch (error) {
    console.error("Error generating recommended colors:", error.message);
  }
};
