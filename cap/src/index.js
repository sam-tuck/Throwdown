import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { AuthProvider } from './context/auth';
import {SettingProvider} from'./context/setting';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
  <SettingProvider> <App /></SettingProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


