// src/TextForm.jsx
import { useState } from 'react';
import { generateRecommendedColors } from './openaiService';

export default function TextForm() {
  const defaultHex = 'DD5537';
  const defaultPrompt = 'my livingroom couch';

  const [hexText, setHexText] = useState(defaultHex);
  const [describeText, setDescribeText] = useState(defaultPrompt);

  const handleSubmit = async () => {
    await generateRecommendedColors(hexText, describeText);
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
        <button onClick={handleSubmit}>Submit</button>
      </label>
      <br/>
      <label>
        Description:
        <input
          value={describeText}
          onChange={e => setDescribeText(e.target.value)}
          type="text"
        />
      </label>
    </div>
  );
}
