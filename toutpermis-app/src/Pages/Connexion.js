import '../css/InscriptionFinale.css'
import Navbar from "../component/Navbar";
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import axios from 'axios';
import { useContext,useEffect,useState } from 'react' 
import {InscriptionContext as InscriptionChoice} from '../utilitaires/InscriptionContext'
import { Link, Navigate,useNavigate } from 'react-router-dom';

const Connexion=()=>{
    const {choice,assignChoice,Inscrit,boolInscription,assignConnecteduser,connectedUser}=useContext(InscriptionChoice)

    const [password,setpassword]=useState("")
    const navigate=useNavigate()

    const onSubmit=()=>{
        axios
        .post("http://localhost:5000/Users/connect/PostGet",{Mail:connectedUser,Password:password})
        .then((response)=>{(console.log(response.data))

            if(response.data.Mail!=connectedUser || response.data.Password != password){
                alert("Login incorrect")
            }
          
            else{
                boolInscription(true)
                if(response.data.Ecole===true){
                    assignChoice('voiture')
                }
                else if(response.data.Medecin===true){
                    assignChoice('médecin')
                }
                else if (response.data.Aménageur===true){
                    assignChoice('aménageur')
                }  
                console.log("ca connecte bien")
                if(response.data.Mail==="Stephanie.macedo@laposte.net"){
                    navigate("/")
                }
                else{
                    navigate("/profil")
                }
                
            }
           
        })
        .catch(error => {
        console.log(error);
        alert("Oops!Cette adresse e-mail est déjà utilisée!")
        })
    }
        return(

        <div className="InscriptionFinale">
        <Navbar/>
        <main className='ConnexionMain'>
            <div className='pictoEspaceContainer'>
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
            </div>
            <div className='containerConnexionForm'>
                <p className='pInscriptionFinale'>Connexion</p>
                <div>
                    <input type="email" id="mail" name="user_mail" placeholder='Adress e-mail' className='inNameFinale' onChange={(e)=>{assignConnecteduser(e)}}></input>
                    <input type="password" id="name" name="user_name" placeholder='Mot de passe' className='inNameFinale' onChange={(e)=>{setpassword(e.target.value)}}></input> 
                    <button  className='buttonFormFinale' onClick={()=>{onSubmit()}}>Me connecter</button>
                </div> 
            </div>
        </main>
    </div>
)
}

export default Connexion