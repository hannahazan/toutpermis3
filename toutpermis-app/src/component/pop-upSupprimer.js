import '../css/PopUpSupprimer.css'
import {InscriptionContext as SupprimerBoolean} from '../utilitaires/InscriptionContext'
import axios from 'axios'
import { useEffect,useState,createContext,useContext } from 'react'

const Supprimer=()=>{
    const {checkDelete,assignDeleteTrue,
        assignDeleteFalse,EcoleNameContexte,assignEcoleName,OpenSupprimer,assignOpenSupprimerFalse,
        assignOpenSupprimerTrue,connectedUser}=useContext(SupprimerBoolean)
       
        useEffect(()=>{
            console.log(OpenSupprimer)
            console.log(`${checkDelete} donc je ne sais pas`)
        })
   
        const PopUpCheckTrue=()=>{
            assignDeleteTrue()
            assignOpenSupprimerFalse()
            axios
            .delete(`http://localhost:5000/FicheEcolePrincipale/delete/${EcoleNameContexte}`)
            .then((response)=>{(console.log(response.data))
            }) 
            .catch(error => {
            console.log(error);
            })  
        }
        const PopUpCheckFalse=()=>{
            assignDeleteFalse()
            assignOpenSupprimerFalse()
        }
    return(
        <div className={OpenSupprimer===true?"mainPopUpSupprimer":"mainPopUpSupprimer2"}>
            <p>{EcoleNameContexte}</p>
            <div className='containerButtonPopUpSup'>
                <button onClick={()=>{PopUpCheckTrue()}}>oui</button>
                <button onClick={()=>{PopUpCheckFalse()}}>non</button>
            </div>
        </div>
    )
}


export default Supprimer