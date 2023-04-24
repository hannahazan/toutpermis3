import '../css/Navbar.css'
import '../css/EspacePro.css'
import '../css/InscriptionChoix.css'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import steto from '../images/iconsAwesome/stethoscope-solid.svg'
import voiture from '../images/iconsAwesome/car-rear-solid.svg'
import clef from '../images/iconsAwesome/screwdriver-wrench-solid.svg'
import Navbar from '../component/Navbar'
import { useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { useContext} from 'react' 
import {InscriptionContext as InscriptionChoice} from '../utilitaires/InscriptionContext'


function InsciptionChoix(){ 
    const [Path, setPath]=useState('')
    const {choice,assignChoice}=useContext(InscriptionChoice) 
    console.log(choice)
    useEffect(()=>{
        setPath(window.location.pathname)
        console.log(choice)
    })
    
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
                    <button onClick={()=>{assignChoice('voiture')}} className={choice==='voiture'?'buttonInscriptionChoix2':'buttonInscriptionChoix'}>
                        <img src={voiture} className={choice==='voiture'?'voiture2':'voiture'}></img>
                        <p>Une école de conduite</p>
                    </button>
                    <button onClick={()=>{assignChoice('médecin')}} className={choice==='médecin'?'buttonInscriptionChoix2':'buttonInscriptionChoix'}>
                        <img src={steto} className={choice==='médecin'?'steto2':'moto'}></img>
                        <p >Un médecin agréé</p>
                    </button>
                    <button onClick={()=>{assignChoice('aménageur')}} className={choice==='aménageur'?'buttonInscriptionChoix2':'buttonInscriptionChoix'}>
                        <img src={clef} className={choice==='aménageur'?'bateau2':'bateau'}></img>
                        <p>Un aménageur de Véhicule</p>
                    </button>
                   <Link to='/espacepro/inscriptionChoix/inscriptionFinale' className='buttonEtapeSuivante'>
                    Etape suivante
                   </Link>
                </div>
            </main>
        </div>
        
    )}
     export default InsciptionChoix