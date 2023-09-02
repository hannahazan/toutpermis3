import '../css/Profil.css'
import Navbar from "../component/Navbar";
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import { useContext, useEffect,useState } from 'react' 
import {InscriptionContext as InscriptionChoice} from '../utilitaires/InscriptionContext'
import photoProfil from '../images/1HloWLLhL3iTrmDtMigiitLB9Qx.jpg'
import enveloppe from '../images/iconsAwesome/envelope-solid (1).svg'
import powerOff from '../images/iconsAwesome/power-off-solid.svg'
import setting from '../images/iconsAwesome/gear-solid (1).svg'
import voiture from '../images/iconsAwesome/car-rear-solid.svg'
import PopupInscription from '../component/PopupInscription';
import stethoscope from '../images/iconsAwesome/stethoscope-solid.svg'
import clef from '../images/iconsAwesome/screwdriver-wrench-solid.svg'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Profil=()=>{
    const{choice,connectedUser,validEmail}=useContext(InscriptionChoice)
    const[User,setUser]=useState()
    console.log(choice) 
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
        getUser()
        console.log(`${validEmail} le trick pour l'email`)
      },[])
   
    return(
        <div className='profil'>
            <Navbar/>
            <PopupInscription/>
            <main className='profilMain'>
            <div className='containerToolBoxProfilpicture'>
                {User!=undefined?<p className='pBonjourProfil'>Bonjour {User.Prenom} !</p>:<p className='pBonjourProfil'>Bonjour Charliz !</p> }
                <div className="pictoLogoEspacePro">
                    <img src={localLogo} className='localLogoPictoProfil'></img>
                    {User!=undefined?<div className='ContainerInitiales'><p  className='Initiales'>{User.Initiales}</p></div>:<img src={photoProfil} className='profilPicture'></img>}
                </div>
                <div className='toolBox'>
                    <img src={enveloppe} className='enveloppeProfil'></img>
                    <img src={setting} className='settingProfil'></img>
                    <img src={powerOff} className='powerOffProfil'></img>
                </div>
            </div>  
            <div className='containerCardProfil'>
                <Link to='Fiche' className='cardProfil'>
                    {choice==='voiture'?<img src={voiture} className='voitureProfilCard'></img>:choice==='médecin'?<img src={stethoscope} className='voitureProfilCard'></img>:<img src={clef} className='voitureProfilCard'></img>}
                    <p>Ma fiche</p>
                </Link>
                <div className='cardProfil'>
                {choice==='voiture'?<img src={voiture} className='voitureProfilCard'></img>:choice==='médecin'?<img src={stethoscope} className='voitureProfilCard'></img>:<img src={clef} className='voitureProfilCard'></img>}
                    <p> Mes Offres</p>
                    <p>partenaires</p>
                </div>
            </div>
            <div className='containerCardProfil'>
                <div className='cardProfil'>
                {choice==='voiture'?<img src={voiture} className='voitureProfilCard'></img>:choice==='médecin'?<img src={stethoscope} className='voitureProfilCard'></img>:<img src={clef} className='voitureProfilCard'></img>}
                    <p>Mes factures</p>
                </div>
                <Link to='/MesAnnonces' className='cardProfil'>
                {choice==='voiture'?<img src={voiture} className='voitureProfilCard'></img>:choice==='médecin'?<img src={stethoscope} className='voitureProfilCard'></img>:<img src={clef} className='voitureProfilCard'></img>}
                    <p>Mes annonces</p>
                </Link>
            </div>
            </main>  
        </div>
    )
}
export default Profil