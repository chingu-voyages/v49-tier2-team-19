import React, { memo } from 'react';
import { Saturation, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
import { rgba } from 'polished';
import { formatRgba, formatRgbaCSS } from "../../utils/format/format";
import Fields from './Fields';
import useStore from "../../store/useStore";

const ColorMe = memo(function ColorMe() {
  const { color, setColor } = useStore();
  let colorArr = formatRgbaCSS(color.rgb);

  const divStyle = {
    backgroundColor: rgba(...colorArr),
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="py-2">
        <Saturation height={300} color={color} onChange={setColor} />
      </div>
      <div className="py-2">
        <Hue color={color} onChange={setColor} />
      </div>
      <div className="py-2">
        <Alpha color={color} onChange={setColor} />
      </div>
      <div className="w-48 h-48 mb-4" style={divStyle}></div>
      <Fields color={color} onChange={setColor} />
    </div>
  );
});

export default ColorMe;
