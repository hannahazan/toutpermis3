import '../css/Fiche.css'
import Navbar from '../component/Navbar'
import { useEffect,useState,ChangeEvent,useContext } from 'react'
import {InscriptionContext as getConnectedUser} from '../utilitaires/InscriptionContext'
import axios from 'axios'
import { set } from 'mongoose'


const Fiche=()=>{
    const [NumberEcole,setNumberEcole]=useState(Number)
    const [ecoleNumberArray,setEcoleNumberArray]=useState([])
    const [uploadCouv, setUploadCouv] = useState()
    const [uploadLogo,setUploadLogo]=useState()
    const [onePicture,setOnePicture]=useState([])
    const[modify,setModify]=useState()
    const{connectedUser}=useContext(getConnectedUser)
    let arrayTest=[]
    console.log(connectedUser)
    const getPictureCouv=()=>{
        return axios
        .get("http://localhost:5000/FicheEcole/300px-Dracaufeu_d'Alain.png")
        .then((res) => {
          console.log(setOnePicture(res.data)) 
          ;
        })
        .catch((err) => console.error(err));
    };
   
    
    useEffect(()=>{
        console.log(uploadCouv)
        console.log(NumberEcole)
        console.log(ecoleNumberArray)
        for(let i=1;i<=NumberEcole;i++){
          arrayTest.push(` EC${i}`)
        }
        setEcoleNumberArray(arrayTest)
        getPictureCouv()
        console.log(onePicture)  
    },[NumberEcole])
    const getValue=(e)=>{
        setNumberEcole(e.target.value)
    }
    /*************modification part *********/
   const submitModify=()=>
    {
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${connectedUser}`,{voiture:true})
    .then((response) => {
      console.log(setModify(response.data));
      console.log("ca marche")
    })
    .catch((err) => console.error(err)); }

  

    /**************upload part************************** */
    async function onSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('name','josephine')
        data.append('file',uploadCouv)
        data.append('ecoleNumber',NumberEcole)
        data.append('userPseudo',connectedUser)
        const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
        }
        
        axios.post("http://localhost:5000/FicheEcolePrincipale",data,config)
        .then((response)=>{(console.log(response.data))
        }) 
        .catch(error => {
        console.log(error);
        });
        const dataLogo= new FormData
        dataLogo.append("name","martine")
        dataLogo.append('file',uploadLogo)

        axios.post("http://localhost:5000/FicheLogo",dataLogo,config)
        .then((response)=>{(console.log(response.data))
        }) 
        .catch(error => {
        console.log(error);
        });
        
}
    return(
        <div className='fiche'>
            <Navbar/>
            <main className='mainFiche'>
                <h1 className='titreFiche'>Ma fiche</h1>
                <p className='accompagnéP'>Besoin d’être accompagné pour remplir ta fiche et
                    attirer un max de candidats ?<br></br> 
                    Clique ici, on t’as concocté un petit guide !
                </p>
                <div className='containerInputLabelNombreEcole'>
                    <label for="tentacles" className='labelNombreEcole'>Nombre d'établissements (5 maximum)</label>
                    <input type="number" id="tentacles" name="tentacles"
                    min="1" max="5" className='inputNombreEcole' onChange={(e)=>{getValue(e)}}></input>
                </div>
                <div className='containerInformations'>
                    <p className='pInformations'>Informations</p>
                    <div className='containerOngletNbreEcole'>
                        {ecoleNumberArray.map((event,index)=>
                            <p style={{marginRight:'10px',marginTop:'0px',marginBottom:'0px'}} key={index}>{event}</p>)}
                    </div>
                    <div className='containerCouvUpload'>
                        <input  type="file" id="imageFile" accept="image/*" placeholder='uploadCouv'  className='uploadHidden'onChange={(e)=>{setUploadCouv(e.target.files[0])}} multiple></input>
                        <div className='uploadFront'>Modifier Couverture</div>
                        <input  type="file" id="imageFile" accept="image/*" className='uploadLogoHidden' onChange={(e)=>{setUploadLogo(e.target.files[0])}}></input>
                        <div className='uploadfrontLogo'>Modifier Logo</div>
                        <div className='uploadLogo'>
                            <p className='pR'>R</p>
                            <p>C</p>
                        </div>
                    </div>
                    <input   type='submit' className='buttonUpload' onClick={onSubmit} value={'Valider logo et couverture'}></input>
                    <input   type='submit' className='buttonUpload' onClick={submitModify} value={'Valider logo et couverture'}></input>
                </div>   
            </main>
            
        </div>
    )
}

export default Fiche