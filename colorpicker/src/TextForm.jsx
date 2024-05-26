import React, { useState } from 'react';
import { getColors } from './groqaiService';

// A UI element created here
export default function TextForm() {
  // Define default state values
  const defaultHex = 'DD5537';
  const defaultPrompt = 'my livingroom couch';
  // useState hook creates state variables and setter functions
  const [hexText, setHexText] = useState(defaultHex);
  const [describeText, setDescribeText] = useState(defaultPrompt);

  // Handles form submission
  const handleSubmit = async () => {
    // Call getColors function with hexText and describeText
    const response = await getColors(hexText, describeText);
    console.log(response); // Check the response from the API
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
    </div>
  );
}
