import React, { useState } from "react";
import { getColors } from "./groqaiService";
// colorpalette is not taking any props from App, props
// are data from parent to child component
// but we should have that maybe? idk
// if defaults and submit handling were in app.jsx
// then colorpalette would get these props
// jsx is a syntax that describes the UI, like html
// it allows embedding of javascript expressions

// i'm a custom component
export default function ColorPalette() {
  const defaultHex = "aaaaaa";
  const defaultPrompt = "my livingroom couch";

  // state management: useState is a hook that allows us to manage state
  // response holds the ai's reponse
  const [response, setResponse] = useState("");
  // hextext holds the input hex code
  const [hexText, setHexText] = useState("");
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
      setResponse("");
    }
  };

  const renderPalette = (palette, index) => (
    <div key={index} className="ms-2" style={{ marginBottom: "20px" }}>
      <h3 className="ms-2 mb-2">{`Palette ${index + 1}: ${palette.Name}`}</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        {palette.Colors.map((color, idx) => (
          <div key={idx}>
            <div
              className="rounded"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: color["Hex Code"],
                margin: "0 15px",
              }}
            ></div>
            <div
              style={{
                width: "50px",
                margin: "0 15px",
              }}
            >
              <span className="text-sm text-center m-0 p-0" key={idx}>
                {color.Name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <textarea
        className="ms-2 bg-gray-200"
        value={palette.Description}
        rows={5}
        cols={50}
        readOnly
        style={{ marginTop: "10px" }}
      />
    </div>
  );

  // it's jsx
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2">Show me 5 more colors, based on this one, for...</p>
      <div className="flex">
        <input
          className="bg-gray-200 rounded focus:outline-none p-1"
          value={describeText}
          onChange={(e) => setDescribeText(e.target.value)}
          type="text"
        />
        <button style={{ backgroundColor: "#D7305A" }} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <br />
      {palettes && Object.values(palettes).map(renderPalette)}
    </div>
  );
}
