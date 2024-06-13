import { memo } from 'react';
import { Saturation, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
import { rgba } from 'polished'
import { formatRgba, formatRgbaCSS } from "../../utils/format/format";
import Fields from './Fields';

export const ColorMe = memo(function ColorMe({color, onChange}) {
  let colorArr = formatRgbaCSS(color.rgb)

  // const divStyle = {
  //   backgroundColor: rgba(...colorArr),
  //   width: '100px',
  //   height: '100px',
  //   padding: '100px'
  // }
  const circleStyle = {
    backgroundColor: rgba(...colorArr),
    width: '10vmin', // 10%
    height: '10vmin', // 10%
    padding: '10vmin' // 10%
  };

  const padding = { padding: '0.5rem 0'}

  return (
    <div >
      <div style={padding}>
        <div className="relative h-72 rounded-lg overflow-hidden bg-white">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full rounded-lg overflow-hidden">
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
      
      <div style={padding} className="flex justify-center">
        <div className="w-24 h-24 rounded-full" style={circleStyle}></div>
      </div>

      <Fields color={color} onChange={onChange} />
    </div>
  );
}
)