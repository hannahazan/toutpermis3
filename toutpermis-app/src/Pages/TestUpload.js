
import '../css/Fiche.css'
import Navbar from '../component/Navbar'
import { useEffect,useState,ChangeEvent,useContext } from 'react'
import {InscriptionContext as getConnectedUser} from '../utilitaires/InscriptionContext'
import axios from 'axios'
import dropArrow from '../images/iconsAwesome/caret-down-solid.svg'
import check from '../images/iconsAwesome/check-solid (1).svg'
import couv from '../images/Rectangle 516.png'


const Fiche=()=>{
    const [NumberEcole,setNumberEcole]=useState(Number)
    const [ecoleNumberArray,setEcoleNumberArray]=useState([])
    const [uploadCouv, setUploadCouv] = useState()
    const [uploadLogo,setUploadLogo]=useState()
    const [onePicture,setOnePicture]=useState([])
    const [Ecole,setEcole]=useState('')
    const [checkAuto,setCheckAuto]=useState(false)
    const [checkMoto,setCheckMoto]=useState(false)
    const [checkBateau,setCheckbateau]=useState(false)
    const [MinusTE,setMinusTE]=useState(false)
    const [MinusND,setMinusND]=useState(false)
    const [MinusLocal,setMinusLocal]=useState(false)
    const [MinusContact,setMinusContact]=useState(false)
    const [MinusHoraires,setMinusHoraires]=useState(false)
    const [MinusFormations,setMinusFormations]=useState(false)
    const [MinusAddFormations,setMinusAddFormations]=useState(false)
    const [OngletHoraires,setOngletHoraires]=useState('bureau')
    const [OngletFormations,setOngletFormations]=useState('Auto')
    const [captTest,setCaptTest]=useState()
    const [captNomFormation,setCaptNomFormation]=useState('')
    const [afficheTriksFormation,setAfficheTricksFormation]=useState(false)
    const [User,setUser]=useState()
    const[modify,setModify]=useState()
    const{connectedUser}=useContext(getConnectedUser)
    let arrayTest=[]
    console.log(connectedUser)
    const getUser=()=>{
        axios
    .get(`http://localhost:5000/FicheEcolePrincipale/${connectedUser}`)
    .then((res) => {
      console.log(setUser(res.data))
      console.log('ca fonctionne?')
      ;
    })
    .catch((err) => console.error(err));
    }
    useEffect(()=>{
        console.log(Ecole)
        console.log(captTest)
        console.log(MinusFormations)
          
    },[])
    useEffect(()=>{
        console.log(uploadCouv)
        console.log(NumberEcole)
        console.log(ecoleNumberArray)
        
        for(let i=1;i<=NumberEcole;i++){
          arrayTest.push(` Ecole de conduite ${i}`)
        }
        setEcoleNumberArray(arrayTest)
        console.log(onePicture)  
    },[NumberEcole])
    const getValue=(e)=>{
        setNumberEcole(e.target.value)
    }
    const setLengthAndElementFormation=(e)=>{
        setCaptNomFormation(e.target.value)   
    }
    let formationsArray=[]
    const setFormationElement=()=>{
        setAfficheTricksFormation(true)
        formationsArray.push(captNomFormation)
        console.log(formationsArray)
    }
    /*************modification part *********/
   const submitModify=()=>
    {
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${connectedUser}`,{Formation:captNomFormation})
    .then((response) => {
      console.log(setModify(response.data));
      console.log("ca marche")
      getUser()
    })
    .catch((err) => console.error(err));

   
    
}

  

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
            getUser()
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
                <div className='containerEtablissements'>
                        <p>Etablissements</p>
                        {ecoleNumberArray.map((event,index)=>
                            <div className='containerFormations' key={index}>
                               <div className='containerArray'>
                                    <p onClick={()=>{setEcole(event)}}>{event}</p>
                                    <p>-</p>
                               </div>
                               <div className={Ecole===event?'containerInformations':'containerInformations2'} id={index}>
                                    <p className='pInformations'>Informations</p>
                                    <div className='containerCouvUpload'>
                                    {User!=undefined?<img src={User.couvertureUrl} className='imgCouverture'></img>: <img src={couv} className='imgCouverture'></img>}
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
                                    <div className='pTEAndLogoMinus'>
                                        <p>Type d'établissement</p>
                                        {MinusTE===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusTE===false?setMinusTE(true):setMinusTE(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusTE===false?setMinusTE(true):setMinusTE(false)}}>-</p></div>}
                                    </div>
                                    <div className={MinusTE===false?'containerButtonAndBoxcase2':'containerButtonAndBoxcase'}>
                                        <div className='containercheckBoxAndP'>
                                            <p>Auto-école</p>
                                            <div className={checkAuto===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{checkAuto===false?setCheckAuto(true):setCheckAuto(false)}}>
                                                <img src={check} className={checkAuto===true?'checkTrue':'checkFalse'}></img>
                                            </div>
                                        </div>
                                        <div className='containercheckBoxAndP'>
                                            <p>Moto-école</p>
                                            <div className={checkMoto===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{checkMoto===false?setCheckMoto(true):setCheckMoto(false)}}>
                                                <img src={check} className={checkMoto===true?'checkTrue':'checkFalse'}></img>
                                            </div>
                                        </div>
                                        <div className='containercheckBoxAndP'>
                                            <p>Bateau-école</p>
                                            <div className={checkBateau===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{checkBateau===false?setCheckbateau(true):setCheckbateau(false)}}>
                                                <img src={check} className={checkBateau===true?'checkTrue':'checkFalse'}></img>
                                            </div>
                                        </div>
                                        <input   type='submit' className='buttonValidBoxcase' onClick={submitModify} value={'Valider'}></input>
                                    </div>
                                    <div className='pNDAndLogoMinus'>
                                        <p>Nom et descriptif</p>
                                        {MinusND===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusND===false?setMinusND(true):setMinusND(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusND===false?setMinusND(true):setMinusND(false)}}>-</p></div>}
                                    </div>
                                    <div className={MinusND===false?'containerNomDescription':'containerNomDescription2'}>
                                        <input type='text' placeholder='Nom' className='inputNom'></input>
                                        <textarea type='text' placeholder='Descriptif' className='inputDescriptif' rows="10" cols="30"></textarea>
                                        <input   type='submit' className='buttonValidBoxcase' value={'Valider'}></input>
                                    </div>
                                    <div className='pLocalAndLogoMinus'>
                                        <p>Localisation</p>
                                        {MinusLocal===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusLocal===false?setMinusLocal(true):setMinusLocal(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusLocal===false?setMinusLocal(true):setMinusLocal(false)}}>-</p></div>}
                                    </div>
                                    <div className={MinusLocal===false?'containerLocalisation':'containerLocalisation2'}>
                                        <input type='text' placeholder='Adresse' className='inputNom'></input>
                                        <input type='number'id="tentacles" name="tentacles" className='inputNom' placeholder='code postal'></input>
                                        <input type='text' placeholder='Ville' className='inputNom'></input>
                                        <input   type='submit' className='buttonValidBoxcase' value={'Valider'}></input>
                                    </div>
                                    <div className='pContactAndLogoMinus'>
                                        <p>Contact</p>
                                        {MinusContact===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusContact===false?setMinusContact(true):setMinusContact(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusContact===false?setMinusContact(true):setMinusContact(false)}}>-</p></div>}
                                    </div>
                                    <div className={MinusContact===false?'containerLocalisation':'containerLocalisation2'}>
                                        <input type='text' placeholder='Adresse mail' className='inputNom'></input>
                                        <input type='number'id="tentacles" name="tentacles" className='inputNom' placeholder='Téléphone'></input>
                                        <input type='text' placeholder='site internet' className='inputNom'></input>
                                        <input   type='submit' className='buttonValidBoxcase' value={'Valider'}></input>
                                    </div>
                                    <div className='pContactAndLogoMinus'>
                                        <p>Horaires</p>
                                        {MinusHoraires===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusHoraires===false?setMinusHoraires(true):setMinusHoraires(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusHoraires===false?setMinusHoraires(true):setMinusHoraires(false)}}>-</p></div>}
                                    </div>
                                    <div className={MinusHoraires===false?'containerLocalisation':'containerLocalisation2'}>
                                        <div className='containerOngletBureauConduite'>
                                            <div className='containerLiseretOnglet'>
                                                <p className={OngletHoraires==='bureau'?'bureauTrue':'bureauFalse'}onClick={()=>{OngletHoraires==='bureau'?setOngletHoraires('conduite'):setOngletHoraires('bureau')}}>Bureau</p>
                                                <div className={OngletHoraires==='bureau'?'liseretOngletSelectionne':'liseretOngletSelectionne2'}></div>
                                            </div>
                                            <div>
                                                <p className={OngletHoraires==='bureau'?'bureauFalse':'bureauTrue'} onClick={()=>{OngletHoraires==='bureau'?setOngletHoraires('conduite'):setOngletHoraires('bureau')}}>Conduite</p>
                                                <div className={OngletHoraires==='bureau'?'liseretOngletSelectionneConduite2':'liseretOngletSelectionneConduite'}></div>
                                            </div>
                                        </div>
                                        <div className='liseretHoraires'></div>
                                        <div className={OngletHoraires==='bureau'?'containerHorairesBureau':'containerHorairesBureau2'}>
                                            <div className='containerHorairesCalendar'>
                                                <p>Lundi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Mardi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Mercredi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Jeudi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Vendredi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Samedi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Dimanche</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'}></input>
                                        </div>
                                        <div className={OngletHoraires==='bureau'?'containerHorairesConduite2':'containerHorairesConduite'}>
                                            <div className='containerHorairesCalendar'>
                                                <p>Lundi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Mardi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Mercredi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Jeudi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Vendredi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Samedi</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='containerHorairesCalendar'>
                                                <p>Dimanche</p>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Matin</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="7:00">7:00</option>
                                                            <option value="7:30">7:30</option>
                                                            <option value="8:00">8:00</option>
                                                            <option value="8:30">8:30</option>
                                                            <option value="9:00">9:00</option>
                                                            <option value="9:30">9:30</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>        
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='containerBoxHorairesDay'>
                                                    <p>Après-midi</p>
                                                    <div className='containerDropBox'>
                                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>   
                                                        </select>
                                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setCaptTest(e.target.value)}}>
                                                            <option value="Fermé">Fermé</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option> 
                                                            <option value="20:00">20:00</option> 
                                                            <option value="20:30">20:30</option>  
                                                            <option value="21:00">21:00</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'}></input>
                                        </div>
                                    </div>
                                    <div className='pFormationAndLogoMinus'>
                                        <p>Formation</p>
                                        {MinusFormations===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusFormations===false?setMinusFormations(true):setMinusFormations(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusFormations===false?setMinusFormations(true):setMinusFormations(false)}}>-</p></div>}
                                    </div>
                                    <div className={MinusFormations===false?'containerFormation2':'containerFormation'}>
                                        <div className='containerOngletsFormation'>
                                            <div className={OngletFormations==='Auto'?'categorieOngletandLiseret2':'categorieOngletandLiseret'}onClick={()=>{setOngletFormations('Auto')}}>
                                                <p>Auto</p>
                                                <div className={OngletFormations==='Auto'?'liseretCateg':"liseretCateg2"}></div>
                                            </div>
                                            <div className={OngletFormations==='Moto'?'categorieOngletandLiseret2':'categorieOngletandLiseret'}onClick={()=>{setOngletFormations('Moto')}}>
                                                <p>2 Roues</p>
                                                <div className={OngletFormations==='Moto'?'liseretCateg':"liseretCateg2"}></div>
                                            </div>
                                            <div className={OngletFormations==='Bateau'?'categorieOngletandLiseret2':'categorieOngletandLiseret'}onClick={()=>{setOngletFormations('Bateau')}}>
                                                <p>Bateau</p>
                                                <div className={OngletFormations==='Bateau'?'liseretCateg':"liseretCateg2"}></div>
                                            </div>
                                            <div className={OngletFormations==='Stages'?'categorieOngletandLiseret2':'categorieOngletandLiseret'}onClick={()=>{setOngletFormations('Stages')}}>
                                                <p>Stages</p>
                                                <div className={OngletFormations==='Stages'?'liseretCateg':"liseretCateg2"}></div>
                                            </div>
                                        </div>
                                        <div className='liseretHoraires'></div>
                                        <div className='pForfaitAndLogoMinus'>
                                            <p>Nouveau forfait</p>
                                            {MinusAddFormations===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusAddFormations===false?setMinusAddFormations(true):setMinusAddFormations(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusFormations===false?setMinusAddFormations(true):setMinusAddFormations(false)}}>-</p></div>}
                                        </div>
                                    {afficheTriksFormation===true? <p>{captNomFormation}</p>:<p style={{display:"none"}}></p>}
                                        <div className={MinusAddFormations===false?'containerNomDescription':'containerNomDescription2'}>
                                            <input type='text' placeholder='Nom de la formation' className='inputNom' onChange={(e)=>setLengthAndElementFormation(e)}></input>
                                            <textarea type='text' placeholder='Descriptif de la formation' className='inputDescriptif' rows="10" cols="30"></textarea>
                                            <input type='number' placeholder='prix de la formation' className='inputNom'></input>
                                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{setFormationElement()}}></input>
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        )}
                </div>
                
            </main>
        </div>
    )
}