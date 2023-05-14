import  express from 'express'
import multer from "multer"
import  uuidv4 from 'uuidv4'
const routerFicheCouverture= express.Router()
routerFicheCouverture.use(express.json());
routerFicheCouverture.use(express.urlencoded({extended: true}))
import FicheCouverture from '../Models/FicheCouvertureModel.js'

const upload = multer({ dest: 'toutpermis-app/public/data/uploads' })

routerFicheCouverture.post("/", upload.single('file'), async (req, res) => {
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
      let myFicheCouverture= new FicheCouverture({
        EcoleName:req.body.EcoleName,
        UserPseudo:req.body.UserPseudo,
        CouvertureUrl: req.file !==null? "/data/uploads/" + req.file.filename:"",
        PictureName:req.file.originalname, 
      });
      await myFicheCouverture.save();
      console.log(req.file)
      console.log(req.body)
      res.json({ message: "Created" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  routerFicheCouverture.get('/:EcoleName', function (req, res) {
    FicheCouverture.findOne({EcoleName: req.params.EcoleName }, (err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });
   routerFicheCouverture.get('/', function (req, res) {
    FicheCouverture.find((err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });

  export default routerFicheCouverture