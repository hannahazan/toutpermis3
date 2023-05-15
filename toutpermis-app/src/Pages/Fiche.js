import '../css/Fiche.css'
import Navbar from '../component/Navbar'
import { useEffect,useState,ChangeEvent,useContext } from 'react'
import {InscriptionContext as getConnectedUser} from '../utilitaires/InscriptionContext'
import axios from 'axios'
import { set } from 'mongoose'
import dropArrow from '../images/iconsAwesome/caret-down-solid.svg'
import check from '../images/iconsAwesome/check-solid (1).svg'
import couv from '../images/Rectangle 516.png'
import arrow from '../images/iconsAwesome/arrow-right-solid.svg'
import trash from '../images/iconsAwesome/trash-solid.svg'
import modif from '../images/iconsAwesome/gear-solid (1).svg'
import Supprimer from '../component/pop-upSupprimer.js'



const Fiche=()=>{
    const{connectedUser}=useContext(getConnectedUser)

    console.log(connectedUser)
    const [uploadCouv, setUploadCouv] = useState()
    const [uploadLogo,setUploadLogo]=useState()
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
    const [FormationName,setFormationName]=useState()
    const [FormationDescriptif,setFormationDescriptif]=useState()
    const [FormationPrix,setFormationPrix]=useState()
    const [AddEcole,setAddEcole]=useState(false)
    const [EcoleName,setEcoleName]=useState('')
    const [Create,setCreate]=useState(false)
    const [Couverture,setCouverture]=useState([])
    const [Logo,setLogo]=useState([])
    const [Fiche,setFiche]=useState([])
    const [modify,setModify]=useState()
   
    /***************************Toutes les fiches d'un user*******************************************************/
    const [AllOfOne,setAllOfOne]=useState([])

    /***********************Les informations d'une seule fiche************************************** */
    const [FicheLien,setFicheLien]=useState([])
    const [couvertureLien,setCouvertureLien]=useState([])
    const [LogoLien,setLogoLien]=useState([])
    const [test,setTest]=useState(false)//logique faire apparaitre le lien d'une fiche cliquée

    /*********************Horaires Bureau *************************************/
    const [LundiMatinOuvre,setLundiMatinOuvre]=useState('Fermé')
    const [LundiMatinFerme,setLundiMatinferme]=useState('Fermé')
    const [LundiApremOuvre,setLundiApremOuvre]=useState('Fermé')
    const [LundiApremFerme,setLundiApremferme]=useState('Fermé')
    const [MardiMatinOuvre,setMardiMatinOuvre]=useState('Fermé')
    const [MardiMatinFerme,setMardiMatinFerme]=useState('Fermé')
    const [MardiApremOuvre,setMardiApremOuvre]=useState('Fermé')
    const [MardiApremFerme,setMardiApremFerme]=useState('Fermé')
    const [MercrediMatinFerme,setMercrediMatinFerme]=useState('Fermé')
    const [MercrediMatinOuvre,setMercrediMatinOuvre]=useState('Fermé')
    const [MercrediApremOuvre,setMercrediApremOuvre]=useState('Fermé')
    const [MercrediApremFerme,setMercrediApremFerme]=useState('Fermé')
    const [JeudiMatinFerme,setJeudiMatinFerme]=useState('Fermé')
    const [JeudiMatinOuvre,setJeudiMatinOuvre]=useState('Fermé')
    const [JeudiApremFerme,setJeudiApremFerme]=useState('Fermé')
    const [JeudiApremOuvre,setJeudiApremOuvre]=useState('Fermé')
    const [VendrediMatinOuvre,setVendrediMatinOuvre]=useState('Fermé')
    const [VendrediMatinFerme,setVendrediMatinFerme]=useState('Fermé')
    const [VendrediApremOuvre,setVendrediApremOuvert]=useState('Fermé')
    const [VendrediApremFerme,setVendrediApremFerme]=useState('Fermé')
    const [SamediMatinOuvre,setSamediMatinOuvre]=useState('Fermé')
    const [SamediMatinFerme,setSamediMatinFerme]=useState('Fermé')
    const [SamediApremOuvre,setSamediApremOuvert]=useState('Fermé')
    const [SamediApremFerme,setSamediApremFerme]=useState('Fermé')
    const [DimancheMatinOuvre,setDimancheMatinOuvre]=useState('Fermé')
    const [DimancheMatinFerme,setDimancheMatinFerme]=useState('Fermé')
    const [DimancheApremOuvre,setDimancheApremOuvert]=useState('Fermé')
    const [DimancheApremFerme,setDimancheApremFerme]=useState('Fermé')

    /*****************************Horaires Conduite**************************************************/

    const [LundiMatinOuvreConduite,setLundiMatinOuvreConduite]=useState('Fermé')
    const [LundiMatinFermeConduite,setLundiMatinfermeConduite]=useState('Fermé')
    const [LundiApremOuvreConduite,setLundiApremOuvreConduite]=useState('Fermé')
    const [LundiApremFermeConduite,setLundiApremfermeConduite]=useState('Fermé')
    const [MardiMatinOuvreConduite,setMardiMatinOuvreConduite]=useState('Fermé')
    const [MardiMatinFermeConduite,setMardiMatinFermeConduite]=useState('Fermé')
    const [MardiApremOuvreConduite,setMardiApremOuvreConduite]=useState('Fermé')
    const [MardiApremFermeConduite,setMardiApremFermeConduite]=useState('Fermé')
    const [MercrediMatinFermeConduite,setMercrediMatinFermeConduite]=useState('Fermé')
    const [MercrediMatinOuvreConduite,setMercrediMatinOuvreConduite]=useState('Fermé')
    const [MercrediApremOuvreConduite,setMercrediApremOuvreConduite]=useState('Fermé')
    const [MercrediApremFermeConduite,setMercrediApremFermeConduite]=useState('Fermé')
    const [JeudiMatinFermeConduite,setJeudiMatinFermeConduite]=useState('Fermé')
    const [JeudiMatinOuvreConduite,setJeudiMatinOuvreConduite]=useState('Fermé')
    const [JeudiApremFermeConduite,setJeudiApremFermeConduite]=useState('Fermé')
    const [JeudiApremOuvreConduite,setJeudiApremOuvreConduite]=useState('Fermé')
    const [VendrediMatinOuvreConduite,setVendrediMatinOuvreConduite]=useState('Fermé')
    const [VendrediMatinFermeConduite,setVendrediMatinFermeConduite]=useState('Fermé')
    const [VendrediApremOuvreConduite,setVendrediApremOuvertConduite]=useState('Fermé')
    const [VendrediApremFermeConduite,setVendrediApremFermeConduite]=useState('Fermé')
    const [SamediMatinOuvreConduite,setSamediMatinOuvreConduite]=useState('Fermé')
    const [SamediMatinFermeConduite,setSamediMatinFermeConduite]=useState('Fermé')
    const [SamediApremOuvreConduite,setSamediApremOuvertConduite]=useState('Fermé')
    const [SamediApremFermeConduite,setSamediApremFermeConduite]=useState('Fermé')
    const [DimancheMatinOuvreConduite,setDimancheMatinOuvreConduite]=useState('Fermé')
    const [DimancheMatinFermeConduite,setDimancheMatinFermeConduite]=useState('Fermé')
    const [DimancheApremOuvreConduite,setDimancheApremOuvertConduite]=useState('Fermé')
    const [DimancheApremFermeConduite,setDimancheApremFermeConduite]=useState('Fermé')

    /************PasBesoinDexplication***************** */
    const [Explication,setExplication]=useState()
    /******************popUpSuprimmer********************* */
    const [EcoleSup,setEcoleSup]=useState(String)
    const [CheckPopUpSupOpen,setCheckPopUpSupOpen]=useState(false)
    const [CheckDelete,setCheckDelete]=useState(Boolean)
   
    
    useEffect(()=>{
        console.log(`${CheckPopUpSupOpen} que se passe-t-il encore`)
    })
    /**************openPopUp*************** */
    const OpenPopUp=(ecolePop)=>{
        setEcoleSup(ecolePop)
        setCheckPopUpSupOpen(true)
    }
    /**********************Delete fiche******************** */
    const deleteOneFiche=(valeur)=>{
    setCheckPopUpSupOpen(false)
    setExplication(true)
    axios
   .delete(`http://localhost:5000/FicheEcolePrincipale/delete/${valeur}`)
   .then((response)=>{(console.log(response.data))
       getAllOfOne()
   }) 
   .catch(error => {
   console.log(error);
   })  
  }

    /**************get toutes les fiches d'un seul utilisateur, doit être
     utilisée lorsque les fiches ont déjà été créées et que l'utilisateur revient dessus************************ */
    const getAllOfOne=()=>{
        axios
    .get(`http://localhost:5000/FicheEcolePrincipale/One/${connectedUser}`)
    .then((res) => {
      console.log(setAllOfOne(res.data))
      console.log(`Alors ${AllOfOne}`)
      ;
    })
    .catch((err) => console.error(err));
    }
    useEffect(()=>{
        getAllOfOne()
    },[])

   
    /***************** get info d'une fiche en particulier*************************** */
    const getOneFiche=(LinkEcole)=>{
        
        axios
    .get(`http://localhost:5000/FicheEcolePrincipale/creation/${LinkEcole}`)
    .then((res) => {
      console.log(setFicheLien(res.data))
      setTest(true)
      console.log('ca fonctionne pour le lien?')
      ;
    })
    .catch((err) => console.error(err));
        
        axios
    .get(`http://localhost:5000/FicheCouverture/${LinkEcole}`)
    .then((res) => {
      console.log(setCouvertureLien(res.data))
      console.log('ca fonctionne dans getOnefiche?')
      ;
    })
    .catch((err) => console.error(err));

        axios
    .get(`http://localhost:5000/FicheLogo/${LinkEcole}`)
    .then((res) => {
      console.log(setLogoLien(res.data))
      console.log('ca fonctionne?')
      
      ;
    })
    .catch((err) => console.error(err));
     
    }
    /****************************get infos liens *********************************************/
     const getCouvertureLien=()=>{
        axios
    .get(`http://localhost:5000/FicheCouverture/${FicheLien.EcoleName}`)
    .then((res) => {
      console.log(setCouvertureLien(res.data))
      console.log('ca fonctionne sûrement couvlien?')
      ;
    })
    .catch((err) => console.error(err));
    }

     const getLogoLien=()=>{
        axios
        .get(`http://localhost:5000/FicheLogo/${FicheLien.EcoleName}`)
        .then((res) => {
          console.log(setLogoLien(res.data))
          console.log('ca fonctionne sûrement logolien?')
          ;
        })
        .catch((err) => console.error(err));
     }
    /******************get part*****************************/
    const getCouverture=()=>{
        axios
    .get(`http://localhost:5000/FicheCouverture/${Fiche.EcoleName}`)
    .then((res) => {
      console.log(setCouverture(res.data))
      console.log('ca fonctionne?')
      ;
    })
    .catch((err) => console.error(err));
    }
    const getLogo=()=>{
        axios
    .get(`http://localhost:5000/FicheLogo/${Fiche.EcoleName}`)
    .then((res) => {
      console.log(setLogo(res.data))
      console.log('ca fonctionne?')
      ;
    })
    .catch((err) => console.error(err));
    }
    const getFiche=()=>{
        axios
    .get(`http://localhost:5000/FicheEcolePrincipale/creation/${EcoleName}`)
    .then((res) => {
      console.log(setFiche(res.data))
      console.log('ca fonctionne?')
      ;
    })
    .catch((err) => console.error(err));
    }
    useEffect(()=>{
        console.log(MinusFormations)
        console.log(EcoleName)     
    },[])
    useEffect(()=>{
        console.log(uploadCouv)   
              
    })
   
    
    /*************modification part *********/
   const completFiche=()=>
    {
     let NouvelleForm={
        Nom:FormationName,
        Descriptif:FormationDescriptif,
        prix:FormationPrix,
     }
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addFormation/${EcoleName}`,{Formation:NouvelleForm,HorairesBureau:{LundiMatinOuvre,LundiMatinFerme,LundiApremOuvre,LundiApremFerme,
MardiMatinOuvre,MardiMatinFerme,MardiApremOuvre,MardiApremFerme,MercrediMatinOuvre,MercrediMatinFerme,MercrediApremOuvre,MercrediApremFerme,JeudiMatinOuvre,JeudiMatinFerme,
JeudiApremOuvre,JeudiApremFerme,VendrediMatinOuvre,VendrediMatinFerme,VendrediApremOuvre,VendrediApremFerme,SamediMatinOuvre,SamediMatinFerme,
SamediApremOuvre,SamediApremFerme,DimancheMatinOuvre,DimancheMatinFerme,DimancheApremOuvre,DimancheApremFerme},HorairesConduite:{LundiMatinOuvreConduite,LundiMatinFermeConduite,LundiApremOuvreConduite,
LundiApremFermeConduite,MardiMatinOuvreConduite,MardiMatinFermeConduite,MardiApremOuvreConduite,MardiMatinFermeConduite,
MardiApremOuvreConduite,MardiApremFermeConduite,MercrediMatinOuvreConduite,MercrediMatinFermeConduite,MercrediApremOuvreConduite,
MercrediApremFermeConduite,JeudiMatinOuvreConduite,JeudiMatinFermeConduite,JeudiApremOuvreConduite,JeudiApremFermeConduite,
VendrediMatinOuvreConduite,VendrediMatinFermeConduite,VendrediApremOuvreConduite,VendrediApremFermeConduite,SamediMatinOuvreConduite,
SamediMatinFermeConduite,SamediApremOuvreConduite,SamediApremFermeConduite,DimancheMatinOuvreConduite,DimancheMatinFermeConduite,
DimancheApremOuvreConduite,DimancheApremFermeConduite}})
    .then((response) => {
      console.log(setModify(response.data));
      console.log("ca marche")
    })
    .catch((err) => console.error(err));
    
}

/*****************createfiche************************************/
    async function createFiche() {
     axios
     .post("http://localhost:5000/FicheEcolePrincipale/test",{EcoleName:EcoleName,UserPseudo:connectedUser})
     .then((response)=>{(console.log(response.data))
        getFiche()
     }) 
     .catch(error => {
     console.log(error);
     })
     setCreate(true)   
    }

    /**************upload part****************************/
    async function onSubmitLien(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('name','josephine')
        data.append('file',uploadCouv)
        data.append('UserPseudo',connectedUser)
        data.append('EcoleName',FicheLien.EcoleName)
        const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
        }
        
        axios.post("http://localhost:5000/FicheCouverture",data,config)
        .then((response)=>{(console.log(response.data))
            getCouvertureLien()
        }) 
        .catch(error => {
        console.log(error);
        });
        const dataLogo= new FormData
        dataLogo.append("name","martine")
        dataLogo.append('file',uploadLogo)
        dataLogo.append('UserPseudo',connectedUser)
        dataLogo.append('EcoleName',FicheLien.EcoleName)

        axios.post("http://localhost:5000/FicheLogo",dataLogo,config)
        .then((response)=>{(console.log(response.data))
            getLogoLien()
        }) 
        .catch(error => {
        console.log(error);
        });
        
}




/***********************************upload part lien/une fiche************************************************ */
async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('name','josephine')
    data.append('file',uploadCouv)
    data.append('UserPseudo',connectedUser)
    data.append('EcoleName',Fiche.EcoleName)
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    }
    
    axios.post("http://localhost:5000/FicheCouverture",data,config)
    .then((response)=>{(console.log(response.data))
        getCouverture()
    }) 
    .catch(error => {
    console.log(error);
    });
    const dataLogo= new FormData
    dataLogo.append("name","martine")
    dataLogo.append('file',uploadLogo)
    dataLogo.append('UserPseudo',connectedUser)
    dataLogo.append('EcoleName',Fiche.EcoleName)

    axios.post("http://localhost:5000/FicheLogo",dataLogo,config)
    .then((response)=>{(console.log(response.data))
        getLogo()
    }) 
    .catch(error => {
    console.log(error);
    });
    
}
/***************************fonction récupération d'évènements******************************************** */
const getBackInitiale=()=>{
    setCreate(false)
    setAddEcole(false)
    getAllOfOne()
    setCouverture([])
    setLogo([])
}
const getBackInitialeLien=()=>{
    setCreate(false)
    setAddEcole(false)
    setTest(false)
}


    return(
        <div className='fiche'>
            <Navbar/>
            
            <main className='mainFiche'>
            
                <div className={test===false?'containerTitreLien':'containerTitreLien2'}>
                    <div className='containerTitreArrow'>
                        {AddEcole===true || Create===true?<img src={arrow}  className='arrowFicheReturn' onClick={()=>{getBackInitiale()}}></img>:console.log('ouais')}
                        {Create===false || Fiche.length===0?<h1 className='titreFiche'>Mes fiches</h1>:<h1 className='titreFiche'>{Fiche.EcoleName}</h1>}
                    </div>
                    <p className={AllOfOne.length===0?'accompagnéP':'accompagnéP2'}>Besoin d’être accompagné pour remplir ta fiche et
                        attirer un max de candidats ?<br></br> 
                        Clique ici, on t’as concocté un petit guide !
                    </p>
                    {AllOfOne!=undefined && AddEcole===false?AllOfOne.map(
                        (event,index)=>
                        <div>
                            <div className='containerFicheName'>
                                <p key={index} className='pLienFiche'> {event.EcoleName}</p>
                                <div className='containerIconLienFiche'>
                                    <img src={modif} className='iconLien'onClick={()=>{getOneFiche(event.EcoleName)}}></img>
                                    <img src={trash} className='iconLien' onClick={()=>{OpenPopUp(event.EcoleName)}}></img>
                                </div>
                            </div>
                            <div className='liseretLien'></div>
                        </div> ):console.log('ok') }
                    <button className={AddEcole===false?'buttonAddEcole':'buttonAddEcole2'} onClick={()=>{setAddEcole(true)}}>Ajouter un établissement de conduite</button>
                    <div className={CheckPopUpSupOpen===true?'containerPopupSupprimerFiche':'containerPopupSupprimerFiche2'}>
                        <div className='containerDeplacementPopUp'>
                            <p>Êtes-vous sûr de vouloir supprimer</p>
                            <p className='pValuePopUp'>{EcoleSup}</p>
                            <div className='containerButtonPopUpSup'>
                                <button className='ButtonPopUpSup' onClick={()=>{deleteOneFiche(EcoleSup)}}>oui</button>
                                <button className='ButtonPopUpSup' onClick={()=>{setCheckPopUpSupOpen(false)}}>non</button>
                            </div>
                        </div>
                    </div>
                    <div className={AddEcole===true&&Create===false?'containerNomEtaButtonValider':'containerNomEtaButtonValider2'}>
                        <input type='text' placeholder="Nom de l'établissement" className='inputNom' onChange={(e)=>{setEcoleName(e.target.value)}}></input>
                        <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={createFiche}></input>
                    </div>
                </div>
                <div className={Create===true?'containerInformations':'containerInformations2'}>
                    <p className='pInformations'>Informations</p>
                    <div className='containerCouvUpload'>
                    {Couverture.length!=0?<img src={Couverture.CouvertureUrl} className='imgCouverture'></img>: <img src={couv} className='imgCouverture'></img>}
                        <input  type="file" id="imageFile" accept="image/*" placeholder='uploadCouv'  className='uploadHidden'onChange={(e)=>{setUploadCouv(e.target.files[0])}} multiple></input>
                        <div className='uploadFront'>Modifier Couverture</div>
                        <input  type="file" id="imageFile" accept="image/*" className='uploadLogoHidden' onChange={(e)=>{setUploadLogo(e.target.files[0])}}></input>
                        <div className='uploadfrontLogo'>Modifier Logo</div>
                        {Logo.length!=0?<img src={Logo.logoUrl}  className='uploadLogo'></img>:<div className='uploadLogo'>
                            <p className='pR'>R</p>
                            <p>C</p>
                        </div>}
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
                        <input   type='submit' className='buttonValidBoxcase'  value={'Valider'}></input>
                    </div>
                    <div className='pNDAndLogoMinus'>
                        <p>Description</p>
                        {MinusND===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusND===false?setMinusND(true):setMinusND(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusND===false?setMinusND(true):setMinusND(false)}}>-</p></div>}
                    </div>
                    <div className={MinusND===false?'containerNomDescription':'containerNomDescription2'}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setLundiMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setLundiMatinferme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setLundiApremOuvre(e.target.value)}} >
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setLundiApremferme(e.target.value)}} >
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMardiMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMardiMatinFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMardiApremOuvre(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMardiApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMercrediMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMercrediMatinFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMercrediApremOuvre(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMercrediApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setJeudiMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setJeudiMatinFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setJeudiApremOuvre(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setJeudiApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setVendrediMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setVendrediMatinFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setVendrediApremOuvert(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setVendrediApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setSamediMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setSamediMatinFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setSamediApremOuvert(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setSamediApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setDimancheMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setDimancheMatinOuvre(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setDimancheApremOuvert(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setDimancheApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setLundiMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setLundiMatinfermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setLundiApremOuvreConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setLundiApremfermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMardiMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMardiMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMardiApremOuvreConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMardiApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMercrediMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMercrediMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMercrediApremOuvreConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMercrediApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setJeudiMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setJeudiMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setJeudiApremOuvreConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setJeudiApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setVendrediMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setVendrediMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setVendrediApremOuvertConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setVendrediApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setSamediMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setSamediMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setSamediApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setSamediApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setDimancheMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setDimancheMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setDimancheApremOuvertConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setDimancheApremFermeConduite(e.target.value)}}>
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
                        <div className={MinusAddFormations===false?'containerNomDescription':'containerNomDescription2'}>
                            <input type='text' placeholder='Nom de la formation' className='inputNom' onChange={(e)=>setFormationName(e.target.value)}></input>
                            <textarea type='text' placeholder='Descriptif de la formation' className='inputDescriptif' rows="10" cols="30"onChange={(e)=>setFormationDescriptif(e.target.value)}></textarea>
                            <input type='number' placeholder='prix de la formation' className='inputNom' onChange={(e)=>{setFormationPrix(e.target.value)}}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={completFiche}></input>
                        </div>
                    </div>
                </div>
                <div className={test===true?'containerInformations':'containerInformations2'}>
                    <div className='containerTitreArrow'>
                        <img src={arrow}  className='arrowFicheReturn' onClick={()=>{getBackInitialeLien()}}></img>
                        {FicheLien.length!=0?<h1 className='titreFiche'>{FicheLien.EcoleName}</h1>:<h1 className='titreFiche'>Ma fiche</h1>}
                    </div>
                    <p className='pInformations'>Informations</p>
                    <div className='containerCouvUpload'>
                    {couvertureLien.length!=0?<img src={couvertureLien.CouvertureUrl} className='imgCouverture'></img>: <img src={couv} className='imgCouverture'></img>}
                        <input  type="file" id="imageFile" accept="image/*" placeholder='uploadCouv'  className='uploadHidden'onChange={(e)=>{setUploadCouv(e.target.files[0])}} multiple></input>
                        <div className='uploadFront'>Modifier Couverture</div>
                        <input  type="file" id="imageFile" accept="image/*" className='uploadLogoHidden' onChange={(e)=>{setUploadLogo(e.target.files[0])}}></input>
                        <div className='uploadfrontLogo'>Modifier Logo</div>
                        {LogoLien.length!=0?<img src={LogoLien.logoUrl}  className='uploadLogo'></img>:<div className='uploadLogo'>
                            <p className='pR'>R</p>
                            <p>C</p>
                        </div>}
                    </div>
                    <input   type='submit' className='buttonUpload' onClick={onSubmitLien} value={'Valider logo et couverture'}></input>
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
                        <input   type='submit' className='buttonValidBoxcase'  value={'Valider'}></input>
                    </div>
                    <div className='pNDAndLogoMinus'>
                        <p>Description</p>
                        {MinusND===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusND===false?setMinusND(true):setMinusND(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusND===false?setMinusND(true):setMinusND(false)}}>-</p></div>}
                    </div>
                    <div className={MinusND===false?'containerNomDescription':'containerNomDescription2'}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setLundiMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setLundiMatinferme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setLundiApremOuvre(e.target.value)}} >
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setLundiApremferme(e.target.value)}} >
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMardiMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMardiMatinFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMardiApremOuvre(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMardiApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMercrediMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMercrediMatinFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMercrediApremOuvre(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMercrediApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setJeudiMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setJeudiMatinFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setJeudiApremOuvre(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setJeudiApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setVendrediMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setVendrediMatinFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setVendrediApremOuvert(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setVendrediApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setSamediMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setSamediMatinFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setSamediApremOuvert(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setSamediApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setDimancheMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setDimancheMatinOuvre(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setDimancheApremOuvert(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setDimancheApremFerme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setLundiMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setLundiMatinfermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setLundiApremOuvreConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setLundiApremfermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMardiMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMardiMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMardiApremOuvreConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMardiApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMercrediMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMercrediMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setMercrediApremOuvreConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setMercrediApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setJeudiMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setJeudiMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setJeudiApremOuvreConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setJeudiApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setVendrediMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setVendrediMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setVendrediApremOuvertConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setVendrediApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setSamediMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setSamediMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setSamediApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setSamediApremFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setDimancheMatinOuvreConduite(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setDimancheMatinFermeConduite(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>{setDimancheApremOuvertConduite(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setDimancheApremFermeConduite(e.target.value)}}>
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
                        <div className={MinusAddFormations===false?'containerNomDescription':'containerNomDescription2'}>
                            <input type='text' placeholder='Nom de la formation' className='inputNom' onChange={(e)=>setFormationName(e.target.value)}></input>
                            <textarea type='text' placeholder='Descriptif de la formation' className='inputDescriptif' rows="10" cols="30"onChange={(e)=>setFormationDescriptif(e.target.value)}></textarea>
                            <input type='number' placeholder='prix de la formation' className='inputNom' onChange={(e)=>{setFormationPrix(e.target.value)}}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={completFiche}></input>
                        </div>
                    </div>
                </div>   
            </main>
        </div>
    )
}

export default Fiche