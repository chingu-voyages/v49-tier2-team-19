// src/ColorBox.js
import React from "react";

const ColorBox = ({ hexCode, name }) => {
  const boxStyle = {
    backgroundColor: hexCode,
    width: "100px",
    height: "100px",
    // margin: "10px",
    display: "inline-block",
    color: "#fff",
    textAlign: "center",
    lineHeight: "100px",
    fontFamily: "Arial, sans-serif",
    // borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={boxStyle} title={name}>
      {name}
    </div>
  );
};

export default ColorBox;
