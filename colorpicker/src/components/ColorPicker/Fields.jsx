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

  const styleInput = {
    border: "1px solid black"
  }

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
    <div>
      <div>
        <label htmlFor="hex" className="rcp-field-label">
          HEX
        </label>
        <input
          id="hex"
          style={styleInput}
          value={fields.hex.value}
          className="rcp-field-input"
          onChange={onInputChange("hex")}
          onFocus={onInputFocus("hex")}
          onBlur={onInputBlur("hex")}
        />
      </div>
      <div>
        <label htmlFor="rgb" className="rcp-field-label">
          RGB
        </label>
        <input
          id="rgb"
          style={styleInput}
          className="rcp-field-input"
          value={fields.rgb.value}
          onChange={onInputChange("rgb")}
          onFocus={onInputFocus("rgb")}
          onBlur={onInputBlur("rgb")}
        />
      </div>
      <div>
        <label htmlFor="hsv" className="rcp-field-label">
          HSV
        </label>
        <input
          id="hsv"
          style={styleInput}
          className="rcp-field-input"
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
export default Fields