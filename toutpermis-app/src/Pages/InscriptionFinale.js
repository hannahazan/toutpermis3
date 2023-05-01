import '../css/InscriptionFinale.css'
import Navbar from "../component/Navbar";
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import axios from 'axios';
import { useContext,useEffect,useState } from 'react' 
import {InscriptionContext as InscriptionChoice} from '../utilitaires/InscriptionContext'
import { Link } from 'react-router-dom';


const InscriptionFinale=()=>{
    const {choice,Inscrit,boolInscription,assignConnecteduser,connectedUser}=useContext(InscriptionChoice)
    const[Path,setPath]=useState('')
    const[prenom,setPrenom]=useState('')
    const[name,setName]=useState('')
    const[password,setPassword]=useState()
    const[PhoneNumber,setPhoneNumber]=useState(Number)
    const[Ecole,setEcole]=useState(Boolean)
    useEffect(()=>{
        setPath(window.location.pathname)
        console.log(Path)
        console.log(`${Inscrit} depuis inscription final bulbibulbi`)
        console.log(connectedUser)
    })
    console.log(choice)
    const ChangeNameEcole=(e)=>{
        setName(e.target.value)
        setEcole(true)
    }
    async function onSubmit() {
        let initiales=''
        for(let i=0;i<1;i++){
                initiales =name[i].toUpperCase()+prenom[i].toUpperCase()
                console.log(initiales)    
        }
     axios
     .post("http://localhost:5000/Users/test",{Name:name,Mail:connectedUser,Password:password,PhoneNumber:PhoneNumber,Ecole:Ecole
    ,Prenom:prenom,Initiales:initiales})
     .then((response)=>{(console.log(response.data))
     }) 
     .catch(error => {
     console.log(error);
     })   
     boolInscription()   
}
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
                    <input type="text" id="name" name="user_name" placeholder='Nom' className='inNameFinale' onChange={(e)=>{ChangeNameEcole(e)}}></input>
                    <input type="text" id="name" name="user_name" placeholder='Prénom' className='inNameFinale' onChange={(e)=>{setPrenom(e.target.value)}}></input>
                    <input type="text" id="name" name="user_name" placeholder='Fonction' className='inNameFinale'></input>
                    <input type="text" id="name" name="user_name" placeholder="Nom de l'école de conduite" className='inNameFinale'></input>
                    <input type="email" id="mail" name="user_mail" placeholder='Adress e-mail' className='inNameFinale'onChange={(e)=>{assignConnecteduser(e)}}></input>
                    <input type="number" id="name" name="user_name" placeholder='Téléphone' className='inNameFinale'onChange={(e)=>{setPhoneNumber(e.target.value)}}></input>
                    <input type="password" id="name" name="user_name" placeholder='Nom' className='inNameFinale'onChange={(e)=>{setPassword(e.target.value)}}></input>
                    <input type="password" id="name" name="user_name" placeholder='Confirmer password' className='inNameFinale'></input>
                    <Link to='/espacepro/inscriptionChoix/inscriptionFinale/profil' className='buttonFormFinale' onClick={()=>{onSubmit()}}>M'inscrire</Link>
                </form> 
                :
                <form method='post'>
                    <input type="text" id="name" name="user_name" placeholder='Nom' className='inNameFinale'></input>
                    <input type="text" id="name" name="user_name" placeholder='Prénom' className='inNameFinale'></input>
                    <input type="email" id="mail" name="user_mail" placeholder='Adresse e-mail' className='inNameFinale'></input>
                    <input type="number" id="name" name="user_name" placeholder='Téléphone' className='inNameFinale'></input>
                    <input type="password" id="name" name="user_name" placeholder='Nom' className='inNameFinale'></input>
                    <input type="password" id="name" name="user_name" placeholder='Confirmer password' className='inNameFinale'></input>
                    <Link to='/espacepro/inscriptionChoix/inscriptionFinale/profil' className='buttonFormFinale'  onClick={()=>{boolInscription()}}>M'inscrire</Link>
                </form> 
                 }
            </main>
        </div>
    )
}
export default InscriptionFinale