import { Saturation, Hue, Alpha, useColor } from "react-color-palette";
import "react-color-palette/css";
import { rgba } from 'polished'
import { formatRgb, formatRgbCSS } from "../../utils/format/format";

export function ColorPicker() {
  const [color, setColor] = useColor("hsl(120 100% 50% / .5)")
  let colorArr = formatRgbCSS(color.rgb)

  const divStyle = {
    backgroundColor: rgba(...colorArr),
    width: '100px',
    height: '100px',
    padding: '100px'
  }

  const padding = { padding: '0.5rem 0'}

  return (
    <div className="custom-layout">
      <div style={padding }>
        <Saturation height={300} color={color} onChange={setColor} />
      </div>   

      <div style={padding}>
        <Hue color={color} onChange={setColor} />
      </div>
      
      <div style={padding}>
        <Alpha color={color} onChange={setColor} />
      </div>

      <h1>Color: {formatRgb(color.rgb)}</h1>
      
      <div style={divStyle}>
      </div>
    </div>
  );
}

/* import { ColorPicker as ColorPickerUI, useColor } from "react-color-palette";
import "react-color-palette/css";

export function ColorPicker() {
  const [color, setColor] = useColor("#561ecb");

  return <ColorPickerUI color={color} onChange={setColor} />;
} */