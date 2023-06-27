import mongoose from "mongoose";
const ficheEquipesSchema = new mongoose.Schema(
    {
        logoUrl:String,
        pictureName:String,
        UserPseudo:String,
        EcoleName:String,
        Nom:String,
        Fonction:String,
        idEquipes:Number
    });
 

 const FicheEquipes= mongoose.model('FicheEquipes',ficheEquipesSchema);
 
 
 export default FicheEquipes;