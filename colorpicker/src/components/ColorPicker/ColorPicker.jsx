import { memo } from 'react';
import { Saturation, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
import { rgba } from 'polished'
import { formatRgba, formatRgbaCSS } from "../../utils/format/format";
import Fields from './Fields';

export const ColorPicker = memo(function ColorPicker({color, onChange}) {
  let colorArr = formatRgbaCSS(color.rgb)

  const divStyle = {
    backgroundColor: rgba(...colorArr),
    width: '100px',
    height: '100px',
    padding: '100px'
  }

  const padding = { padding: '0.5rem 0'}

  return (
    <div >
      <div style={padding }>
        <Saturation height={300} color={color} onChange={onChange} />
      </div>   

      <div style={padding}>
        <Hue color={color} onChange={onChange} />
      </div>
      
      <div style={padding}>
        <Alpha color={color} onChange={onChange} />
      </div>

      <h1>Color: {formatRgba(color.rgb)}</h1>
      
      <div style={divStyle}>
      </div>

      <Fields color={color} onChange={onChange} />
    </div>
  );
}
)