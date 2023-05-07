import mongoose from "mongoose";
const ficheEcolePrincipaleSchema = new mongoose.Schema(
    {
        EcoleName:String,
        Descriptif:String,
        UserPseudo:String,
        Bateau:Boolean,
        Voiture:Boolean,
        Moto:Boolean,
        Formation:Array,
        HorairesBureau:Array,
        HorairesConduite:Array,
        Mail:String,
        Adresse:String,
        Téléphone:String,
        Site:String,
    });
 
     
 const FicheEcolePrincipale = mongoose.model('FicheEcolePrincipale',ficheEcolePrincipaleSchema);
 
 
 export default FicheEcolePrincipale;