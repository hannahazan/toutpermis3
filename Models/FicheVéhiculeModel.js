import mongoose from "mongoose";
const ficheVéhiculeSchema = new mongoose.Schema(
    {
        logoUrl:String,
        pictureName:String,
        UserPseudo:String,
        EcoleName:String,
        Nom:String,
        Fonction:String,
        idVéhicule:Number
    });
 

 const FicheVéhicule= mongoose.model('FicheVéhicule',ficheVéhiculeSchema);
 
 
 export default FicheVéhicule;