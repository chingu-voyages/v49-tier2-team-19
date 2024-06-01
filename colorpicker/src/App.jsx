import { useColor } from "react-color-palette";
import { formatHsv, formatRgba } from "./utils/format/format";
import { ColorPicker } from "./components/ColorPicker/ColorPicker";
import HeaderBar from "./components/HeaderBar";
import './index.css'; // added by isabel may 25 24
import "./App.css";
import TextForm from './TextForm';


// https://serpapi.com/blog/create-super-fast-ai-assistant-with-groq/
// https://www.youtube.com/watch?v=hw_J53MZT4o

// i could put default values here
// i could have a custom submit handler here
// and pass these to textform and that would be 'props'
// 'function components in react define ui elements'

export default function App() {
  const [color, setColor] = useColor("rgb(86 30 203)")
  
  /*
    How to get state:
    RGBA: formatRgba(color.rgb)
    hex: color.hex
    HSV: formatHsv(color.hsv)
  */
  console.log("rgba", formatRgba(color.rgb))
  console.log("hex", color.hex)
  console.log("HSV", formatHsv(color.hsv))


  return (
    <>
      <HeaderBar className="sticky"></HeaderBar>
      <ColorPicker color={color} onChange={setColor} />

      <div>For color recommendations, input a hex code you like and tell me what you need colors for.</div>
      {/* TextForm creates my input boxes and shows output in a textarea*/}
      <TextForm />
    </>
  )
}