// export default function App() {
//     return (
//     <>
//     <div>Hello World</div>
//     </>
//     );
//     }
// App.js
// isabel's may 16 2024 code with the help of
// https://platform.openai.com/docs/guides/text-generation/chat-completions-api
// https://react.dev/reference/react-dom/components/input#
// and chingu's support tickets
// and val's recommendations

// React (also known as React.js or ReactJS) is a free 
// and open-source front-end JavaScript library for 
// building user interfaces based on components.
import React from 'react';

// custom reactd component i created
import TextForm from './TextForm';

// 'function components in react define ui elements'
// define my function
export default function App() {
  // this part holds the html-similar jsx
  return (
    <>
      <div>Isabel's attempt</div>
      <div>See console for output.</div>
      {/* TextForm creates my input boxes*/}
      <TextForm />
    </>
  );
}