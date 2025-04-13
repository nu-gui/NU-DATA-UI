import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/theme-variables.css'; // Import theme CSS variables
import './styles/tailwind.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
