import '../css/tunnelEcole.css'
import '../css/Navbar.css'
import Burger from '../images/iconsAwesome/bars-solid.svg'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import voiture from '../images/iconsAwesome/car-rear-solid.svg'
import moto from '../images/iconsAwesome/motorcycle-solid.svg'
import bateau from '../images/iconsAwesome/ship-solid.svg'
import arrow from '../images/iconsAwesome/arrow-right-solid.svg'
import { useEffect,useState } from 'react'

function TunnelEcole(){
    const [Open,setOpen]=useState(false)
    return(
        <div className="TunnelEcole">
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
                <img src={Burger} className="burger" onClick={Open==false?()=>{setOpen(true)}:()=>{setOpen(false)}} ></img>
                <div className="logoParaPicto">
                <div className='picto'>
                    <img src={localLogo} className="LogoSphère" ></img>
                    <img src={volant} className="Volant" ></img>
                </div>
                <div className="paraLogo">
                    <p className="tout">Tout</p>
                    <p className="permis">permis</p>
                </div>
                </div>
            </navbar>

            <main className='mainTunnel1'>
                <div className='pTrouveEcole'>
                    <p className='trouve'>Trouve</p>
                    <p className='pEcoleDeConduite'>l'école </p>
                </div>
                <p className='pConduite'>de conduite</p>
                <p className='pAdapte'>adapté à ton besoin</p>
                <p className='pQuelPermis'>Quel permis ?</p>
                <div className='containerButtonPermis'>
                    <button className='buttonPermis'>
                        <img src={voiture} className='voiture'></img>
                        <p>Voiture</p>
                    </button>
                    <button className='buttonPermis'>
                        <img src={moto} className='moto'></img>
                        <p>Moto</p>
                    </button>
                    <button className='buttonPermis'>
                        <img src={bateau} className='bateau'></img>
                        <p>Bateau</p>
                    </button>
                </div>
                <a className='containerRevenir'>
                    <img src={arrow} className='arrowRetour'></img>
                    <p>Revenir à l'étape précédente</p>
                </a>
            </main>
        </div>
    )
}

export default TunnelEcole