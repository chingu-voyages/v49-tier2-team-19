import React from 'react';
import ColorMe from './components/ColorMe/ColorMe';
import TextForm from './TextForm';
import './index.css';

export default function App() {
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold no-underline mb-4">Colorme!</h1>
      <div className="flex space-x-4">
        <div className="flex-1">
          <ColorMe />
        </div>
        <div className="flex-1">
          <TextForm />
        </div>
      </div>
    </div>
  );
}
