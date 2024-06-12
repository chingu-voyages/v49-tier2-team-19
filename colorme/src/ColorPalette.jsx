import React, { useState } from "react";
import { getColors } from "./service/groqaiService";
// colorpalette is not taking any props from App, props
// are data from parent to child component
// but we should have that maybe? idk
// if defaults and submit handling were in app.jsx
// then colorpalette would get these props
// jsx is a syntax that describes the UI, like html
// it allows embedding of javascript expressions

// i'm a custom component
export default function ColorPalette({ color }) {
  console.log({ color });
  const defaultHex = "aaaaaa";
  const defaultPrompt = "my livingroom couch";

  // state management: useState is a hook that allows us to manage state
  // response holds the ai's reponse
  const [response, setResponse] = useState("");
  // describetext holds the phrase input by user
  const [describeText, setDescribeText] = useState(defaultPrompt);
  // add palettes
  const [palettes, setPalettes] = useState(null);
  // palettes will come from json groq ai
  const [errorMessage, setErrorMessage] = useState("");


  // asynchronous function
  const handleSubmit = async () => {
    try {
      console.log({ describeText });
      const colorsResponse = await getColors(color.hex, describeText);
      if (colorsResponse.error) {
        throw new Error(colorsResponse.error);
      }
      setPalettes(colorsResponse);
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error while fetching colors:", error.message);
      setErrorMessage("Failed to fetch color palettes after multiple attempts. Please try again later.");
      setResponse(`Error: ${error.message}`);
    }
  };

  const renderPalette = (palette, index) => (
    <div key={index} className="ms-2 mb-20">
      <h3 className="ms-2 mb-2">{`Palette ${index + 1}: ${palette.Name}`}</h3>
      <div className="flex text-center">
        <p className="mb-1 ms-2 md:text-base text-sm">Your selection:</p>
        <div className="md:ms-5 ms-3 mb-1 self-end">
          <p className="md:ms-3 ms-0 md:text-base text-sm">Our suggestions:</p>
        </div>
      </div>
      <div className="flex">
        {palette.Colors.map((color, idx) => {
          return (
            <div key={idx} className="flex flex-col items-center">
              <div
                className={
                  idx === 0
                    ? "rounded-full md:w-10 md:h-10 w-7 h-7 md:ms-0 ms-5"
                    : idx === 1
                    ? "rounded md:ms-10 md:w-10 md:h-10 ms-14 w-7 h-7"
                    : "rounded md:ms-8 md:w-10 md:h-10 ms-2 w-7 h-7"
                }
                style={{
                  backgroundColor: color["Hex Code"],
                }}
              ></div>
              <div className="md:w-10 md:mx-6 w-5 mx-3">
                <p
                  className={
                    idx === 0
                      ? "md:ms-1 md:text-sm ms-2 text-xs"
                      : idx === 1
                      ? "md:ms-5 md:text-sm ms-6 text-xs"
                      : "md:ms-5 md:text-sm ms-1 text-xs"
                  }
                  key={idx}
                >
                  {color.Name}
                </p>
              </div>
            </div>
          );
        })}
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
    <div className="font-display flex flex-col items-center">
      <p className="mb-2">Show me 5 more colors, based on this one, for...</p>
      <div className="flex">
        <input
          className="bg-gray-200 rounded focus:outline-none p-1"
          placeholder={describeText}
          onChange={(e) => setDescribeText(e.target.value)}
          type="text"
        />
        <button
          className="bg-rose-600 hover:bg-rose-900 text-white text-base rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <br />
      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}
      {palettes && Object.values(palettes).map(renderPalette)}
    </div>
  );
}
