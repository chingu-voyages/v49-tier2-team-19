// src/Palette.js
import React from "react";
import ColorBox from "./ColorBox";

const Palette = ({ palette }) => {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2 style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
        {palette.Name}
      </h2>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {palette.Colors.map((color) => (
          <ColorBox
            key={color["Hex Code"]}
            hexCode={color["Hex Code"]}
            name={color.Name}
          />
        ))}
      </div>
    </div>
  );
};

export default Palette;
