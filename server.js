import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import routerFicheLogo from './Routes/ficheLogoRoutes.js'
import routerFicheEcolePrincipale from './Routes/ficheEcoleprincipaleRoutes.js';
import routerUsers from './Routes/UsersRoutes.js';
import routerFicheCouverture from './Routes/FichecouvertureRoutes.js';
import routerFicheEquipes from './Routes/FicheEquipesRoutes.js';
import routerFicheVéhicule from './Routes/FicheVéhiculeRoute.js';
const app = express()
const port = 5000
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.use('/FicheCouverture',routerFicheCouverture)
app.use('/FicheLogo',routerFicheLogo)
app.use('/FicheEcolePrincipale',routerFicheEcolePrincipale)
app.use('/Users',routerUsers)
app.use('/FicheEquipes',routerFicheEquipes)
app.use('/FicheVehicule',routerFicheVéhicule)




// connection à la bdd mongodb
main().catch(err => console.error(err))
async function main() {
    await mongoose.connect('mongodb+srv://hannah:TBlIyaXZd1aS1wgh@cluster0.aailhd7.mongodb.net/Toutpermis?retryWrites=true&w=majority');
    console.log("connection réussi");
}


app.listen(port, () => {
  console.log(`app listening on port ${port}`)})