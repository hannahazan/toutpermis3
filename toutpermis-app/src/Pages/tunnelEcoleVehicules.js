import '../css/Navbar.css'
import '../css/tunnelEcoleVehicules.css'
import Burger from '../images/iconsAwesome/bars-solid.svg'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import voiture from '../images/iconsAwesome/car-rear-solid.svg'
import moto from '../images/iconsAwesome/motorcycle-solid.svg'
import bateau from '../images/iconsAwesome/ship-solid.svg'
import arrow from '../images/iconsAwesome/arrow-right-solid.svg'
import { useState,useEffect } from 'react';

function TunneEcoleVehicules(){
    const [Open,setOpen]=useState(false)
    useEffect(()=>{
        console.log(Open)
    })
    return(
        <div className='tunnelFormationVehicules'>
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
            <main className='mainTunnelEcoleVéhicules'>
                <div className='pFormationVéhicules'>
                    <p>Choisis</p>
                    <p className='pVéhicAdap'>le véhicule adapté</p>
                    <p>à ton apprentissage</p>    
                </div>
                <p className='pQuelVéhicules'> Quel véhicule ?</p>
                <div className='containerCardVéhicules'>
                    <button className='PictoEtPara'>
                        <img src={voiture} className='véhicule'></img>
                        <p>Voiture </p>
                        <p>manuelle</p>
                    </button>
                    <button className='PictoEtPara'>
                        <img src={voiture} className='véhicule'></img>
                        <p>Voiture</p>
                        <p>automatique</p>
                    </button>
                </div>
                <div className='containerCardVéhicules'>
                    <button className='PictoEtPara'>
                        <img src={voiture} className='véhicule'></img>
                        <p>Voiture</p>
                        <p>aménagée</p>
                    </button>
                    <button className='PictoEtPara'>
                        <img src={voiture} className='véhicule'></img>
                        <p>Voiturette </p>
                        <p>B1</p>
                    </button>
                </div>
                <div className='containerButtonRechercher'>
                <button className='rechercher'>Rechercher</button>
                </div>
                <a className='containerRevenir'>
                    <img src={arrow} className='arrowRetour'></img>
                    <p>Revenir à l'étape précédente</p>
                </a>
            </main>

        </div>
    )
}

export default TunneEcoleVehicules