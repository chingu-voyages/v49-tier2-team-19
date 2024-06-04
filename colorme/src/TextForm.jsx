import React, { useState } from 'react';
import { getColors } from './groqaiService';
// textform is not taking any props from App, props
// are data from parent to child component
// but we should have that maybe? idk
// if defaults and submit handling were in app.jsx 
// then textform would get these props
// jsx is a syntax that describes the UI, like html
// it allows embedding of javascript expressions

// i'm a custom component
export default function TextForm() {
  const defaultHex = 'DD5537';
  const defaultPrompt = 'my livingroom couch';

  // state management: useState is a hook that allows us to manage state
  // response holds the ai's reponse
  const [response, setResponse] = useState('');
  // hextext holds the input hex code
  const [hexText, setHexText] = useState(defaultHex);
  // describetext holds the phrase input by user
  const [describeText, setDescribeText] = useState(defaultPrompt);
  // add palettes
  const [palettes, setPalettes] = useState(null);
  // palettes will come from json groq ai
  
  // asynchronous function
  const handleSubmit = async () => {
    try {
      const colorsResponse = await getColors(hexText, describeText);
      // set the response directly (string)
      setResponse(colorsResponse);
      // add palettes
      setPalettes(JSON.parse(colorsResponse));
      // from the json from groq ai
    } catch (error) {
      console.error("Error while fetching colors:", error.message);
      // reset response for error
      setResponse('');
    }
  };

const renderPalette = (palette, index) => (

  <div key={index} style={{ marginBottom: '20px' }}>
    <h3>{`Palette ${index + 1}: ${palette.Name}`}</h3>
    <div style={{ display: 'flex', alignItems: 'center' }}>

      <div style={{
        width: '50px',
        height: '50px',
        backgroundColor: hexText,
        margin: '0 5px'
      }}>
      </div>
      {palette.Colors.map((color, idx) => (
        <div key={idx} style={{
          width: '50px',
          height: '50px',
          backgroundColor: color['Hex Code'],
          margin: '0 5px'
        }}>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: `${50 * (palette.Colors.length + 1)}px` }}>
      <span>{describeText}</span>
      {palette.Colors.map((color, idx) => (
        <span key={idx}>{color.Name}</span>
      ))}
    </div>
    <textarea
      value={palette.Description}
      rows={5}
      cols={50}
      readOnly
      style={{ marginTop: '10px' }}
    />
  </div>
);

  // it's jsx
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
      {palettes && Object.values(palettes).map(renderPalette)}
    </div>
  );
}
