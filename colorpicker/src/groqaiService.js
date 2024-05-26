import { Groq } from "groq-sdk";

// initialize the Groq instance
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

// this function gets color recommendations
export const getColors = async (hexCode, text) => {
  const adjectives = ['contrasting pleasantly', 'similar', 'complementary', 'analogous', 'pentradic'];
  try {
    // initialize empty string to store recommendations
    let recommendations = "";

    // loop through the adjectives: is there a better way to get these?
    // maybe we don't need 25 recommendations (5 adjectives, 5 colors)
    for (const adj of adjectives) {
      const messages = [
        { role: 'system', content: 'You are a fashionable and creative assistant.' },
        { role: 'user', content: `Given the hex code "${hexCode}" and the phrase "${text}", recommend a ${adj} color.` }
      ];

      // fetch recommendations from grok ai API
      const response = await groq.chat.completions.create({ messages, model: "llama3-8b-8192" });
      const choice = response.choices[0];
      const recommendedColor = choice.message.content.trim();

      // append recommendation to string
      recommendations += `${adj}: ${recommendedColor}\n`;
    }

    // return  recommendations string
    return recommendations;
  } catch (error) {
    // error handling
    console.error("Error generating recommended colors:", error.message);
    // return an empty string ⋀ handle the error as needed
    return "";
  }
};
