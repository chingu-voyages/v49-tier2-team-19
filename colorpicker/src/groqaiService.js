import { Groq } from "groq-sdk";

//import.meta.env.VITE_GROQ_API_KEY

// initialize the Groq instance
const groq = new Groq({
  // key in .env it's free so who cares if we expose it
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

// this function gets color recommendations
export const getColors = async (hexCode, text) => {
  const adjectives = ['contrasting pleasantly', 'similar', 'complementary', 'analogous', 'pentradic'];
  try {
    // initialize empty string to store recommendations
    let recommendations = "{";

    // loop through the adjectives: is there a better way to get these?
    // maybe we don't need 25 recommendations (5 adjectives, 5 colors)
    for (const adj of adjectives) {
      const messages = [
        { role: 'system', content: 'You are a fashionable and creative assistant.' },
        { role: 'user', content: `Given the hex code "${hexCode}" and the phrase "${text}", recommend a ${adj} color. Return your response in JSON ONLY. Make sure it has the property named "color" and the value is a hex code, and have a property name "description" with value being the response. Make sure the response is short and gets to the point.` }
      ];

      // fetch recommendations from grok ai API
      const response = await groq.chat.completions.create({ messages, model: "llama3-8b-8192" });
      const choice = response.choices[0];
      const recommendedColor = choice.message.content.trim();

      // append recommendation to string
      recommendations += `${recommendedColor},\n`;

      console.log(recommendations)
    }

    console.log(recommendations)


    recommendations += "}"

    console.log(JSON.parse(recommendations))

    // return  recommendations string
    return recommendations;
  } catch (error) {
    // error handling
    console.error("Error generating recommended colors:", error.message);
    // return an empty string ⋀ handle the error as needed
    return "";
  }
};