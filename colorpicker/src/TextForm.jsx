import React, { useState } from 'react';
import { getColors } from './groqaiService';

export default function TextForm() {
  const defaultHex = 'DD5537';
  const defaultPrompt = 'my livingroom couch';

  const [response, setResponse] = useState('');
  const [hexText, setHexText] = useState(defaultHex);
  const [describeText, setDescribeText] = useState(defaultPrompt);

  const handleSubmit = async () => {
    try {
      const colorsResponse = await getColors(hexText, describeText);
      // Set the response directly as it's a string
      setResponse(colorsResponse);
    } catch (error) {
      console.error("Error while fetching colors:", error.message);
      // Reset response if there's an error
      setResponse('');
    }
  };

  return (
    <div>
      <label>
        Hex code:
        <input
          value={hexText}
          onChange={e => setHexText(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <label>
        Description:
        <input
          value={describeText}
          onChange={e => setDescribeText(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
      <br />
      {/* Display the response in a text area */}
      <textarea
        value={response}
        rows={5}
        cols={50}
        readOnly
      />
    </div>
  );
}
