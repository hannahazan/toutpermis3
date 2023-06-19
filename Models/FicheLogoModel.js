import mongoose from "mongoose";
const ficheLogoSchema = new mongoose.Schema(
    {
        logoUrl:String,
        pictureName:String,
        UserPseudo:String,
        EcoleName:String,
    });
 

 const FicheLogo= mongoose.model('FicheLogo',ficheLogoSchema);
 
 
 export default FicheLogo;