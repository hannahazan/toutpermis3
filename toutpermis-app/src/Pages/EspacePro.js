import '../css/Navbar.css'
import '../css/EspacePro.css'
import Burger from '../images/iconsAwesome/bars-solid.svg'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import Navbar from './Navbar'
import { useState,useEffect } from 'react';

function EspacePro(){
    const [Open,setOpen]=useState(false)
    return(
        <div className='EspacePro'>
            <Navbar />
            <main className='mainEspacePro'>
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
                <div className='paraEspacePro'>
                    <p>
                        Bienvenue sur l’espace réservé<br></br>
                        aux professionnels du permis<br></br>
                        de conduire.
                    </p> 
                    <p>
                        Créez un compte ou accédez<br></br>
                        à votre profil
                    </p>
                </div>
                <div className='buttonEspacePro'>
                    <button className='inscription'> Créer mon compte</button>
                    <button className='connexion'>Me connecter</button>
                </div>
            </main>
        </div>
    )
}

export default EspacePro