import { useColor } from "react-color-palette";
import { formatHsv, formatRgba } from "./utils/format/format";
import { ColorMe } from "./components/ColorMe/ColorMe";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import "./index.css";
import "./App.css";
import ColorPalette from "./ColorPalette";

export default function App() {
  const [color, setColor] = useColor("rgb(86 30 203)");

  /*
    How to get state:
    RGBA: formatRgba(color.rgb)
    hex: color.hex
    HSV: formatHsv(color.hsv)
  */
  console.log("rgba", formatRgba(color.rgb));
  console.log("hex", color.hex);
  console.log("HSV", formatHsv(color.hsv));

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBar />
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 p-4">
          <ColorMe color={color} onChange={setColor} />
        </div>
        <div className="flex-1 p-4">
          <ColorPalette color={color} />
        </div>
      </div>
      <FooterBar />
    </div>
  );
}