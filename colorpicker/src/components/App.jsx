// src/App.js
import React, { useState } from 'react';
import Palette from "./Palette";
import { grocai } from "./src/Groqai";


const App = () => {
  const [palettes, setPallete] = useState([]);
  
  const handleSubmit = async () => {
    try {
      const colorsJSON = await grocai();
      setPallete(new_palettes)
    } catch (error) {
      console.error("Error while fetching colors:", error.message);
      // reset response for error
      setPallete('');
    }
  };
  const new_palettes = [
    // {
    //   Name: "Soothing Oasis",
    //   Colors: [
    //     { "Hex Code": "#FFC499", Name: "Terra Cotta" },
    //     { "Hex Code": "#E5D8B6", Name: "Sand Dune" },
    //     { "Hex Code": "#738373", Name: "Mossy Stone" },
    //     { "Hex Code": "#3A2E26", Name: "Weathered Wood" },
    //   ],
    // },
    // {
    //   Name: "Forest Retreat",
    //   Colors: [
    //     { "Hex Code": "#8B9467", Name: "Forest Floor" },
    //     { "Hex Code": "#455A64", Name: "Rocky Outcropping" },
    //     { "Hex Code": "#969696", Name: "Granite Grey" },
    //     { "Hex Code": "#3E8E41", Name: "Fresh Spruce" },
    //   ],
    // },
  ];

  return (
    // <div style={{ padding: "20px" }}>
    //   {palettes.map((palette) => (
    //     <Palette key={palette.Name} palette={palette} />
    //   ))}
    // </div>
    <div className="container">
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          Submit
        </button>
      </form>
      { palettes.length > 0 ?
        <div style={{ padding: "20px" }}>
          {palettes.map((palette) => (
            <Palette key={palette.Name} palette={palette} />
          ))}
        </div> :
        <h1>How can I help you today?</h1>
      }
    </div>
  );
};

export default App;
