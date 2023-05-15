import { createContext } from "react";
import { useState } from "react";

export  const InscriptionContext=createContext()
export const bonjour='hello'
const InscriptionProvider=({children})=>{
    const [choice,setChoice]=useState('')
    const [Inscrit,setInscrit]=useState(false)
    const [connectedUser,setConnectedUser]=useState()
    const [checkDelete,setCheckDelete]=useState(Boolean)
    const [EcoleNameContexte,setEcoleNameContexte]=useState()
    const [OpenSupprimer,setOpenSupprimer]=useState(false)
    function assignChoice(value){
        setChoice(value)
    }
    function boolInscription(){
        setInscrit(true)
    }
    function assignConnecteduser(e){
        setConnectedUser(e.target.value)
    }
    function assignDeleteTrue(){
        setCheckDelete(true)
    }
    function assignDeleteFalse(){
        setCheckDelete(false)
    }
    function assignEcoleName(Ecole){
        setEcoleNameContexte(Ecole)
    }
    function assignOpenSupprimerTrue(){
        setOpenSupprimer(true)
    }
    function assignOpenSupprimerFalse(){
        setOpenSupprimer(false)
    }
   
    return(
        <InscriptionContext.Provider value={{choice,Inscrit,assignChoice,boolInscription,connectedUser,assignConnecteduser,checkDelete,assignDeleteTrue,
        assignDeleteFalse,EcoleNameContexte,assignEcoleName,OpenSupprimer,assignOpenSupprimerFalse,assignOpenSupprimerTrue}}>
            {children}
        </InscriptionContext.Provider>
    )
}
export default InscriptionProvider