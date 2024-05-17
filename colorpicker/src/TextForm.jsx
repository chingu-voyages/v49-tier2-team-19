// useState is a hook
// a hook is a function in react 
// that makes state variables in function components
import { useState } from 'react';

// generateRecommendedColors is where the work takes place
import { generateRecommendedColors } from './openaiService';

// a UI element created here
export default function TextForm() {

  // define 2 default state values
  const defaultHex = 'DD5537';
  const defaultPrompt = 'my livingroom couch';

  // useState hook creates 2 state variables
  // and setter functions for these
  const [hexText, setHexText] = useState(defaultHex);
  const [describeText, setDescribeText] = useState(defaultPrompt);

  // takes current values of 2 variables and submits them
  const handleSubmit = async () => {
    await generateRecommendedColors(hexText, describeText);
  };

  // this is what you see on the page
  return (
    <div>
      <label>
        Hex code:
        <input
          value={hexText}
          // arrow function
          // on change is called when user changes input
          // with event object e
          // target value is current value of input
          // setter updates and a new view is rendered
          // the truth is i don't get arrow functions
          // time to call the tutor maybe
          onChange={e => setHexText(e.target.value)}
          type="text"
        />
        {/* can it be on 'enter' */}
        <button onClick={handleSubmit}>
          Submit
        </button>
      </label>
      <br/>
      <label>
        Description:
        <input
          value={describeText}
          onChange={e => setDescribeText(e.target.value)}
          type="text"
        />
      </label>
    </div>
  );
}