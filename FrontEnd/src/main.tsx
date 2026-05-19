import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Pastikan ini ada
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>  {/* 2. Pastikan App dibungkus seperti ini */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);