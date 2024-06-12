import { memo } from 'react';
import { Saturation, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
import { rgba } from 'polished'
import { formatRgba, formatRgbaCSS } from "../../utils/format/format";
import Fields from './Fields';

export const ColorMe = memo(function ColorMe({color, onChange}) {
  let colorArr = formatRgbaCSS(color.rgb)

  const divStyle = {
    backgroundColor: rgba(...colorArr),
    width: '100px',
    height: '100px',
    padding: '100px'
  }

  const padding = { padding: '0.5rem 0'}

  return (
<div>
        <div style={padding}>
          <div className="w-72 h-72 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full" style={{ clipPath: 'circle(50% at 50% 50%)' }}>
                <Saturation width={288} height={288} color={color} onChange={onChange} />
              </div>
            </div>
          </div>
        </div>

      <div style={padding}>
        <Hue color={color} onChange={onChange} />
      </div>
      
      <div style={padding}>
        <Alpha color={color} onChange={onChange} />
      </div>

      <h1>Color: {formatRgba(color.rgb)}</h1>
      
      <div className="w-24 h-24 rounded-lg" style={{ backgroundColor: rgba(...colorArr) }}></div>


      <Fields color={color} onChange={onChange} />
    </div>
  );
}
)