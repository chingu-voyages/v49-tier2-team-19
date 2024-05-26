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
      // set the response directly (string)
      setResponse(colorsResponse);
    } catch (error) {
      console.error("Error while fetching colors:", error.message);
      // reset response for error
      setResponse('');
    }
  };

  return (
    <div>
      <label>
        Hex code:&nbsp;
        <input
          value={hexText}
          onChange={e => setHexText(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <label>
        Description:&nbsp; 
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
      {/* display the response in a text area */}
      <textarea
        value={response}
        rows={5}
        cols={50}
        readOnly
      />
    </div>
  );
}
