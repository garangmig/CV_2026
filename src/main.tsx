import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Clarity from '@microsoft/clarity';
import './index.css'
import App from './App.tsx'

// Configuración de Microsoft Clarity
// Reemplaza "YOUR_PROJECT_ID" con el ID de tu proyecto de Clarity
const CLARITY_ID = "v8cukxzxox";
Clarity.init(CLARITY_ID);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
