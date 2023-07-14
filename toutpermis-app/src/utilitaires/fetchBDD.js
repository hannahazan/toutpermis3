import React from "react";
import axios from "axios";


export const getFunction=(addresse,hook,resHook)=>{
    axios.get(addresse)
    .then((res)=>{
        hook(res.data)
        console.log(`utilitaire ${resHook}`)
    })
    .catch((err) => console.error(err));
}