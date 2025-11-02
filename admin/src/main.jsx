import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { StoreContextProvider } from './Context/StoreContext.jsx'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="738939836477-3050a1tgqgu04dtqqalakjk1f81auir8.apps.googleusercontent.com">
  
  <BrowserRouter>
  <StoreContextProvider >
    <App />
    </StoreContextProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
