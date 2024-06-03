import React, { useState } from 'react';
import { getColors } from './groqaiService';
// textform is not taking any props from App, props
// are data from parent to child component
// but we should have that maybe? idk
// if defaults and submit handling were in app.jsx 
// then textform would get these props
// jsx is a syntax that describes the UI, like html
// it allows embedding of javascript expressions

// i'm a custom component
export default function TextForm() {
  const defaultHex = 'DD5537';
  const defaultPrompt = 'my livingroom couch';

  // state management: useState is a hook that allows us to manage state
  // response holds the ai's reponse
  const [response, setResponse] = useState('');
  // hextext holds the input hex code
  const [hexText, setHexText] = useState(defaultHex);
  // describetext holds the phrase input by user
  const [describeText, setDescribeText] = useState(defaultPrompt);
  // add palettes
  const [palettes, setPalettes] = useState(null);
  // palettes will come from json groq ai
  
  // asynchronous function
  const handleSubmit = async () => {
    try {
      const colorsResponse = await getColors(hexText, describeText);
      // set the response directly (string)
      setResponse(colorsResponse);
      // add palettes
      setPalettes(JSON.parse(colorsResponse));
      // from the json from groq ai
    } catch (error) {
      console.error("Error while fetching colors:", error.message);
      // reset response for error
      setResponse('');
    }
  };
///////////////////////////////////////////////////////////
///////////////////// palette stuff here //////////////////
///////////////////////////////////////////////////////////
// // render palette function:
// // title
// // row of squares
// // row of names
// // description of palette
///////////////////////////////////////////////////////////
// // declare function, parameters are palette and index
// const renderPalette = (palette, index) => (
// // div holds palette
// // unique key based on the index to help React identify 
// // which items have changed, are added, or are removed.
// // margin will space palettes from each other
//   <div key={index} style={{ marginBottom: '20px' }}>
// //  there are 2 palettes, so index + 1 is the palette number
// //  the name is give by json from ai
//     <h3>{`Palette ${index + 1}: ${palette.Name}`}</h3>
// //  flexbox, align elements horizontally and vertically 
//     <div style={{ display: 'flex', alignItems: 'center' }}>
// //    palette as squares, first square is the hex code input
// //    but is this necessary if it's already on the left in 
// //    the colorme component?
//       <div style={{
//         width: '50px',
//         height: '50px',
//         backgroundColor: hexText,
//         margin: '0 5px'
//       }}>
//       </div>
// //    the squares from the json are here
// //    iterate over the Colors array 
// //    in the palette object, creating a div for each color
// //    using map method
// /////////////////////////////////////////////////////////////////
// // .map method is a higher-order function in JavaScript that   // 
// // creates a new array by calling a provided function (in      //
// // this case, an arrow function) once for each element in the  // 
// // array. It loops through each item in the array              //
// // and lets us transform it into something else.               //
// // for each item in array, call arrow func. to do thing        //
// // thing is: return a JSX element for each color.              //
////////////////////////////////////////////////////////////////////
// //    Colors is a property of palette
// //    Colors holds hexcode and name
//       {palette.Colors.map((color, idx) => (
// //    key={idx}: key prop is used by React to identify 
// //    which items have changed, are added, or are removed. 
// //    Using the index idx as a key ensures each div has a 
// //    unique identifier. DOM needs to know for re-rendering.       
//         <div key={idx} style={{
//           width: '50px',
//           height: '50px',
//           backgroundColor: color['Hex Code'],
//           margin: '0 5px'
//         }}>
//         </div>
// // Integration: div elements above are included in the 
// // renderPalette function, will dynamically generate 
// // the UI for the color squares based on the palette data
//       ))}
//     </div>
// //  color names container, style with flexbox
//     <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: `${50 * (palette.Colors.length + 1)}px` }}>
// //    first name goes with first square, from user
//       <span>{describeText}</span>
// //    next names are from json
//       {palette.Colors.map((color, idx) => (
//         <span key={idx}>{color.Name}</span>
//       ))}
//     </div>
// //  read-only textarea displaying the description of the palette
//     <textarea
//       value={palette.Description}
//       rows={5}
//       cols={50}
//       readOnly
//       style={{ marginTop: '10px' }}
//     />
//   </div>
// );

  // it's jsx
  return (
    <div>
      <label>
        Hex code:&nbsp;
        <input
          value={hexText}
          onChange={e => setHexText(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <label>
        Description:&nbsp; 
        <input
          value={describeText}
          onChange={e => setDescribeText(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
      <br />
      {/*}remove this text area and replace with palettes*/}
      <textarea
        value={response}
        rows={5}
        cols={50}
        readOnly
      />
      {/* {palettes && Object.values(palettes).map(renderPalette))} */}
    </div>
  );
}
