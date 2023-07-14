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
        FormationCarte:Array,
        HorairesBureau:Array,
        HorairesConduite:Array,
        Mail:String,
        Adresse:String,
        Téléphone:String,
        Site:String,
        Bancaire:Boolean,
        Cadeau:Boolean,
        Cheque:Boolean,
        Especes:Boolean,
        Espagnol:Boolean,
        Anglais:Boolean,
        Portugais:Boolean,
        Italien:Boolean,
        Allemand:Boolean,
        Boule:Boolean,
        Combine:Boolean,
        Cercle:Boolean,
        Pedalier:Boolean,
        Para:Boolean,
        Tetra:Boolean,
        Hemi:Boolean,
        AmpuMI:Boolean,
        AmpuMS:Boolean,
        Dys:Boolean,
        TDAH:Boolean,
        SurPartielle:Boolean,
        Surcomplete:Boolean,
        CoursCode:Boolean,
        Domicile:Boolean,
        Simulateur:Boolean,
        DashCam:Boolean,
    });
 
     
 const FicheEcolePrincipale = mongoose.model('FicheEcolePrincipale',ficheEcolePrincipaleSchema);
 
 
 export default FicheEcolePrincipale;