import Burger from '../images/iconsAwesome/bars-solid.svg'
import { useEffect,useState, createContext, useContex } from 'react'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import InsciptionChoix from './InscriptionChoix'
import '../css/Navbar.css'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'

function Navbar(){
    const[Open,setOpen]=useState(false)
    const[Path,setPath]=useState('')
    useEffect(()=>{
        setPath(window.location.pathname)
        console.log(Path)
    })
    return(
    <div>
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
            {Path=='/inscriptionchoix/Connexion'||Path==='/inscriptionchoix'||Path=="/espacepro"?
            <navbar className="navbar">
                    <img src={Burger} className="burger" onClick={Open==false?()=>{setOpen(true)}:()=>{setOpen(false)}}></img>    
            </navbar>
            :
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
            }
    </div>
    )
}
export default Navbar