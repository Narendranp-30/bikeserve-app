// src/index.js or src/App.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Ensure this line is present to import the styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
