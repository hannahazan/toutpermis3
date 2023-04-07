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
import { useState,useEffect } from 'react';

function InsciptionChoix(){
    const [Open,setOpen]=useState(false)
    

    return(
        <div className='InscriptionChoix'>
            {Open===false?
            <div className='menuEscamotable'>
            </div>:
            <div className='menuEscamotable2'>
                <img src={cross} className='cross' onClick={()=>{setOpen(false)}}></img>
                <ul>
                <li className='liMenu'>Je m'informe</li>
                <li className='liMenu'>Je trouve mon parcours</li>
                <li className='liMenu'>Espace pro</li>
                <li className='liMenu'>Contactez-nous</li>
                </ul>
            </div>}
            <navbar className="navbar">
                <img src={Burger} className="burger" onClick={Open==false?()=>{setOpen(true)}:()=>{setOpen(false)}}></img>    
            </navbar>
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
                    <button className='buttonInscriptionChoix'>
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
                </div>
            </main>
        </div>
        
    )}
     export default InsciptionChoix