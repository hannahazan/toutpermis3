import Burger from '../images/iconsAwesome/bars-solid.svg'
import { useEffect,useState,createContext,useContext } from 'react'
import {InscriptionContext as InscriptionBoolean} from '../utilitaires/InscriptionContext'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import '../css/Navbar.css'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import photoProfil from'../images/1HloWLLhL3iTrmDtMigiitLB9Qx.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Navbar(){
    const {Inscrit,boolInscription,connectedUser}=useContext(InscriptionBoolean)
    const[Open,setOpen]=useState(false)
    const[Path,setPath]=useState('')
    const[User,setUser]=useState(null)
    const[LinkAdmin,setLinkAdmin]=useState(false)
    const getUser = () => {
        return axios
          .get(`http://localhost:5000/Users/${connectedUser}`)
          .then((res) => {
            console.log(setUser(res.data))
            console.log(User)
            ;
          })
          .catch((err) => console.error(err));
      };  
      
      useEffect(()=>{
        setPath(window.location.pathname)
        getUser()
      },[])
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
                <Link to='/' ><li className='liMenu'>Accueil</li></Link>
                <li className={User!=null&&User.Admin===true?'liMenu':'liMenuNone'} id='LinkAdminLi' onClick={()=>{LinkAdmin==false?setLinkAdmin(true):setLinkAdmin(false)}}> Fonctions Administrateur</li>
                <div className={LinkAdmin===true?'containerLinkAdmin':'noneContainerLinkAdmin'}>
                  <Link className='LinkAdminP' id='PEditLinkAdmin' to='/EditBlog'>Créer un article</Link>
                  <Link className='LinkAdminP'>Modif profil</Link>
                </div>
                </ul>
            </div>}
            {Path==='/connexion'||Path==='/espacepro/InscriptionChoix'||Path=="/espacepro"||Path=='/espacepro/inscriptionChoix/inscriptionFinale'||Path=='/espacepro/inscriptionChoix/inscriptionFinale/profil'?
            <navbar className="navbar">
                    <img src={Burger} className="burger" onClick={Open==false?()=>{setOpen(true)}:()=>{setOpen(false)}}></img>
                    <Link to='/profil' className={Inscrit===true?'oui':'non'}>
                        <div className="pictoLogoEspaceProNav">
                        <img src={localLogo} className='localLogoPictoProfilNav'></img>
                        {User!=undefined?<div className='containerInitialesNav'><p>{User.Initiales}</p></div>:<img src={photoProfil} className='profilPictureNav'></img>}
                        </div>    
                    </Link>  
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
          <Link to="/profil" className={Inscrit===true?'oui':'non'}>
            <div className="pictoLogoEspaceProNav">
            <img src={localLogo} className='localLogoPictoProfilNav'></img>
            {User!=undefined?<div className='containerInitialesNav'><p>{User.Initiales}</p></div>:<img src={photoProfil} className='profilPictureNav'></img>}
            </div>    
          </Link>  
        </navbar>
            }

    </div>
    )
}
export default Navbar