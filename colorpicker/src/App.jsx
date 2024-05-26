// https://serpapi.com/blog/create-super-fast-ai-assistant-with-groq/
// https://www.youtube.com/watch?v=hw_J53MZT4o

import './index.css'; // added by isabel may 25 24
import "./App.css";
import React from 'react';
import TextForm from './TextForm';

// 'function components in react define ui elements'
export default function App() {
  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Colormee!
      </h1>
      <div>For color recommendations, input a hex code you like and tell me what you need colors for.</div>
      {/* TextForm creates my input boxes and shows output in a textarea*/}
      <TextForm />
    </>
  );
}