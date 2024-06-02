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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const renderPalette = (palette, title) => (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="flex gap-4 mb-2">
        {palette.Colors.map((colorItem, index) => (
          <div key={index} className="text-center">
            <div
              className="w-24 h-24 mb-1"
              style={{
                backgroundColor: colorItem['Hex Code'],
              }}
            />
            <span className="text-sm">{colorItem.Name}</span>
          </div>
        ))}
      </div>
      <textarea
        value={palette.Description}
        rows={5}
        readOnly
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="text-lg mb-4">
        For color recommendations, tell me what these colors are for by typing a description below.
      </div>
      <div className="flex items-center mb-4">
        <label className="mr-2 text-gray-600">Description:</label>
        <input
          value={describeText}
          onChange={(e) => setDescribeText(e.target.value)}
          type="text"
          className="border border-gray-300 p-2 rounded w-full text-gray-600"
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      {loading && (
        <div className="my-4 flex justify-center">
          <ClipLoader color="#123abc" loading={loading} size={50} />
        </div>
      )}
      {palettes.palette1 && renderPalette(palettes.palette1, `Palette 1: ${describeText} (${color.hex})`)}
      {palettes.palette2 && renderPalette(palettes.palette2, `Palette 2: ${describeText} (${color.hex})`)}
    </div>
  );
}
