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
import Localisation from './component/Localisation.js';
import EditBlog from './Pages/EditBlog';
import Messagerie from './Pages/Messagerie';
import ContactMessagerie from './Pages/ContactMessagerie';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');


const Path=window.location.pathname
console.log(`${Path} depuis root`)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <InscriptionProvider>
      <Routes>
          <Route path="/"  element={<LandingPage/>}/>
          <Route path="/tunnelEcole" excat element={<TunnelEcole/>}/>
          <Route path="/Localisation" excat element={<Localisation/>}/>
          <Route path="/tunnelEcoleFormation" exact element={<TunnelEcoleFormation/>}></Route>
          <Route path="/tunnelEcoleVehicules" exact element={<TunnelEcoleVehicules/>}></Route>
          <Route path="/espacepro" exact element={<EspacePro/>}></Route>
          <Route path='/espacepro/inscriptionChoix'  element={<InscriptionChoix/>}></Route>
          <Route path='/espacepro/inscriptionChoix/inscriptionFinale'  element={<InscriptionFinale/>}></Route>
          <Route path='/espacepro/inscriptionChoix/inscriptionFinale/profil'  element={<Profil socket={socket}/>}></Route>
          <Route path='/profil'  element={<Profil socket={socket}/>}></Route>
          <Route path='/espacepro/connexion/profil' element={<Profil/>}></Route>
          <Route path='/testpopup'exact element={<PopupInscription socket={socket}/>}></Route>
          <Route path='/profil/fiche' exact element={<Fiche/>}></Route>
          <Route path='/espacepro/inscriptionChoix/inscriptionFinale/profil/Fiche' exact element={<Fiche/>}></Route>
          <Route path='/connexion' element={<Connexion/>}></Route>
          <Route path='/EditBlog' element={<EditBlog/>}></Route>
          <Route path='/Messagerie' element={<Messagerie socket={socket}/>}></Route>
          <Route path='/ContactMessagerie' element={<ContactMessagerie socket={socket}/>}></Route>
      </Routes>
    </InscriptionProvider>
  </BrowserRouter>
);


