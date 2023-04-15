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
import Navbar from '../component/Navbar'
import { useEffect,useState } from 'react'

function TunnelEcole(){
    const [Open,setOpen]=useState(false)
    return(
        <div className="TunnelEcole">
            <Navbar/>
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