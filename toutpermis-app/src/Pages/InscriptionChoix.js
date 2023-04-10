import '../css/Navbar.css'
import '../css/EspacePro.css'
import '../css/InscriptionChoix.css'
import Burger from '../images/iconsAwesome/bars-solid.svg'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import steto from '../images/iconsAwesome/stethoscope-solid.svg'
import voiture from '../images/iconsAwesome/car-rear-solid.svg'
import clef from '../images/iconsAwesome/screwdriver-wrench-solid.svg'
import Connexion from './Connexion'
import Navbar from './Navbar'
import { useState,useEffect,useContex } from 'react';
import { Link } from "react-router-dom";

function InsciptionChoix(){
    
    const [test,setTest]=useState('')
    

    return(
        <div className='InscriptionChoix'>
            
            <Navbar/>
            <main className='mainInscriptionChoix'>
                <div className="LogoEspacePro">
                    <div className="pictoLogoEspacePro">
                        <img src={localLogo} className='localLogoPictoEspacePro'></img>
                        <img src={volant} className='volantLogoEspacePro'></img>
                    </div>
                    <div className='pLogoEspacePro'>
                        <p className='ToutLogo'>Tout</p>
                        <p className='PermisLogo'>Permis</p>
                        <p>.fr</p>
                    </div>
                    <p className='espaceProLogo'>espace pro</p>
                </div>
                <p className='pInscriptionChoix'>Inscription</p>
                <p className='pvousêtes'>Vous êtes :</p>
                <div className='containerButtonInscriptionChoix'>
                    <button onClick={()=>{setTest('approve')}} className='buttonInscriptionChoix'>
                        <img src={voiture} className='voiture'></img>
                        <p>Une école de conduite</p>
                    </button>
                    <button className='buttonInscriptionChoix'>
                        <img src={steto} className='moto'></img>
                        <p >Un médecin agréé</p>
                    </button>
                    <button className='buttonInscriptionChoix'>
                        <img src={clef} className='bateau'></img>
                        <p>Un aménageur de Véhicule</p>
                    </button>
                   <Link to='Connexion' className='buttonEtapeSuivante'>
                    Etape suivante
                   </Link>
                </div>
            </main>
        </div>
        
    )}
     export default InsciptionChoix