import React from 'react';
import ColorMe from "./components/ColorMe/ColorMe";
import './index.css';
import "./App.css";
import TextForm from './TextForm';
import useStore from './store/useStore';

export default function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Colorme!
      </h1>
      <ColorMe />
      <div>For color recommendations, input a description and tell me what you need colors for.</div>
      <TextForm />
    </div>
  );
}
