import React, { useState } from 'react';
import { grocai } from "../Groqai";
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

  // asynchronous function
  const handleSubmit = async () => {
    try {
      const colorsResponse = await grocai();
      // set the response directly (string)
      setResponse(colorsResponse);
    } catch (error) {
      console.error("Error while fetching colors:", error.message);
      // reset response for error
      setResponse('');
    }
  };

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