import { createContext } from "react";
import { useState } from "react";

export  const InscriptionContext=createContext()
export const bonjour='hello'
const InscriptionProvider=({children})=>{
    const [choice,setChoice]=useState('')
    const [Inscrit,setInscrit]=useState(false)
    function assignChoice(value){
        setChoice(value)
    }
    function boolInscription(){
        setInscrit(true)
    }
   
    return(
        <InscriptionContext.Provider value={{choice,Inscrit,assignChoice,boolInscription}}>
            {children}
        </InscriptionContext.Provider>
    )
}
export default InscriptionProvider