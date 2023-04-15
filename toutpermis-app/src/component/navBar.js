import Burger from '../images/iconsAwesome/bars-solid.svg'
import { useEffect,useState,createContext,useContext } from 'react'
import {InscriptionContext as InscriptionBoolean} from '../utilitaires/InscriptionContext'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import '../css/Navbar.css'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import photoProfil from'../images/1HloWLLhL3iTrmDtMigiitLB9Qx.jpg'
import { Link } from 'react-router-dom'

function Navbar(){
    const {Inscrit,boolInscription}=useContext(InscriptionBoolean)
    const[Open,setOpen]=useState(false)
    const[Path,setPath]=useState('')
    useEffect(()=>{
        setPath(window.location.pathname)
        console.log(Path)
        console.log(`${Inscrit}depuis navbar depuis profil`)
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
                <Link to='espacepro'><li className='liMenu'>Espace pro</li></Link>
                <li className='liMenu'>Contactez-nous</li>
                <Link to='profil' ><li className='liMenu'>Profil</li></Link>
                </ul>
            </div>}
            {Path==='/connexion'||Path==='/InscriptionChoix'||Path=="/espacepro"||Path=='/espacepro/inscriptionChoix/inscriptionFinale'?
            <navbar className="navbar">
                    <img src={Burger} className="burger" onClick={Open==false?()=>{setOpen(true)}:()=>{setOpen(false)}}></img>
                    <div className={Inscrit===true?'oui':'non'}>
                        <div className="pictoLogoEspaceProNav">
                        <img src={localLogo} className='localLogoPictoProfilNav'></img>
                        <img src={photoProfil} className='profilPictureNav'></img>
                        </div>    
                    </div>  
            </navbar>
            : 
            <navbar className="navbar">
          <img src={Burger} className="burger" onClick={Open==false?()=>{setOpen(true)}:()=>{setOpen(false)}}></img>
          <Link to='/' className={Inscrit===true?"logoParaPicto2":"logoParaPicto"}>
              <div className='picto'>
                  <img src={localLogo} className="LogoSphère"></img>
                  <img src={volant} className="Volant"></img>
              </div>
              <div className="paraLogo">
                  <p className="tout">Tout</p>
                  <p className="permis">permis</p>
              </div>
          </Link>
          <div className={Inscrit===true?'oui':'non'}>
            <div className="pictoLogoEspaceProNav">
            <img src={localLogo} className='localLogoPictoProfilNav'></img>
            <img src={photoProfil} className='profilPictureNav'></img>
            </div>    
          </div>  
        </navbar>
            }

    </div>
    )
}
export default Navbar