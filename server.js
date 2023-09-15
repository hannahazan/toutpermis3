import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import routerFicheLogo from './Routes/Ecole/ficheLogoRoutes.js'
import routerFicheEcolePrincipale from './Routes/Ecole/ficheEcoleprincipaleRoutes.js';
import routerUsers from './Routes/Ecole/UsersRoutes.js';
import routerFicheCouverture from './Routes/Ecole/FichecouvertureRoutes.js';
import routerFicheEquipes from './Routes/Ecole/FicheEquipesRoutes.js';
import routerFicheVéhicule from './Routes/Ecole/FicheVéhiculeRoute.js';
import routerBlog from './Routes/BlogRoutes.js';

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
app.use('/Blog',routerBlog)

const db_url='mongodb+srv://hannah:TBlIyaXZd1aS1wgh@cluster0.aailhd7.mongodb.net/Toutpermis?retryWrites=true&w=majority'



// connection à la bdd mongodb
main().catch(err => console.error(err))
async function main() {
    
    await mongoose.connect('mongodb+srv://hannah:TBlIyaXZd1aS1wgh@cluster0.aailhd7.mongodb.net/Toutpermis?retryWrites=true&w=majority');
    console.log("connection réussi");
    
}


app.listen(port, () => {
  console.log(`app listening on port ${port}`)})