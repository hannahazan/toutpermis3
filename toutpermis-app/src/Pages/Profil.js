import '../css/Profil.css'
import Navbar from "../component/Navbar";
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import { useContext } from 'react' 
import {InscriptionContext as InscriptionChoice} from '../utilitaires/InscriptionContext'
import photoProfil from '../images/1HloWLLhL3iTrmDtMigiitLB9Qx.jpg'
import enveloppe from '../images/iconsAwesome/envelope-solid (1).svg'
import powerOff from '../images/iconsAwesome/power-off-solid.svg'
import setting from '../images/iconsAwesome/gear-solid (1).svg'
import voiture from '../images/iconsAwesome/car-rear-solid.svg'
import PopupInscription from '../component/PopupInscription';
import { Link } from 'react-router-dom';

const Profil=()=>{
    return(
        <div className='profil'>
            <Navbar/>
            <PopupInscription/>
            <main className='profilMain'>
            <div className='containerToolBoxProfilpicture'>
                <p className='pBonjourProfil'>Bonjour Charliz!</p> 
                <div className="pictoLogoEspacePro">
                    <img src={localLogo} className='localLogoPictoProfil'></img>
                    <img src={photoProfil} className='profilPicture'></img>
                </div>
                <div className='toolBox'>
                    <img src={enveloppe} className='enveloppeProfil'></img>
                    <img src={setting} className='settingProfil'></img>
                    <img src={powerOff} className='powerOffProfil'></img>
                </div>
            </div>  
            <div className='containerCardProfil'>
                <Link to='Fiche' className='cardProfil'>
                    <img src={voiture} className='voitureProfilCard'></img>
                    <p>Ma fiche</p>
                </Link>
                <div className='cardProfil'>
                    <img src={voiture} className='voitureProfilCardDeuxPara'></img>
                    <p> Mes Offres</p>
                    <p>partenaires</p>
                </div>
            </div>
            <div className='containerCardProfil'>
                <div className='cardProfil'>
                    <img src={voiture} className='voitureProfilCard'></img>
                    <p>Mes factures</p>
                </div>
                <div className='cardProfil'>
                    <img src={voiture} className='voitureProfilCard'></img>
                    <p>Mes annonces</p>
                </div>
            </div>
            </main>  
        </div>
    )
}
export default Profil