import '../css/InscriptionFinale.css'
import Navbar from "../component/Navbar";
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import { useContext,useEffect,useState } from 'react' 
import {InscriptionContext as InscriptionChoice} from '../utilitaires/InscriptionContext'
import { Link } from 'react-router-dom';


const InscriptionFinale=()=>{
    const {choice,Inscrit,boolInscription}=useContext(InscriptionChoice)
    const[Path,setPath]=useState('')
    useEffect(()=>{
        setPath(window.location.pathname)
        console.log(Path)
        console.log(`${Inscrit} depuis inscription final bulbibulbi`)
    })
    console.log(choice)
    return(
        <div className="InscriptionFinale">
            <Navbar/>
            <main className='InscriptionFinaleMain'>
                <div className="logoParaPictoFinale">
                    <div className='pictoFinale'>
                        <img src={localLogo} className="LogoSphèreFinale" ></img>
                        <img src={volant} className="VolantFinale" ></img>
                    </div>
                    <div className="paraLogoFinale">
                        <p className="toutFinale">Tout</p>
                        <p className="permisFinale">permis</p>
                    </div>
                </div>
                <p className='pEspaceProFinale'>espace pro</p>
                <p className='pInscriptionFinale'>Inscription</p>
                {choice==='voiture'?
                <form  method='post'>
                    <input type="text" id="name" name="user_name" placeholder='Nom' className='inNameFinale'></input>
                    <input type="text" id="name" name="user_name" placeholder='Prénom' className='inNameFinale'></input>
                    <input type="text" id="name" name="user_name" placeholder='Fonction' className='inNameFinale'></input>
                    <input type="text" id="name" name="user_name" placeholder="Nom de l'école de conduite" className='inNameFinale'></input>
                    <input type="email" id="mail" name="user_mail" placeholder='Adress e-mail' className='inNameFinale'></input>
                    <input type="number" id="name" name="user_name" placeholder='Téléphone' className='inNameFinale'></input>
                    <input type="password" id="name" name="user_name" placeholder='Nom' className='inNameFinale'></input>
                    <input type="password" id="name" name="user_name" placeholder='Confirmer password' className='inNameFinale'></input>
                    <Link to='/espacepro/inscriptionChoix/inscriptionFinale/profil' className='buttonFormFinale' onClick={()=>{boolInscription()}}>M'inscrire </Link>
                </form> 
                :
                <form method='post'>
                    <input type="text" id="name" name="user_name" placeholder='Nom' className='inNameFinale'></input>
                    <input type="text" id="name" name="user_name" placeholder='Prénom' className='inNameFinale'></input>
                    <input type="email" id="mail" name="user_mail" placeholder='Adresse e-mail' className='inNameFinale'></input>
                    <input type="number" id="name" name="user_name" placeholder='Téléphone' className='inNameFinale'></input>
                    <input type="password" id="name" name="user_name" placeholder='Nom' className='inNameFinale'></input>
                    <input type="password" id="name" name="user_name" placeholder='Confirmer password' className='inNameFinale'></input>
                    <Link to='/espacepro/inscriptionChoix/inscriptionFinale/profil' className='buttonFormFinale'  onClick={()=>{boolInscription()}}>M'inscrire </Link>
                </form> 
                 }
            </main>
        </div>
    )
}
export default InscriptionFinale