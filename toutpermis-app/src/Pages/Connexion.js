import '../css/Navbar.css'
import '../css/EspacePro.css'
import '../css/Connexion.css'
import Burger from '../images/iconsAwesome/bars-solid.svg'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import check from '../images/iconsAwesome/check-solid (1).svg'
import Navbar from '../component/Navbar'
import { useState,useEffect } from 'react';


function Connexion(){
    const [Open,setOpen]=useState(false)
    const [Check,setCheck]=useState(false)
    const [verifie,setVerifie]=useState(null)
    useEffect(()=>{
        console.log(Check)
        setVerifie(document.getElementById('onverra').checked)
        console.log(`${verifie} la coche`)
    })
   
    return(
        <div className='Connexion'>
            <Navbar/>
            <main className='mainConnexion'>
                <div className="LogoEspacePro">
                    <div className="pictoLogoEspacePro">
                        <img src={localLogo} className='localLogoPictoEspacePro'></img>
                        <img src={volant} className='volantLogoEspacePro'></img>
                    </div>
                    <div className='pLogoEspacePro'>
                        <p className='ToutLogo'>Tout</p>
                        <p className='PermisLogo'>Permis</p>
                        <p>.fr</p>
                    </div>
                    <p className='espaceProLogo'>espace pro</p>
                </div>
                <p className='pConnexion'>Connexion</p>
                    <form className='connexionFormulaire'>
                        <input type="email" id="mail" name="user_mail" placeholder='Adresse e-mail' className='InputConnexion'></input>
                        <input type="password" id="pwd" placeholder='Mot de passe' name="pwd" className='InputConnexion'></input>
                        <div className='rememberMe'>
                            {Check==false?<input type='checkbox' className='checkboxRemember' name="checkRem" id='onverra' ></input>:<input type='checkbox' className='checkboxRemember' name="checkRem" id='onverra' checked ></input>}
                            <label for="checkRem" className='labelCheck'onClick={Check==false?()=>{setCheck(true)}:()=>{setCheck(false)}}>
                               {Check==false?<img src={check} className="checkConnexion"></img>:<img src={check} className="checkConnexion2"></img>}
                            </label>
                            <p>Remember me</p>
                            <p className='pOublié'>mot de passe oublié ?</p>    
                        </div>
                        <button className='buttonConnecter'>Se connecter</button>
                        <p className='pPasEncore'>Vous n'êtes pas encore inscrit ?</p>
                        <p className='pRejoinsNous'>Rejoignez-nous !</p>
                    </form>
            </main>
        </div>
    )}
    export default Connexion