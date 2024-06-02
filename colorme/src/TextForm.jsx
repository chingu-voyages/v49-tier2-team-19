import React, { useState } from 'react';
import { getColors } from './service/groqaiService';
import useStore from './store/useStore';
import { ClipLoader } from 'react-spinners';

export default function TextForm() {
  const color = useStore((state) => state.color);
  const describeText = useStore((state) => state.describeText);
  const setDescribeText = useStore((state) => state.setDescribeText);
  const setRecommendation = useStore((state) => state.setRecommendation);
  const [palettes, setPalettes] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const colorsResponse = await getColors(color.hex, describeText);
      setRecommendation(colorsResponse.recommendation);
      setPalettes({
        palette1: colorsResponse['Palette 1'],
        palette2: colorsResponse['Palette 2']
      });
    } catch (error) {
      console.error('Error while fetching colors:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPalette = (palette, title) => (
    <div>
      <h2>{title}</h2>
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        {palette.Colors.map((colorItem, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <div
              style={{
                backgroundColor: colorItem['Hex Code'],
                width: '50px',
                height: '50px',
                marginBottom: '5px'
              }}
            />
            <span>{colorItem.Name}</span>
          </div>
        ))}
      </div>
      <textarea
        value={palette.Description}
        rows={3}
        cols={50}
        readOnly
        style={{ height: '60px' }}
      />
    </div>
  );

  return (
    <div>
      <label>
        Description:&nbsp;
        <input
          value={describeText}
          onChange={(e) => setDescribeText(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
      <br />
      {loading && (
        <div style={{ margin: '20px 0' }}>
          <ClipLoader color="#123abc" loading={loading} size={50} />
        </div>
      )}
      {palettes.palette1 && renderPalette(palettes.palette1, `Palette 1: ${describeText} (${color.hex})`)}
      {palettes.palette2 && renderPalette(palettes.palette2, `Palette 2: ${describeText} (${color.hex})`)}
    </div>
  );
}
