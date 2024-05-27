// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// Remove dotenv import and configuration
// import dotenv from 'dotenv';
// dotenv.config();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
