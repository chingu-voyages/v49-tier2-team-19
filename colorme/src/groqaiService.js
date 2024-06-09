/* eslint-disable no-undef */
import Groq from "groq-sdk";

const groq = new Groq({
  // key in .env it's free so who cares if we expose it
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

//export const grocai = async () => {
export const getColors = async (hexCode, description) => {
// name has to say what it does
// this function should only accept these parameters
// this input
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a Color Expert that returns JSON'
        },
        {
          role: 'user',
          content: `Give me a json object: a single palette that holds color five recommendations based on the color ${hexCode} and item to change color ${description} that is exactly in the format:
{"Palette 1":{{"Name":"Color Name of ${hexCode} ","Colors":[{"Hex Code":"${hexCode}","Name":"Color Name of ${hexCode}"}],"Description":"This palette is inspired by..."}}`
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.75,
      max_tokens: 800,
      stream: true
    });
    let resp
  for await (const chunk of chatCompletion) {
     resp += chunk.choices[0]?.delta?.content || ''
    // process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
    const pattern = /\{[\s\S]*\}/;
    const match = resp.match(pattern);
    if (match) {
      console.log(match[0]);
      const jsonObject = JSON.parse(match);
      console.log(jsonObject);
      // remove const and console above
      return match[0]
    } else {
      throw new Error("No valid JSON found.");
    }
}
 catch (error) {
    console.error('Error:', error);
    // throw error;

  }
};

// grocai();
// remove invocation
// function getColors will be invoked 
// by the handleSubmit function 
// of the TextForm component. 
