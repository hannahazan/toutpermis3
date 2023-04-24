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
  

routerFicheEcolePrincipale.get('/:pictureName', function (req, res) {
   FicheEcolePrincipale.findOne({ pictureName: req.params.pictureName }, (err, data) => {
      res.send(data)
      console.log(data)
    }
    )
  });

// **CreatePost**/////////////////////////////////////////////////////
routerFicheEcolePrincipale.post("/", upload.single('file'), async (req, res) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'tmp/dest')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + ' -' + Math.rond(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      },
    })
    try {
      let myFicheEcolePrincipale = new FicheEcolePrincipale({
        ecoleNumber:req.body.ecoleNumber,
        userPseudo:req.body.userPseudo,
        couvertureUrl: req.file !==null? "/data/uploads/" + req.file.filename:"",
        pictureName:req.file.originalname,  
      });
      await myFicheEcolePrincipale.save();
      console.log(req.file)
      console.log(req.body)
      res.json({ message: "Created" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

 routerFicheEcolePrincipale.put('/:userPseudo',(req,res) => {
  FicheEcolePrincipale.findOneAndUpdate({userPseudo:req.params.userPseudo},req.body,function(err,data){
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

  export default routerFicheEcolePrincipale