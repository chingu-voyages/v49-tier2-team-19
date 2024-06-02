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
    width: '100px',
    height: '100px',
    padding: '100px'
  };

  const padding = { padding: '0.5rem 0' };

  return (
    <div>
      <div style={padding}>
        <Saturation height={300} color={color} onChange={setColor} />
      </div>
      <div style={padding}>
        <Hue color={color} onChange={setColor} />
      </div>
      <div style={padding}>
        <Alpha color={color} onChange={setColor} />
      </div>
      <h1>Color: {formatRgba(color.rgb)}</h1>
      <div style={divStyle}></div>
      <Fields color={color} onChange={setColor} />
    </div>
  );
});

export default ColorMe;
