import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FormContextProvider from './context/FormContextProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <FormContextProvider>
    <App />
    </FormContextProvider>
    </React.StrictMode>
    
  
    
)
