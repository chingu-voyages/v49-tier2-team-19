
/* eslint-disable no-undef */
// rename to groqaiService.js because of 
// convention
// Naming Conventions:
// Components: PascalCase (e.g., ColorMe.jsx, TextForm.jsx)
// Services: camelCase or kebab-case for filenames (e.g., groqaiService.js)
// Utilities: camelCase or kebab-case for filenames (e.g., format.js)
// Directories: kebab-case or lowercase (e.g., services, components, utils)

import Groq from "groq-sdk";

const groq = new Groq();

export const grocai = async () => {
// export const getColors = async (hexCode, description) => {
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
          content: `Give me two contrast color palettes with 5 colors in each, for my outdoor decor, convert result to JSON like:
{"Palette 1":{"Name":"Desert Dream","Colors":[{"Hex Code":"#FF5733","Name":"Sunset Orange"}],"Description":"This palette is inspired by the vibrant colors of a desert sunset and adds warmth and energy to your outdoor space. The bold oranges and yellows evoke feelings of excitement and joy, while the earthy tones of sienna and terracotta bring a sense of grounding and stability."}}`
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 1,
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
      // console.log(match[0]);
      const jsonObject = JSON.parse(match);
      console.log(jsonObject);
      // remove const and console above
      // return match[0]
    } else {
      console.log("No valid JSON found.");
      // remove above
      // throw new Error("No valid JSON found.");
    }
}
 catch (error) {
    console.error('Error:', error);
    // throw error;

  }
}
// add ;
// };

grocai();
// remove invocation
// function getColors will be invoked 
// by the handleSubmit function 
// of the TextForm component. 
