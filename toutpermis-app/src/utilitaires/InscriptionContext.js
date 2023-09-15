import { createContext } from "react";
import { useState } from "react";

export  const InscriptionContext=createContext()
export const bonjour='hello'
const InscriptionProvider=({children})=>{
    const [choice,setChoice]=useState('')
    const [Inscrit,setInscrit]=useState(false)
    const [connectedUser,setConnectedUser]=useState()
    const [IdFiche,setIdFiche]=useState(null)
    const [checkDelete,setCheckDelete]=useState(Boolean)
    const [EcoleNameContexte,setEcoleNameContexte]=useState()
    const [OpenSupprimer,setOpenSupprimer]=useState(false)
    const [Adresse,setAdresse]=useState(null)
    const [AdresseValue,setAdressevalue]=useState(null)
    const [Longitude,setLongitude]=useState(null)
    const [Lattitude,setLattitude]=useState(null)
    function assignChoice(value){
        setChoice(value)
    }
    function boolInscription(bool){
        setInscrit(bool)
    }
    function assignConnecteduser(e){
        setConnectedUser(e.target.value)
    }
    function disconnetingUser(){
        setConnectedUser('')
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
    function assignAdresse(value){
        setAdresse(value)
    }
    function assignAdresseValue(value){
        setAdressevalue(value)
    }
    function assignLattitude(value){
        setLattitude(value)
    }
    function assignLongitude(value){
        setLongitude(value)
    }
    function assignIdFiche(value){
        setIdFiche(value)
    }
   
    return(
        <InscriptionContext.Provider value={{choice,Inscrit,assignChoice,boolInscription,connectedUser,assignConnecteduser,disconnetingUser,checkDelete,assignDeleteTrue,
        assignDeleteFalse,EcoleNameContexte,assignEcoleName,OpenSupprimer,assignOpenSupprimerFalse,assignOpenSupprimerTrue,Adresse,assignAdresse
        ,AdresseValue,assignAdresseValue,Lattitude,assignLattitude,Longitude,assignLongitude,IdFiche,assignIdFiche}}>
            {children}
        </InscriptionContext.Provider>
    )
}
export default InscriptionProvider