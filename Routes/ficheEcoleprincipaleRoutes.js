import  express from 'express'
import multer from "multer"
import  uuidv4 from 'uuidv4'
const routerFicheEcolePrincipale= express.Router()
routerFicheEcolePrincipale.use(express.json());
routerFicheEcolePrincipale.use(express.urlencoded({extended: true}))
import FicheEcolePrincipale from '../Models/ficheEcolePrincipale.js'

const upload = multer({ dest: 'toutpermis-app/public/data/uploads' })


routerFicheEcolePrincipale.get('/', function (req, res) {
   FicheEcolePrincipale.find((err, data) => {
      res.send(data)
      console.log(data)
      
    })
  })
  routerFicheEcolePrincipale.get('/:_id', function (req, res) {
    FicheEcolePrincipale.findById({_id:req.params._id},(err, data) => {
       res.send(data)
       console.log(data)
     })
   })
  

routerFicheEcolePrincipale.get('/One/:UserPseudo', function (req, res) {
   FicheEcolePrincipale.find({UserPseudo: req.params.UserPseudo}, (err, data) => {
      res.send(data)
      console.log(data)
    }
    )
  });

  routerFicheEcolePrincipale.get('/creation/:EcoleName', function (req, res) {
    FicheEcolePrincipale.findOne({EcoleName: req.params.EcoleName}, (err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });

 routerFicheEcolePrincipale.put('/:EcoleName',(req,res) => {
  FicheEcolePrincipale.findOneAndUpdate({EcoleName:req.params.EcoleName},req.body,function(err,data){
      if(err){
        res.sendStatus(404)
      }
      else
      {
        if (!data){
            res.sendStatus(404)
           }
       else{
            res.send(data)
            console.log(req.body)
           }
      }
    })
  })
 routerFicheEcolePrincipale.put('/addFormation/:EcoleName',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleName:req.params.EcoleName},{$push:{Formation:req.body.Formation,HorairesBureau:req.body.HorairesBureau,HorairesConduite:req.body.HorairesConduite}},function(err,data){
      console.log(req.body)
      if(err){
        res.sendStatus(404)
      }
      else
      {
        if (!data){
            res.sendStatus(404)
            }
        else{
            res.send(data)
            }
      }
    })
  })
  routerFicheEcolePrincipale.put('/removeFormation/:EcoleName',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleName:req.params.EcoleName},{$pull:{Formation:req.body.Formation,HorairesBureau:req.body.HorairesBureau,HorairesConduite:req.body.HorairesConduite}},function(err,data){
      console.log(req.body)
      if(err){
        res.sendStatus(404)
      }
      else
      {
        if (!data){
            res.sendStatus(404)
            }
        else{
            res.send(data)
            }
      }
    })
  })
  
  routerFicheEcolePrincipale.post('/test', function (req, res, next) {
    var myNewFiche = new FicheEcolePrincipale({
      EcoleName:req.body.EcoleName,
      Descriptif:req.body.Descriptif,
      UserPseudo:req.body.UserPseudo,
      Bateau:req.body.Bateau,
      Voiture:req.body.Voiture,
      Moto:req.body.Moto,
      Formation:req.body.Formation,
      HorairesBureau:req.body.HorairesBureau,
      HorairesConduite:req.body.HorairesConduite,
      Mail:req.body.Mail,
      Adresse:req.body.Adresse,
      Téléphone:req.body.Téléphone,
      Site:req.body.Site,
    })
    myNewFiche.save(function (err, post) {
      if (err) { return next(err) }
      res.json(201, post)
    })
  })
  routerFicheEcolePrincipale.delete('/delete/:EcoleName',(req,res)=>{
    FicheEcolePrincipale.findOneAndDelete({EcoleName:req.params.EcoleName},function(err,data){
      if(err){
        res.sendStatus(404)
      }
      else
      {
        if (!data){
            res.sendStatus(404)
            }
        else{
            res.send(data)
            }
      }
    })
  })

  export default routerFicheEcolePrincipale