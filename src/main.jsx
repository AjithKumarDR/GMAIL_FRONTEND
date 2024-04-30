import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Toaster} from 'react-hot-toast'
import AuthContextProvider from "./Contexts/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
   <AuthContextProvider>
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
   </AuthContextProvider>,
)
