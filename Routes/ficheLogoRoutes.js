import  express from 'express'
import multer from "multer"
import  uuidv4 from 'uuidv4'
const routerFicheLogo= express.Router()
routerFicheLogo.use(express.json());
routerFicheLogo.use(express.urlencoded({extended: true}))
import FicheLogo from '../Models/FicheLogoModel.js'

const upload = multer({ dest: 'toutpermis-app/public/data/uploads' })


routerFicheLogo.get('/', function (req, res) {
    FicheLogo.find((err, data) => {
      res.send(data)
      console.log(data)
      
    })
  })
  

routerFicheLogo.get('/:pictureName', function (req, res) {
   FicheLogo.findOne({ pictureName: req.params.pictureName }, (err, data) => {
      res.send(data)
      console.log(data)
    }
    )
  });

// **CreatePost**/////////////////////////////////////////////////////
routerFicheLogo.post("/", upload.single('file'), async (req, res) => {
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
      let myFicheLogo = new FicheLogo({
        logoUrl: req.file !==null? "/data/uploads/" + req.file.filename:"",
        pictureName:req.file.originalname,
      });
      await myFicheLogo.save();
      console.log(req.file)
      console.log(req.body)
      res.json({ message: "Created" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  export default routerFicheLogo