import { useEffect,useContext,useState } from "react";
import {InscriptionContext as InscriptionChoice} from '../utilitaires/InscriptionContext'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import close from '../images/iconsAwesome/xmark-solid (1).svg'
import superHero from '../images/CODEO_016_002-removebg-preview.png'
import ombreSuperGirl from '../images/Ombrejambe-removebg-preview.png'
import ombreGolgoth from '../images/OmbreIinvsible-removebg-preview.png'
import ombreAgée from '../images/Ombreagée-removebg-preview.png'
import '../css/popupInscription.css'
import { Link } from "react-router-dom";
import SocketIo from 'socket.io-client'
const socket = SocketIo.connect('http://localhost:4000');

const PopupInscription=(socket)=>{
    const[Path,setPath]=useState('')
    const[Close,setClose]=useState(false)
    useEffect(()=>{
        setPath(window.location.pathname)
        console.log(Path)
    })

    return(
        
        <div>
            {Path==='/espacepro/inscriptionChoix/inscriptionFinale/profil'&& Close===false?
            <div className="containerPopup">
                <img src={close} className="closePopup" onClick={()=>{setClose(true)}}></img>
                <div className='containerLogoImgFelicitation'>
                    <div className="pictoLogoEspaceProPopup">
                            <img src={localLogo} className='localLogoPictoEspaceProPopup'></img>
                            <img src={volant} className='volantLogoEspaceProPopup'></img>
                    </div>
                    <img src={superHero} className="superHeroPopup"></img>
                    <div className='pFelicitation'>
                        <p className='pColorCanard'>Felicitation!</p>
                        <p>Tu fais maintenant partie </p>
                        <p className="pFamille">de la grande famille</p>
                        <div className="pToutPermis">
                            <p>Tout</p>
                            <p className='pColorCanard'>permis</p>
                        </div>
                    </div>
                </div>
                <div className='marcheSection2Popup'>
                    <p className='titreMarcheSection2Popup'>Comment ça marche ?</p>
                    <div className='stepPara2Popup'>
                        <p className='step1Popup'>1</p>
                        <div className='containerStep2Popup'>
                        <img src={ombreSuperGirl} className='ombreSuperGirlPopup'></img>
                        </div>
                        <div>
                        <p className='para12Popup'>Sélectionne le professionnel qui t'intéresse </p>
                        </div>
                    </div>
                    <div className='stepPara2Popup'>
                        <p className='pSituationPopup'>Applique les filtres adpatés à ta situation</p>
                        <p className='step2Popup'>2</p>
                        <div className='containerStep2Popup'>
                        <img src={ombreAgée} className='ombreAgéePopup'></img>
                        </div>
                    </div>
                </div>
               
            </div>
            :
            <div className="containerPopup2">
            </div>
            }
        </div>
    )
}
export default PopupInscription