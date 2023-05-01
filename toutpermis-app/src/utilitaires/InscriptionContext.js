import { createContext } from "react";
import { useState } from "react";

export  const InscriptionContext=createContext()
export const bonjour='hello'
const InscriptionProvider=({children})=>{
    const [choice,setChoice]=useState('')
    const [Inscrit,setInscrit]=useState(false)
    const [connectedUser,setConnectedUser]=useState()
    function assignChoice(value){
        setChoice(value)
    }
    function boolInscription(){
        setInscrit(true)
    }
    function assignConnecteduser(e){
        setConnectedUser(e.target.value)
    }
    
   
    return(
        <InscriptionContext.Provider value={{choice,Inscrit,assignChoice,boolInscription,connectedUser,assignConnecteduser}}>
            {children}
        </InscriptionContext.Provider>
    )
}
export default InscriptionProvider