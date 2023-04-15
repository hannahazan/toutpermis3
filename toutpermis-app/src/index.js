import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './Pages/LandingPage.js';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import TunnelEcole from './Pages/tunnelEcole'
import TunnelEcoleFormation from './Pages/tunnelEcoleFormations'
import TunnelEcoleVehicules from './Pages/tunnelEcoleVehicules'
import EspacePro from './Pages/EspacePro'
import Connexion from  './Pages/Connexion'
import InscriptionChoix from './Pages/InscriptionChoix'
import InscriptionProvider from './utilitaires/InscriptionContext'
import InscriptionFinale  from './Pages/InscriptionFinale'
import Profil from './Pages/Profil';
import PopupInscription from './component/PopupInscription';
import Fiche from './Pages/Fiche'
import { useEffect,useState,useContext } from 'react';
import Navbar from './component/Navbar';

const Path=window.location.pathname
console.log(`${Path} depuis root`)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <InscriptionProvider>
      <Routes>
          <Route path="/"  element={<LandingPage/>}/>
          <Route path="/tunnelEcole" excat element={<TunnelEcole/>}/>
          <Route path="/tunnelEcoleFormation" exact element={<TunnelEcoleFormation/>}></Route>
          <Route path="/tunnelEcoleVehicules" exact element={<TunnelEcoleVehicules/>}></Route>
          <Route path="/espacepro" exact element={<EspacePro/>}></Route>
          <Route path="/connexion" exact element={<Connexion/>}></Route>
          <Route path='/espacepro/inscriptionChoix'  element={<InscriptionChoix/>}></Route>
          <Route path='/espacepro/inscriptionChoix/inscriptionFinale'  element={<InscriptionFinale/>}></Route>
          <Route path='/espacepro/inscriptionChoix/inscriptionFinale/profil'  element={<Profil/>}></Route>
          <Route path='/profil'  element={<Profil/>}></Route>
          <Route path='/espacepro/connexion/profil' element={<Profil/>}></Route>
          <Route path='/testpopup'exact element={<PopupInscription/>}></Route>
          <Route path='/profil/fiche' exact element={<Fiche/>}></Route>
          <Route path='/espacepro/inscriptionChoix/inscriptionFinale/profil/Fiche' exact element={<Fiche/>}></Route>
      </Routes>
    </InscriptionProvider>
  </BrowserRouter>
);


