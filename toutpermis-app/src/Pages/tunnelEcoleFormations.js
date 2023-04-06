import '../css/Navbar.css'
import '../css/tunnelEcoleFormation.css'
import Burger from '../images/iconsAwesome/bars-solid.svg'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import Login from '../images/iconsAwesome/user-regular (1).svg'
import arrow from '../images/iconsAwesome/arrow-right-solid.svg'

import voitureFormation from '../images/iconsAwesome/car-rear-solid.svg'
import { useState,useEffect } from 'react';

function TunnelEcoleFormation(){
    const [Open,setOpen]=useState(false)
    return(
        <div className='TunnelEcoleFormation'>

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
            
            <main className='mainTunnelEcoleFormation'>
                <div className='pSelectionneFormation'>
                    <p className='pSelectionne'>Selectionne</p>
                    <p className='pFormation'>la formation</p>
                    <p className='pSouhaite'>qui t'intéresse</p>
                </div>
                <p className='pQuelleFormation'>Quelle formation ?</p>
                <div className='containerSelection1'>
                    <button className='buttonFormation'>
                        <img src={voitureFormation} className='voitureFormation'></img>
                        <p>Permis voiture</p>
                    </button>
                    <button className='buttonFormation'>
                        <img src={voitureFormation} className='voitureFormation'></img>
                        <p>Code voiture</p>
                    </button>
                    <button className='buttonFormation'>
                        <img src={voitureFormation} className='voitureFormation'></img>
                        <p>Les</p>
                        <p>stages</p>
                    </button>
                </div>
                <div className='containerSelection2'>
                    <button className='buttonFormation2'>
                        <img src={voitureFormation} className='voitureFormation'></img>
                        <p>Passerelle</p>
                        <p>boite manuelle</p>
                    </button>
                    <button className='buttonFormation2'>
                        <img src={voitureFormation} className='voitureFormation'></img>
                        <p>Remorque</p>
                        <p>et caravane</p>
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
export default TunnelEcoleFormation