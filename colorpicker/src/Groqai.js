
/* eslint-disable no-undef */
import Groq from 'groq-sdk';

const groq = new Groq();

// async function grocai() {
//   try {
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a Color Expert.'
//         },
//         {
//           role: 'user',
//           content: `Give me two contrast color palettes with 5 colors in each, for my outdoor decor, return result as JSON like:
// {
//   "Palette 1": {
//     "Name": "Desert Dream",
//     "Colors": [
//       { "Hex Code": "#FF5733", "Name": "Sunset Orange" },
//       { "Hex Code": "#FFC300", "Name": "Golden Sands" },
//       { "Hex Code": "#C70039", "Name": "Crimson Peak" },
//       { "Hex Code": "#900C3F", "Name": "Mystic Maroon" },
//       { "Hex Code": "#581845", "Name": "Deep Plum" }
//     ],
//     "Description": "This palette is inspired by the vibrant colors of a desert sunset and adds warmth and energy to your outdoor space. The bold oranges and yellows evoke feelings of excitement and joy, while the earthy tones of sienna and terracotta bring a sense of grounding and stability."
//   }}`
//         }
//       ],
//       model: 'llama3-8b-8192', // Make sure this is the correct model name
//       temperature: 1,
//       max_tokens: 500,
//       stream: true
//     });
//     let resp
//   for await (const chunk of chatCompletion) {
//      resp += chunk.choices[0]?.delta?.content || ''
//     // process.stdout.write(chunk.choices[0]?.delta?.content || '');
//   }
//     // console.log(JSON.parse(resp));
//     // console.log(resp);
//     const pattern = /\{[\s\S]*\}/;
//     const match = resp.match(pattern);
//     if (match) {
//       console.log(match[0]);
//     } else {
//       console.log("No valid JSON found.");
//     }
// }
//  catch (error) {
//     console.error('Error:', error);
//   }
// }
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
          content: `Given the hex code B9FFD6 and the phrase 'for my living room', recommend 2 complementary color palette with 5 colors in each, convert result to JSON like:
{"Palette 1":{"Name":"Desert Dream","Colors":[{"Hex Code":"#FF5733","Name":"Sunset Orange"}],"Description":"This palette is inspired by the vibrant colors of a desert sunset and adds warmth and energy to your outdoor space. The bold oranges and yellows evoke feelings of excitement and joy, while the earthy tones of sienna and terracotta bring a sense of grounding and stability."}}`
        }
      ],
      model: 'llama3-70b-8192', // Make sure this is the correct model name
      temperature: 1,
      max_tokens: 800,
      stream: true
    });
    let resp
  for await (const chunk of chatCompletion) {
     resp += chunk.choices[0]?.delta?.content || ''
    // process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
    // console.log(JSON.parse(resp));
    // console.log(resp);
    const pattern = /\{[\s\S]*\}/;
    const match = resp.match(pattern);
    if (match) {
      // console.log(match[0]);
      const jsonObject = JSON.parse(match);
      console.log(jsonObject);
      // console.log(jsonObject["Palette 1"].Name);
      // console.log(jsonObject["Palette 2"].Colors[0].Name); 
      // console.log(jsonObject["Palette 2"].Description)
    } else {
      console.log("No valid JSON found.");
    }
}
 catch (error) {
    console.error('Error:', error);
  }
}

grocai();
