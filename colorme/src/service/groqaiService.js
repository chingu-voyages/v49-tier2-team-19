/* eslint-disable no-undef */
import Groq from "groq-sdk";

const groq = new Groq({
  // key in .env it's free so who cares if we expose it
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const MAX_RETRIES = 3;


//export const grocai = async () => {
export const getColors = async (hexCode, description, attempt = 1) => {
// name has to say what it does
// this function should only accept these parameters
// this input
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a Color Expert that returns JSON objects. You need to generate a JSON object that contains a single palette with the original hexcode and description and five color recommendations based on a given hex code and description. The JSON object should be exactly in the following format. The Color Name of AdditionalColor1Hex should be the name of that color:
          {
            "Palette": {
              "Name": "${description}",
              "Colors": [
                {"Hex Code": "${hexCode}", "Name": "${description}"},
                {"Hex Code": "AdditionalColor1Hex", "Name": "color name"},
                {"Hex Code": "AdditionalColor2Hex", "Name": "color name"},
                {"Hex Code": "AdditionalColor3Hex", "Name": "color name"},
                {"Hex Code": "AdditionalColor4Hex", "Name": "color name"},
                {"Hex Code": "AdditionalColor5Hex", "Name": "color name"}
              ],
              "Description": "This palette is inspired by ${description}."
            }
          }`
        },
        {
          role: 'user',
          content: `Give me a JSON object: a single palette that holds the original color and five color recommendations based on the color ${hexCode} and item to change color ${description} exactly in the format specified, plus then tell me what you think after the description and inside json.`
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.75,
      max_tokens: 800,
      stream: true
    });
    let resp
  for await (const chunk of chatCompletion) {
     resp += chunk.choices[0]?.delta?.content || '';
    // process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
    const pattern = /\{[\s\S]*\}/;
    const match = resp.match(pattern);
    if (match) {
      try {
        const jsonObject = JSON.parse(match[0]);
        console.log(jsonObject);
        return jsonObject;
      } catch (parseError) {
        console.error('JSON Parse error:', parseError.message);
        if (attempt < MAX_RETRIES) {
          return await getColors(hexCode, description, attempt + 1);
        } else {
          return { error: "Failed to parse JSON after 3 attempts." };
        }
      }
    } else {
      throw new Error("Invalid JSON.");
    }
  } catch (error) {
    console.error('Error:', error);
    if (attempt < MAX_RETRIES) {
      return await getColors(hexCode, description, attempt + 1);
    } else {
      return { error: "Failed to get color palettes. Please try again." };
    }
  }
};