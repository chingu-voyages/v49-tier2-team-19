import { memo, useCallback, useEffect, useState } from "react";
import { ColorService } from "../../service/color/ColorService.js";
import { formatHsv, formatRgba } from "../../utils/format/format.js";

const Fields = memo(({ color, onChange }) => {
  const [fields, setFields] = useState({
    hex: {
      value: color.hex,
      inputted: false,
    },
    rgb: {
      value: formatRgba(color.rgb),
      inputted: false,
    },
    hsv: {
      value: formatHsv(color.hsv),
      inputted: false,
    },
  });

  useEffect(() => {
    if (!fields.hex.inputted) {
      setFields((fields) => ({ ...fields, hex: { ...fields.hex, value: color.hex } }));
    }
  }, [fields.hex.inputted, color.hex]);

  useEffect(() => {
    if (!fields.rgb.inputted) {
      setFields((fields) => ({ ...fields, rgb: { ...fields.rgb, value: formatRgba(color.rgb) } }));
    }
  }, [fields.rgb.inputted, color.rgb]);

  useEffect(() => {
    if (!fields.hsv.inputted) {
      setFields((fields) => ({ ...fields, hsv: { ...fields.hsv, value: formatHsv(color.hsv) } }));
    }
  }, [fields.hsv.inputted, color.hsv]);

  const onInputChange = useCallback(
    (field) =>
      (event) => {
        const { value } = event.target;

        setFields((fields) => ({ ...fields, [field]: { ...fields[field], value } }));

        if (field === "hsv") onChange(ColorService.convert("hsv", ColorService.toHsv(value)));
        else if (field === "rgb") onChange(ColorService.convert("rgb", ColorService.toRgb(value)));
        else onChange(ColorService.convert("hex", value));
      },
    [onChange]
  );

  const onInputFocus = useCallback(
    (field) =>
      () => {
        setFields((fields) => ({ ...fields, [field]: { ...fields[field], inputted: true } }));
      },
    []
  );

  const onInputBlur = useCallback(
    (field) =>
      () => {
        setFields((fields) => ({ ...fields, [field]: { ...fields[field], inputted: false } }));
      },
    []
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <label htmlFor="hex" className="w-20">HEX</label>
        <input
          id="hex"
          className="border border-gray-300 p-2 rounded w-full"
          value={fields.hex.value}
          onChange={onInputChange("hex")}
          onFocus={onInputFocus("hex")}
          onBlur={onInputBlur("hex")}
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="rgb" className="w-20">RGB</label>
        <input
          id="rgb"
          className="border border-gray-300 p-2 rounded w-full"
          value={fields.rgb.value}
          onChange={onInputChange("rgb")}
          onFocus={onInputFocus("rgb")}
          onBlur={onInputBlur("rgb")}
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="hsv" className="w-20">HSV</label>
        <input
          id="hsv"
          className="border border-gray-300 p-2 rounded w-full"
          value={fields.hsv.value}
          onChange={onInputChange("hsv")}
          onFocus={onInputFocus("hsv")}
          onBlur={onInputBlur("hsv")}
        />
      </div>
    </div>
  );
});

Fields.displayName = 'Fields'
export default Fields;
