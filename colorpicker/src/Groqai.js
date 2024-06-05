
/* eslint-disable no-undef */
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY });

export const grocai = async () => {
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
  }
    const pattern = /\{[\s\S]*\}/;
    const match = resp.match(pattern);
    if (match) {
      // console.log(match[0]);
      const jsonObject = JSON.parse(match);
      console.log(jsonObject);
    } else {
      console.log("No valid JSON found.");
    }
}
 catch (error) {
    console.error('Error:', error);
  }
}

grocai();
