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
import Navbar from '../component/Navbar'
import { useState,useEffect } from 'react';

function TunneEcoleVehicules(){
    const [Open,setOpen]=useState(false)
    useEffect(()=>{
        console.log(Open)
    })
    return(
        <div className='tunnelFormationVehicules'>
            <Navbar/>
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