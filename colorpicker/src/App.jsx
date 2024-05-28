import { useColor } from "react-color-palette";
import { formatHsv, formatRgba } from "./utils/format/format";
import { ColorPicker } from "./components/ColorPicker/ColorPicker"

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
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
          
      <ColorPicker color={color} onChange={setColor} />
    </>
  )
}