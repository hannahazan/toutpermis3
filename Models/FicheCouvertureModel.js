import mongoose from "mongoose";
const ficheCouverture = new mongoose.Schema(
    {
        EcoleName:String,
        UserPseudo:String,
        CouvertureUrl:String,
        PictureName:String,
    });
 
     
 const FicheCouverture = mongoose.model('FicheCouverture',ficheCouverture);
 
 
 export default FicheCouverture;