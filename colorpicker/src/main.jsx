// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
import React from 'react'
// Document Object Model
// listen i need to know what every line is and why
// that's the way it is
import ReactDOM from 'react-dom';
// important because app does everything
import App from './App.jsx'

// make container
// render it inside container
ReactDOM.createRoot(document.getElementById('root')).render(
  // do some strict extra checking on our behalf
  <React.StrictMode>
    {/* app is happening inside the strictness*/}
    <App />
  </React.StrictMode>,
)