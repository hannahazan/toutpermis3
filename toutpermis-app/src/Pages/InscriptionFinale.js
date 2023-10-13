import '../css/InscriptionFinale.css'
import Navbar from "../component/Navbar";
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import axios from 'axios';
import { useContext,useEffect,useState } from 'react' 
import {InscriptionContext as InscriptionChoice} from '../utilitaires/InscriptionContext'
import { Link, Navigate,useNavigate } from 'react-router-dom';



const InscriptionFinale=()=>{
    const {choice,Inscrit,boolInscription,assignConnecteduser,connectedUser}=useContext(InscriptionChoice)
    const[Path,setPath]=useState('')
    const[prenom,setPrenom]=useState('')
    const[name,setName]=useState('')
    const[password,setPassword]=useState()
    const[PhoneNumber,setPhoneNumber]=useState(Number)
    const[Ecole,setEcole]=useState(Boolean)
    const[Medecin,setMedecin]=useState(Boolean)
    const[amenageur,setAmenageur]=useState(Boolean)
    const navigate=useNavigate()
    useEffect(()=>{
        setPath(window.location.pathname)
        console.log(Path)
        console.log(`${Inscrit} depuis inscription final bulbibulbi`)
        console.log(connectedUser)
    })
    console.log(choice)
    const ChangeName=(e)=>{
        setName(e.target.value)
        if(choice==='voiture'){ 
            setEcole(true)}
        else if(choice==='médecin'){
            setMedecin(true)
        }
        else if(choice==='aménageur'){
            setAmenageur(true)
        }
    }
    const navigation=()=>{
        navigate('/espacepro/inscriptionChoix/inscriptionFinale/profil')
    }
    async function onSubmit() {
        let initiales=''
        for(let i=0;i<1;i++){
                initiales =name[i].toUpperCase()+prenom[i].toUpperCase()
                console.log(initiales)    
        }
        var RegexPassword= new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
        let validPassword= RegexPassword.test(password)
        let regexMail= new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
        let validEmail=regexMail.test(connectedUser)

        if (validEmail===true && validPassword===true && name.length >0 && prenom.length>0 ){
            axios
            .post("http://localhost:5000/Users/test",{Name:name,Mail:connectedUser,Password:password,PhoneNumber:PhoneNumber,Ecole:Ecole
            ,Prenom:prenom,Initiales:initiales,Medecin:Medecin,Aménageur:amenageur})
            .then((response)=>{(console.log(response.data))
                 axios
                .put("http://localhost:5000/MessUtil/addNewUtilisateur/6528398bd2efed6f6387edc4",{ListeContacts:{Utilisateur:connectedUser,Pro:choice,Initiales:initiales,Prenom:prenom,Nom:name}})
                .then((response)=>{(console.log(response.data))  
                    console.log("nop il passe pas du tout par là")
                })
                .catch(error => {
                console.log(error);
                alert("Oops!Cette adresse e-mail est déjà utilisée!")
                })
                boolInscription(true) 
                navigation()  
                console.log("nop il passe pas du tout par là")
            })
            .catch(error => {
            console.log(error);
            alert("Oops!Cette adresse e-mail est déjà utilisée!")
            })
        }
        else if(validEmail===false && validPassword===true) {
            alert("Adresse Mail invalide")
        }
        else if(validEmail===true && validPassword===false){
            alert ("Mot de passe invalide")
        }
        else{
            alert("Mot de passe et adresse mail invalides")
        }
        
   
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
                <div>
                    <input type="text" id="name" name="user_name" placeholder='Nom' className='inNameFinale' onChange={(e)=>{ChangeName(e)}}></input>
                    <input type="text" id="name" name="user_name" placeholder='Prénom' className='inNameFinale' onChange={(e)=>{setPrenom(e.target.value)}}></input>
                    <input type="text" id="name" name="user_name" placeholder='Fonction' className='inNameFinale'></input>
                    <input type="text" id="name" name="user_name" placeholder="Nom de l'école de conduite" className='inNameFinale'></input>
                    <input type="email" id="mail" name="user_mail" placeholder='Adress e-mail' className='inNameFinale'onChange={(e)=>{assignConnecteduser(e)}}></input>
                    <input type="number" id="name" name="user_name" placeholder='Téléphone' className='inNameFinale'onChange={(e)=>{setPhoneNumber(e.target.value)}}></input>
                    <input type="password" id="name" name="user_name" placeholder='Mot de passe' className='inNameFinale'onChange={(e)=>{setPassword(e.target.value)}} onClick={()=>{alert("Votre mot de passe doit être composé de 8 lettres minimum et comporter au moins: une minuscule, une majuscule, un caractère special et un chiffre")}}></input> 
                    <button  className='buttonFormFinale' onClick={onSubmit}>M'inscrire</button>
                </div>
                :
                <div >
                    <input type="text" id="name" name="user_name" placeholder='Nom' className='inNameFinale' onChange={(e)=>{ChangeName(e)}}></input>
                    <input type="text" id="name" name="user_name" placeholder='Prénom' className='inNameFinale'onChange={(e)=>{setPrenom(e.target.value)}}></input>
                    <input type="email" id="mail" name="user_mail" placeholder='Adresse e-mail' className='inNameFinale'onChange={(e)=>{assignConnecteduser(e)}}></input>
                    <input type="number" id="name" name="user_name" placeholder='Téléphone' className='inNameFinale'onChange={(e)=>{setPhoneNumber(e.target.value)}}></input>
                    <input type="password" id="name" name="user_name" placeholder='Mot de passe' className='inNameFinale'onChange={(e)=>{setPassword(e.target.value)}}></input>
                    <button  className='buttonFormFinale' onClick={onSubmit}>M'inscrire</button>
                </div> 
                 }
            </main>
        </div>
    )
}
export default InscriptionFinale