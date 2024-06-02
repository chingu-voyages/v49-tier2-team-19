import React, { useState } from 'react';
import { getColors } from './service/groqaiService';
import useStore from './store';

const TextForm = () => {
  const color = useStore((state) => state.color);
  const description = useStore((state) => state.description);
  const palettes = useStore((state) => state.palettes);
  const setDescription = useStore((state) => state.setDescription);
  const addPalette = useStore((state) => state.addPalette);
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const colorsResponse = await getColors(color.hex, description);
      setResponse(JSON.stringify(colorsResponse, null, 2));
      addPalette({ palette1: colorsResponse['Palette 1'], palette2: colorsResponse['Palette 2'], description, color });
    } catch (error) {
      console.error("Error while fetching colors:", error.message);
      setResponse('');
    }
  };

  return (
    <div>
      <label>
        Description:&nbsp;
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
      <br />
      {palettes.map((entry, index) => (
        <div key={index}>
          <PaletteDisplay palette={entry.palette1} title={`Palette 1: ${entry.description} (${entry.color.hex})`} />
          <PaletteDisplay palette={entry.palette2} title={`Palette 2: ${entry.description} (${entry.color.hex})`} />
        </div>
      ))}
      <textarea
        value={response}
        rows={5}
        cols={50}
        readOnly
        style={{ marginTop: '10px' }}
      />
    </div>
  );
};

const PaletteDisplay = ({ palette, title }) => (
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
      rows={2}
      cols={50}
      readOnly
      style={{ height: '50px' }} // Set the height of the text area
    />
  </div>
);

export default TextForm;
