export function float(value, decimalPlaces) {
    return Math.round(value * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}

//will return RGB Color in string format
export function formatRgba({ r, g, b, a }) {
    const rgb = [Math.round(r), Math.round(g), Math.round(b)];
    const alpha = float(a, 3);
  
    //if (alpha < 1) rgb.push(alpha);
    rgb.push(alpha)
  
    return rgb.join(", ");
}

//will return RGB Color to work with CSS
export function formatRgbaCSS({ r, g, b, a }) {
    const rgb = [Math.round(r), Math.round(g), Math.round(b)];
    const alpha = float(a, 3);
  
    //if (alpha < 1) rgb.push(alpha);
    rgb.push(alpha);
  
    return rgb;
}
  
export function formatHsv({ h, s, v, a }) {
    const hsv = [`${Math.round(h)}°`, `${Math.round(s)}%`, `${Math.round(v)}%`];
    const alpha = float(a, 3);
  
    ///if (alpha < 1) hsv.push(alpha);
    hsv.push(alpha)
  
    return hsv.join(", ");
  }