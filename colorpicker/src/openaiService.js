////////////////////////////////////////////////
// CONFUSION open ai is too talkative         //
////////////////////////////////////////////////
// i want it to always give 5 recommendations //
// as 5 hex codes                             //                            
////////////////////////////////////////////////

import axios from 'axios';

// my precious keyyyyyy
// set up .env and LATER ON
const API_KEY = 'your-key-here';

// axios because i didn't use the create react app with the open ai part
const openaiService = axios.create({
  baseURL: 'https://api.openai.com/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

// this is the hard working function
export const generateRecommendedColors = async (hexCode, text) => {

  // generate colours using adjectives but could also generate mathematically
  // or by some other method. honestly open ai is way to chatty
  // giving way too many colours and sort of a conversational output
  // i only want 5 hex codes back, the original prompt, and a color name like
  // FFFFFF livingroom couch:
  // HAPPY: FFFFF1
  // SAD: FFFFFF2 etc.
  // work starts here
  try {
    // could be any adjectives these are examples
    const adjectives = ['warm', 'cool', 'vivid', 'desaturated', 'happy'];

    console.log("Recommended colors:");

    // iteration over each adjective and generate a recommendation
    for (const adj of adjectives) {
    
    // input prompts for open ai
    // the AI is 'helpful assistant'
    // the user is giving 2 variables and asking for a recommendation
      const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Given the hex code "${hexCode}" and the phrase "${text}", recommend a ${adj} color.` }
      ];

      // request open ai with messages
      const response = await openaiService.post('chat/completions', {
        messages: messages,
        model: 'gpt-4o'
      });

      // tell end user 'recommended colours'
      const choice = response.data.choices[0];
      const recommendedColor = choice.message.content.trim();

      // user messages with adjectives
      console.log(`${adj} ${recommendedColor}`);
    }
  // error handling
  } catch (error) {
    console.error("Error generating recommended colors:", error.message);
  }
};