import mongoose from "mongoose";
const ficheEcolePrincipaleSchema = new mongoose.Schema(
    {
        ecoleNumber:Number,
        couvertureUrl:String,
        pictureName:String,
        userPseudo:String,
        Bateau:Boolean,
        voiture:Boolean,
        moto:Boolean,
    });
 
     
 const FicheEcolePrincipale = mongoose.model('FicheEcolePrincipale',ficheEcolePrincipaleSchema);
 
 
 export default FicheEcolePrincipale;