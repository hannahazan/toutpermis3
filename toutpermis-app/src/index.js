import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './Pages/LandingPage.js';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Navbar from './component/navBar';
import TunnelEcole from './Pages/tunnelEcole'
import TunnelEcoleFormation from './Pages/tunnelEcoleFormations'
import TunnelEcoleVehicules from './Pages/tunnelEcoleVehicules'
import EspacePro from './Pages/EspacePro'
import Connexion from  './Pages/Connexion'
import InscriptionChoix from './Pages/InscriptionChoix'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" exact element={<LandingPage />}/>
        <Route path="/tunnelEcole" excat element={<TunnelEcole/>}/>
        <Route path="/tunnelEcoleFormation" exact element={<TunnelEcoleFormation/>}></Route>
        <Route path="/tunnelEcoleVehicules" exact element={<TunnelEcoleVehicules/>}></Route>
        <Route path="/espacePro" exact element={<EspacePro/>}></Route>
        <Route path="/connexion" exact element={<Connexion/>}></Route>
        <Route path="/InscriptionChoix" exact element={<InscriptionChoix/>}></Route>
    </Routes>
  </BrowserRouter>
);


