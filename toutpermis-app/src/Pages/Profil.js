import '../css/Profil.css'
import '../css/Fiche.css'
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
import { Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';
import SocketIo from 'socket.io-client'
const socket = SocketIo.connect('http://localhost:4000');


const Profil=({socket})=>{
    
    const{choice,assignChoice,connectedUser,validEmail,disconnetingUser,boolInscription}=useContext(InscriptionChoice)
    const[User,setUser]=useState()
    const [disconnected,setDisconnected]=useState(false)
    const navigate=useNavigate()
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
      const Deconnexion=()=>{
        disconnetingUser()
        boolInscription(false)
        assignChoice('')
        navigate('/')
      }  
      const triggerDisconnect=()=>{
        setDisconnected(true)
       window.scroll(0,0)
       var y= window.scrollY
       console.log(`${y} la position du scroll sur l'axe y`)
      }

      const handleSubmitMessagerie = () => {
        //sends the username and socket ID to the Node.js serve
        socket.emit('newUser', {userName: connectedUser, userID: socket.id});
        navigate('/ContactMessagerie');
      };
      
      useEffect(()=>{
        getUser()
        console.log(`${validEmail} le trick pour l'email`)
        console.log(choice)
      },[])
   
    return(
        <div className='profil'>
            <Navbar/>
            <PopupInscription/>
            <div className={disconnected===true?'containerPopupSupprimerFiche':'containerPopupSupprimerFiche2'}>
                <div  id='containerFormationPosition' className='containerDeplacementPopUp'>
                    <p>Êtes-vous sûr de vouloir vous déconnecter</p>
                    <div className='containerButtonPopUpSup'>
                        <button className='ButtonPopUpSupOui' onClick={()=>{Deconnexion()}}>oui</button>
                        <button className='ButtonPopUpSupNon' onClick={()=>{setDisconnected(false)}}>non</button>
                    </div>
                </div>
            </div>
            <main className={disconnected===true?'profilMainNone':'profilMain'}>
            <div className='containerToolBoxProfilpicture'>
                {User!=undefined?<p className='pBonjourProfil'>Bonjour {User.Prenom} !</p>:<p className='pBonjourProfil'>Bonjour Charliz !</p> }
                <div className="pictoLogoEspacePro">
                    <img src={localLogo} className='localLogoPictoProfil'></img>
                    {User!=undefined?<div className='ContainerInitiales'><p  className='Initiales'>{User.Initiales}</p></div>:<img src={photoProfil} className='profilPicture'></img>}
                </div>
                <div className='toolBox'>
                    <img src={enveloppe} className='enveloppeProfil'onClick={()=>{handleSubmitMessagerie()}}></img>
                    <img src={setting} className='settingProfil'></img>
                    <img src={powerOff} className='powerOffProfil' onClick={()=>{triggerDisconnect()}}></img>
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