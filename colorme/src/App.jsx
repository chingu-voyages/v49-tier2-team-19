import React from 'react';
import './App.css';
import ColorMe from './components/ColorMe/ColorMe';
import TextForm from './TextForm';

export default function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Colormee!
      </h1>
      <ColorMe />
      <div>For color recommendations, input a hex code you like and tell me what you need colors for.</div>
      <TextForm />
    </>
  );
}
