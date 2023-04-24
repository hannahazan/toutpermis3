import { createContext } from "react";
import { useState } from "react";

export  const InscriptionContext=createContext()
export const bonjour='hello'
const InscriptionProvider=({children})=>{
    const [choice,setChoice]=useState('')
    const [Inscrit,setInscrit]=useState(false)
    const [connectedUser,setConnectedUser]=useState("Charliz")
    function assignChoice(value){
        setChoice(value)
    }
    function boolInscription(){
        setInscrit(true)
    }
    
   
    return(
        <InscriptionContext.Provider value={{choice,Inscrit,assignChoice,boolInscription,connectedUser}}>
            {children}
        </InscriptionContext.Provider>
    )
}
export default InscriptionProvider