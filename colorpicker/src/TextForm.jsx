import React, { useState } from 'react';
import { getColors } from './groqaiService';

// A UI element created here
export default function TextForm() {
  // Define default state values
  const defaultHex = 'DD5537';
  const defaultPrompt = 'my livingroom couch';
  
  // Define state to store the response from the API
  const [response, setResponse] = useState('');

  // useState hook creates state variables and setter functions
  const [hexText, setHexText] = useState(defaultHex);
  const [describeText, setDescribeText] = useState(defaultPrompt);

  // submit handling
  const handleSubmit = async () => {
    try {
      // Call getColors function with hexText and describeText
      const colorsResponse = await getColors(hexText, describeText);
      if (colorsResponse) {
        // Update state with the response
        setResponse(colorsResponse); 
      } else {
        // Handle case where colorsResponse is undefined
        console.error("Error: Empty response received from getColors");
      }
    } catch (error) {
      // Handle any errors
      console.error("Error while fetching colors:", error.message);
    }
  };
  
  
  // Render the form
  return (
    <div>
      <label>
        Hex code:
        <input
          value={hexText}
          id="hexText"
          onChange={e => setHexText(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <label>
        Description:
        <input
          value={describeText}
          id="describeText"
          onChange={e => setDescribeText(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
      <br />
      {/* Display the response in a text box */}
      <textarea
        backgroundcolor="red"
        value={response}
        rows={5}
        cols={50}
        readOnly
      />
    </div>
  );
}
