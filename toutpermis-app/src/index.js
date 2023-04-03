import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './Pages/LandingPage.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './component/navBar';
import TunnelEcole from './Pages/tunnelEcole'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<LandingPage />}/>
      <Route path="/tunnelEcole" excat element={<TunnelEcole/>}/>
    </Routes>
  </BrowserRouter>
);


