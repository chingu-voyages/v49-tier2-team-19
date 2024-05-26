import { Groq } from "groq-sdk";

// Initialize the Groq instance
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

// Function to get color recommendations
export const getColors = async (hexCode, text) => {
  const adjectives = ['contrasting', 'similar', 'complementary', 'analogous', 'pentadic'];
  try {
    // Initialize an empty string to store the recommendations
    let recommendations = "";

    // Loop through the adjectives
    for (const adj of adjectives) {
      const messages = [
        { role: 'system', content: 'You are a creative assistant, you restate the hex and phrase only, then list 5 hexcodes you recommend only.' },
        { role: 'user', content: `Given the hex code "${hexCode}" and the phrase "${text}", recommend a ${adj} color.` }
      ];

      // Fetch the recommendations from the API
      const response = await groq.chat.completions.create({ messages, model: "llama3-8b-8192" });
      const choice = response.choices[0];
      const recommendedColor = choice.message.content.trim();

      // Append the recommendation to the string
      recommendations += `${adj}: ${recommendedColor}\n`;
    }

    // Return the recommendations string
    return recommendations;
  } catch (error) {
    // Handle any errors
    console.error("Error generating recommended colors:", error.message);
    // Return an empty string or handle the error as needed
    return "";
  }
};
