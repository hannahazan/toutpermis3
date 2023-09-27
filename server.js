import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import { createServer } from "http";
import { Server } from "socket.io";
import routerFicheLogo from './Routes/Ecole/ficheLogoRoutes.js'
import routerFicheEcolePrincipale from './Routes/Ecole/ficheEcoleprincipaleRoutes.js';
import routerUsers from './Routes/Ecole/UsersRoutes.js';
import routerFicheCouverture from './Routes/Ecole/FichecouvertureRoutes.js';
import routerFicheEquipes from './Routes/Ecole/FicheEquipesRoutes.js';
import routerFicheVéhicule from './Routes/Ecole/FicheVéhiculeRoute.js';
import routerBlog from './Routes/BlogRoutes.js';

const app = express()
const port = 5000
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
}
});
var users = [];
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //Listens and logs the message to the console
  socket.on('message', (data) => {
    console.log(`${data} avant emit`)
    io.emit('messageResponse', data);
    console.log(data);
  }); 
  ;
  socket.on('newUser', (data) => {
    console.log(`${data} la data du user`)
    users.push(data);
    io.emit('newUserResponse',users)
    console.log(`${users} ça c'est le user`);
    //Sends the list of users to the client
    
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
   io.emit('newuserResponse', users);
    socket.disconnect();
  });
});
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

httpServer.listen(4000,()=>{
  console.log("connexion réussi port 4000 socket")
})
app.listen(port, () => {
  console.log(`app listening on port ${port}`)})