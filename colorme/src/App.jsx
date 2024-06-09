import { useColor } from "react-color-palette";
import { formatHsv, formatRgba } from "./utils/format/format";
import { ColorMe } from "./components/ColorMe/ColorMe";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import "./index.css"; // added by isabel may 25 24
import "./App.css";
import ColorPalette from "./ColorPalette";

// https://serpapi.com/blog/create-super-fast-ai-assistant-with-groq/
// https://www.youtube.com/watch?v=hw_J53MZT4o

// i could put default values here
// i could have a custom submit handler here
// and pass these to colorpalette and that would be 'props'
// 'function components in react define ui elements'

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
    <>
      <HeaderBar />
      <div className="container">
        <ColorMe color={color} onChange={setColor} />
        <ColorPalette color={color} />
      </div>
      <FooterBar />
    </>
  );
}
