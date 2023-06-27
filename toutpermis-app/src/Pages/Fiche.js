import '../css/Fiche.css'
import Navbar from '../component/Navbar'
import { useEffect,useState,ChangeEvent,useContext } from 'react'
import {InscriptionContext as getConnectedUser} from '../utilitaires/InscriptionContext'
import axios from 'axios'
import { now, set } from 'mongoose'
import dropArrow from '../images/iconsAwesome/caret-down-solid.svg'
import check from '../images/iconsAwesome/check-solid (1).svg'
import couv from '../images/Rectangle 516.png'
import arrow from '../images/iconsAwesome/arrow-right-solid.svg'
import trash from '../images/iconsAwesome/trash-solid.svg'
import modif from '../images/iconsAwesome/gear-solid (1).svg'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import picEquipe from '../images/CardImage/Rectangle 519.png'




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
    const [DescriptionEcole,setDescriptionEcole]=useState(null)


    /****************************logique part: premières modifications apparition d'un nouveau boutton
     * validé pour modifier une partie des données de la fiche************************************* */
    const [valider,setValider]=useState(false)
    const [validerHorBur,setValiderHorBur]=useState(false)
    const [ValiderHorairesConduites,setValiderHorairesConduites]=useState(false)
   
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
    const [isCategorieFormation,setIsCategorieFormation]=useState(false)
    /***************************Formations a la carte*************************** */
    const [IsCategorieCarte,setIsCategorieCarte]=useState(false)
    const [MinusAddCarte,setMinusAddCarte]=useState(false)
    const [FormationCarteName,setFormationCarteName]=useState(String)
    const [FormationCarteDescriptif,setFormationCarteDescriptif]=useState(String)
    const [FormationCartePrix,setFormationCartePrix]=useState(String)
    const [ModifFormationCarte,setModifFormationCarte]=useState(false)
    const [ModificationFormationCarteNom,setModificationFormationCarteNom]=useState(String)
    const [ModificationFormationCarteDescriptif,setModificationFormationCarteDescriptif]=useState(String)
    const [ModificationFormationCartePrix,setModificationFormationCartePrix]=useState(String)
    const [ModifCarteSup,setModifCarteSup]=useState(null)
    const [isFormCarteDelete,setisFormCarteDelete]=useState(false)
    /*******************************getFicheFormation********************************************************/
    const [FicheFormation,setFicheFormation]=useState([])
    /************************Seconde Modification du type d'établissement change le button "modifications enregistrées********** */
    const [ModifTypesEtablissement,setModifTypesEtablissement]=useState(false)
    /***************logique apparition descriptif après validation et modification descriptif**************/
    const [isDescriptif,setIsdescriptif]=useState(false)
    const [isDescriptifModif,setIsDescriptifModif]=useState(false)
    /******************popUpSuprimmer********************* */
    const [EcoleSup,setEcoleSup]=useState(String)
    const [CheckPopUpSupOpen,setCheckPopUpSupOpen]=useState(false)
    const [CheckDelete,setCheckDelete]=useState(Boolean)
    const [uniquIdForm,setUniqueIdForm]=useState(Number)
    const [isFormDelete,setIsFormDelete]=useState(false)
    const [FormationNameSup,setFormationNameSup]=useState(null)
    /**************************identifier logo et couv****************************************************/
    const [IdLogo,setIdLogo]=useState(Number)
    const [LogoNew,setLogoNew]=useState([])
    const [couvNew,setCouvNew]=useState([])
    /***************************info upload Equipes********************************************************** */
    const [EquipesInfo,setEquipesInfo]=useState([])
    const [UploadEquipes,setUploadEquipes]=useState(null)
    const [MinusEquipe,setMinusEquipe]=useState(false)
    const [MinusAddMembre,setMinusAddMembre]=useState(false)
    const [NameMemberEquipe,setNameMemberEquipe]=useState(String)
    const [FonctionMemberEquipe,setFonctionMemberEquipe]=useState(String)
    const [OpenPopUpDeleteFromEquipe,setOpenPopUpDeleteFromEquipe]=useState(false)
    const [NameEquipe,setNameEquipe]=useState(String)
    const [IdEquipe,setIdEquipe]=useState(String)
    const [EquipeUrl,setEquipeUrl]=useState(String)
    const [EquipePictureName,setEquipePictureName]=useState(String)
    const [ModifyEquipe,setModifyEquipe]=useState(false)
    const [IdEquipeModify,setIdEquipeModify]=useState(String)
    /**************openPopUp*************** */
    const OpenPopUp=(ecolePop)=>{
        setEcoleSup(ecolePop)
        setCheckPopUpSupOpen(true)
    }
    const OpenPopUpForm=(ecolePop,id,NameForm)=>{
        setIsFormDelete(true)
        setEcoleSup(ecolePop)
        setUniqueIdForm(id)
        setCheckPopUpSupOpen(true)
        setFormationNameSup(NameForm)
    }
    const OpenPopUpFormCarte=(ecolePop,id,NameForm)=>{
        setisFormCarteDelete(true)
        setEcoleSup(ecolePop)
        setUniqueIdForm(id)
        setCheckPopUpSupOpen(true)
        setFormationNameSup(NameForm)
    }
    const closePopupWithoutDeleting=()=>{
        setCheckPopUpSupOpen(false)
        setisFormCarteDelete(false)
        setIsFormDelete(false)
        setOpenPopUpDeleteFromEquipe(false)
    }
    const OpenPopUpGeneral=(HookOpen,HookOpenFrom,HookId,id,HookName,Name)=>{
        HookOpen(true)
        HookId(id)
        HookName(Name)
        HookOpenFrom(true)
    }
    useEffect(()=>{
        console.log(`${isFormCarteDelete} tu la vois ma fucking variable?!!!`)
        console.log(`${OpenPopUpDeleteFromEquipe} la variable bool équipe`)
        console.log(`${NameEquipe} la variable Nom équipe`)
        console.log(`${IdEquipe} la variable id équipe`)
    })
    /****************modification formation et delete Hook********************** */
    const [ModifFormation,setModifFormation]=useState(false)
    const [ModificationFormationNom,setModificationFormationNom]=useState(null)
    const [ModificationFormationDescriptif,setModificationFormationDescriptif]=useState(null)
    const [ModificationFormationPrix,setModificationFormationPrix]=useState(null)
    const [ModifFormSup,setModifFormSup]=useState(null)
    /****************modification formation logique fonction*************************** */
    const OpenModifFormation=(Name,Descriptif,Prix,sup)=>{
        setModifFormation(true)
        setModificationFormationNom(Name)
        setModificationFormationDescriptif(Descriptif)
        setModificationFormationPrix(Prix)
        setModifFormSup(sup)
        setIsCategorieFormation(false)
    }
    /******************modification formation carte logique fonction ********************** */
    const OpenModifFormationCarte=(Name,Descriptif,Prix,sup)=>{
        setModifFormationCarte(true)
        setModificationFormationCarteNom(Name)
        setModificationFormationCarteDescriptif(Descriptif)
        setModificationFormationCartePrix(Prix)
        setModifCarteSup(sup)
        setIsCategorieCarte(false)
    }
    /**********container formation logique et function *************** */
    let testCategorie='Auto'
    const isOngletFormationsameAsFicheCategorie=(OngletCategorie)=>{
        console.log("heu ouais")
        setOngletFormations(OngletCategorie)
        testCategorie=OngletCategorie
        if(Fiche.Formation.length!=0){
            console.log("what")
            console.log(isCategorieFormation)
            for(let i=0;i<Fiche.Formation.length;i++){
               if(Fiche.Formation[i].categorie===testCategorie){
                    console.log('pourquoi tu rentres là-dedans')
                    setIsCategorieFormation(true)
                    console.log(Fiche.Formation[i].categorie)
                    console.log(OngletFormations)
                    break
               }
               else{
               console.log("rentre plutôt la-dedans")
               setIsCategorieFormation(false)
               }     
            }
        }
        else {
            setIsCategorieFormation(false)}
        if(Fiche.FormationCarte.length!=0){
            console.log("mais lol")
            console.log(isCategorieFormation)
            for(let j=0;j<Fiche.FormationCarte.length;j++){
               if(Fiche.FormationCarte[j].categorie===testCategorie){
                    console.log('pourquoi tu rentres là-dedans')
                    setIsCategorieCarte(true)
                    console.log(Fiche.FormationCarte[j].categorie)
                    console.log(OngletFormations)
                    break
               }
               else{
               console.log("rentre plutôt la-dedans")
               setIsCategorieCarte(false)
               }     
            }
        }
    
        else {
            setIsCategorieCarte(false)}
    }
   /* const isOngletFormationsameAsFicheCategorieDelete=()=>{
        alert("ha bon")
        setOngletFormations(OngletFormations)
        testCategorie=OngletFormations
        alert(testCategorie)
        alert(Fiche.Formation.length)
            for(let i=0;i<FicheFormation.Formation.length;i++){
               if(FicheFormation.Formation[i].categorie===testCategorie){
                    console.log('pourquoi tu rentres là-dedans')
                    alert(FicheFormation.Formation[i].categorie)
                    setIsCategorieFormation(true)
                    alert(isCategorieFormation)
                    console.log(FicheFormation.Formation[i].categorie)setEcoleNameget
                    console.log(OngletFormations)
                    break
               }
               else{
               console.log("rentre plutôt la-dedans")
               setIsCategorieFormation(false)
               }
            }
    }*/
    const letContainerFormationdesappear=()=>{
        setIsCategorieFormation(false)
        setMinusAddFormations(true)
    }
    const letContainerAppear=()=>{
        setIsCategorieFormation(true)
        setModifFormation(false)
    }
    const letContainerAppearFromFormationAdd=()=>{
        setIsCategorieFormation(true)
        setMinusAddFormations(false)
    }

    /***********************Formations cartes logique container résultat****************************************** */
    const letContainerFormationCartedesappear=()=>{
        setIsCategorieCarte(false)
        setMinusAddCarte(true)
    }
    const letContainerCarteAppear=()=>{
        setIsCategorieCarte(true)
        setModifFormationCarte(false)
    }
    const letContainerAppearFromAddCarte=()=>{
        setIsCategorieCarte(true)
        setMinusAddCarte(false)
    }
    /**********************Modification types d'établissement avant et après le premier valider******************************** */
    const ModifSecondTypeEtablissement=(Hook,setHook)=>{
        if(Hook===false && valider===false){
            setHook(true)
        }
        else if (Hook===false && valider===true){
            setModifTypesEtablissement(true)
            console.log(ModifTypesEtablissement)
            setHook(true)
        }
        else if (Hook===true && valider===true){
            setModifTypesEtablissement(true)
            setHook(false)
        }
        else{
        setHook(true)
    }
  }
  const testHook=(test,test2)=>{
    if(test2===false)
    {test(true)}
    else{
        test(false)
    }
  }

  const ModifSecondTypeEtabissementRequest =()=>{
        console.log('what')
        axios
        .put(`http://localhost:5000/FicheEcolePrincipale/${EcoleName}`,{Bateau:checkBateau,Voiture:checkAuto,Moto:checkMoto})
        .then((response) => {
            console.log(setModify(response.data));
            setModifTypesEtablissement(false)
            console.log("ca marche vraiment?")
          })
        .catch((err) => console.error(err)); 
  }
    /**********************Delete fiche******************** */
    const deleteOneFiche=(valeur,id)=>{
    if(isFormDelete===false && isFormCarteDelete===false && OpenPopUpDeleteFromEquipe==false)    
   { setCheckPopUpSupOpen(false)
    axios
   .delete(`http://localhost:5000/FicheEcolePrincipale/delete/${valeur}`)
   .then((response)=>{(console.log(response.data))
       getAllOfOne()
   }) 
   .catch(error => {
   console.log(error);
   })  }
   else if(isFormCarteDelete){ 
    setCheckPopUpSupOpen(false)
    console.log('ici')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/removeFormationCarte/${valeur}`,{FormationCarte:{"uniqueId":id}})
    .then((response)=>{(console.log(response.data))
      console.log("je ne comprend pas")
        setisFormCarteDelete(false)
        //getFicheFormation()
        getFiche()
        
    }) 
    .catch(error => {
    console.log(error);
    })   }
    else if(OpenPopUpDeleteFromEquipe){
        setCheckPopUpSupOpen(false)
        axios
        .delete(`http://localhost:5000/FicheEquipes/delete/${IdEquipe}`)
        .then((response)=>{(console.log(response.data))
            console.log("je suis bien ici")
              setOpenPopUpDeleteFromEquipe(false)
              //getFicheFormation()
              getEquipe()
    })}
   else 
  { 
   setCheckPopUpSupOpen(false)
   axios
   .put(`http://localhost:5000/FicheEcolePrincipale/removeFormation/${valeur}`,{Formation:{"uniqueId":id}})
   .then((response)=>{(console.log(response.data))
     console.log("je ne comprend pas POURQUOI TU PASSE Là")
       setIsFormDelete(false)
       //getFicheFormation()
       getFiche()
       
   }) 
   .catch(error => {
   console.log(error);
   }) }
  }
  const deleteOneFormation=()=>{
    axios
   .put(`http://localhost:5000/FicheEcolePrincipale/removeFormation/${Fiche.EcoleName}`,{Formation:{"uniqueId":ModifFormSup}})
   .then((response)=>{(console.log(response.data))
    getFiche()
   }) 
   .catch(error => {
   console.log(error);
   })  }
   const deleteOneFormationCarte=()=>{
    axios
   .put(`http://localhost:5000/FicheEcolePrincipale/removeFormationCarte/${Fiche.EcoleName}`,{FormationCarte:{"uniqueId":ModifCarteSup}})
   .then((response)=>{(console.log(response.data))
    getFiche()
   }) 
   .catch(error => {
   console.log(error);
   })  }
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

    const getCouverturewithId=()=>{
        axios
        .get(`http://localhost:5000/FicheCouverture/AvecId/${IdLogo}`)
        .then((res) => {
          console.log(setCouvNew(res.data))
          console.log('ca fonctionne?')
          ;
        })
        .catch((err) => console.error(err));
        }
    

    const getLogowithId=()=>{
        axios
    .get(`http://localhost:5000/FicheLogo/AvecId/${IdLogo}`)
    .then((res) => {
      console.log(setLogoNew(res.data))
      console.log('ca fonctionne pour le nouveau logo?')
      ;
    })
    .catch((err) => console.error(err));
    }
   
    useEffect(()=>{
        console.log(`${LogoNew} voyons voir ça`)
    })

    const getFiche=()=>{
        axios
    .get(`http://localhost:5000/FicheEcolePrincipale/creation/${EcoleName}`)
    .then((res) => {
      setFiche(res.data) 
      console.log(Fiche)
      //isOngletFormationsameAsFicheCategorie(OngletFormations)
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

    const getEquipe=()=>{
        axios
        .get(`http://localhost:5000/FicheEquipes/${EcoleName}`)
        .then((res) => {
          setEquipesInfo(res.data) 
          console.log(EquipesInfo)
          ;
        })
        .catch((err) => console.error(err));
    }

   
    /******************open formulaire descriptif modif et ferme apparition descriptif************************ */
    const closeApperçusDescriptifEtModdif=()=>{
        setIsdescriptif(false)
        setIsDescriptifModif(true)
        setDescriptionEcole(Fiche.Descriptif)
    }
    /***************close formulaire descriptif et ouvre apparition descriptif************************ */
    const closeFormulaireDescriptifOpenApperçusDescriptif=()=>{
        setIsdescriptif(true)
        setIsDescriptifModif(false)
    }
    /*************modification part ****************************************************/
   const DescriptifModif=()=>{
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${EcoleName}`,{Descriptif:DescriptionEcole})
    .then((response)=>{setModify(response.data)
        console.log("tout est ok bien sûr que tout est ok...mais à qui tu parles? on compense la solitude comme on peut...pillule bleu...ça rime") 
        setIsdescriptif(true)
        setIsDescriptifModif(false)
        getFiche()
      
    })
    .catch((err) => console.error(err));
   }
   const HorairesConduiteModif=()=>
    {
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addHorairesConduite/${EcoleName}`,{HorairesConduite:{LundiMatinOuvreConduite,LundiMatinFermeConduite,LundiApremOuvreConduite,
LundiApremFermeConduite,MardiMatinOuvreConduite,MardiMatinFermeConduite,MardiApremOuvreConduite,MardiMatinFermeConduite,
MardiApremOuvreConduite,MardiApremFermeConduite,MercrediMatinOuvreConduite,MercrediMatinFermeConduite,MercrediApremOuvreConduite,
MercrediApremFermeConduite,JeudiMatinOuvreConduite,JeudiMatinFermeConduite,JeudiApremOuvreConduite,JeudiApremFermeConduite,
VendrediMatinOuvreConduite,VendrediMatinFermeConduite,VendrediApremOuvreConduite,VendrediApremFermeConduite,SamediMatinOuvreConduite,
SamediMatinFermeConduite,SamediApremOuvreConduite,SamediApremFermeConduite,DimancheMatinOuvreConduite,DimancheMatinFermeConduite,
DimancheApremOuvreConduite,DimancheApremFermeConduite}})
    .then((response) => {
      console.log(setModify(response.data));
      setValiderHorairesConduites(true)
      console.log("ca marche")
    })
    .catch((err) => console.error(err));
    
}
const EcoleModif=()=>{
    console.log('what')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${EcoleName}`,{Bateau:checkBateau,Voiture:checkAuto,Moto:checkMoto})
    .then((response) => {
        console.log(setModify(response.data));
        setValider(true)
        console.log("ca marche vraiment?")
      })
    .catch((err) => console.error(err)); 
}

const HorairesBureauModif=()=>{
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addHorairesBureau/${EcoleName}`,{HorairesBureau:{LundiMatinOuvre,LundiMatinFerme,LundiApremOuvre,LundiApremFerme,
MardiMatinOuvre,MardiMatinFerme,MardiApremOuvre,MardiApremFerme,MercrediMatinOuvre,MercrediMatinFerme,MercrediApremOuvre,MercrediApremFerme,JeudiMatinOuvre,JeudiMatinFerme,
JeudiApremOuvre,JeudiApremFerme,VendrediMatinOuvre,VendrediMatinFerme,VendrediApremOuvre,VendrediApremFerme,SamediMatinOuvre,SamediMatinFerme,
SamediApremOuvre,SamediApremFerme,DimancheMatinOuvre,DimancheMatinFerme,DimancheApremOuvre,DimancheApremFerme}})
    .then((response) => {
      console.log(setModify(response.data));
      setValiderHorBur(true)
      console.log("ca marche")
    })
    .catch((err) => console.error(err));
}

const formationsModif=()=>{
    const uniqueId= Date.now()
    let NouvelleForm={
        Nom:FormationName,
        Descriptif:FormationDescriptif,
        prix:FormationPrix,
        categorie:OngletFormations,
        uniqueId:uniqueId
     }
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addFormation/${EcoleName}`,{Formation:NouvelleForm})
    .then((response) => {
        console.log(setModify(response.data));
        setMinusAddFormations(false)
        setIsCategorieFormation(true)
        getFiche()
        console.log("ca marche vraiment? formations")
      })
    .catch((err) => console.error(err)); 
}
const ModifFormationSecond=()=>{
    const uniqueId= Date.now()
    let NouvelleForm={
        Nom:ModificationFormationNom,
        Descriptif:ModificationFormationDescriptif,
        prix:ModificationFormationPrix,
        categorie:OngletFormations,
        uniqueId:uniqueId
     }
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addFormation/${EcoleName}`,{Formation:NouvelleForm})
    .then((response) => {
        console.log(setModify(response.data));
        setModifFormation(false)
        setIsCategorieFormation(true)
        deleteOneFormation()
        console.log("ca marche vraiment? formations modification")
      })
    .catch((err) => console.error(err)); 
}

const formationCarteModif=()=>{
    const uniqueId= Date.now()
    let NouvelleForm={
        Nom:FormationCarteName,
        Descriptif:FormationCarteDescriptif,
        prix:FormationCartePrix,
        categorie:OngletFormations,
        uniqueId:uniqueId
     }
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addFormationCarte/${EcoleName}`,{FormationCarte:NouvelleForm})
    .then((response) => {
        console.log(setModify(response.data));
        setMinusAddCarte(false)
        setIsCategorieCarte(true)
        getFiche()
        console.log("ca marche vraiment? carte")
      })
    .catch((err) => console.error(err)); 
}
const ModifFormationCarteSecond=()=>{
    const uniqueId= Date.now()
    let NouvelleForm={
        Nom:ModificationFormationCarteNom,
        Descriptif:ModificationFormationCarteDescriptif,
        prix:ModificationFormationCartePrix,
        categorie:OngletFormations,
        uniqueId:uniqueId
     }
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addFormationCarte/${EcoleName}`,{FormationCarte:NouvelleForm})
    .then((response) => {
        console.log(setModify(response.data));
        setModifFormationCarte(false)
        setIsCategorieCarte(true)
        deleteOneFormationCarte()
        console.log("ca marche vraiment? carte modification")
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

    /**************upload part lien/une fiche****************************/
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




/***********************************upload part ************************************************ */
async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('name','josephine')
    data.append('file',uploadCouv)
    data.append('UserPseudo',connectedUser)
    data.append('EcoleName',Fiche.EcoleName)
    data.append("idCouv",IdLogo)
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    }
    
    axios.post("http://localhost:5000/FicheCouverture",data,config)
    .then((response)=>{(console.log(response.data))
        getCouverturewithId()
    }) 
    .catch(error => {
    console.log(error);
    });
    const dataLogo= new FormData
    dataLogo.append("name","martine")
    dataLogo.append('file',uploadLogo)
    dataLogo.append('UserPseudo',connectedUser)
    dataLogo.append('EcoleName',Fiche.EcoleName)
    dataLogo.append("idLogo",IdLogo)
    

    axios.post("http://localhost:5000/FicheLogo",dataLogo,config)
    .then((response)=>{(console.log(response.data))
        getLogowithId()
    }) 
    .catch(error => {
    console.log(error);
    });
    
}

async function onSubmitEquipes(e) {
    e.preventDefault();
    const dataEquipes= new FormData
    dataEquipes.append("name","martine")
    dataEquipes.append('file',UploadEquipes)
    dataEquipes.append('UserPseudo',connectedUser)
    dataEquipes.append('EcoleName',Fiche.EcoleName)
    dataEquipes.append("idEquipes",IdLogo)
    dataEquipes.append("Fonction",FonctionMemberEquipe)
    dataEquipes.append("Nom",NameMemberEquipe)
    dataEquipes.append("logoUrl",EquipeUrl)
    dataEquipes.append("pictureName",EquipePictureName)
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    }
    
    axios.post("http://localhost:5000/FicheEquipes",dataEquipes,config)
    .then((response)=>{(console.log(response.data))
     getEquipe()
     setMinusAddMembre(false)
     setUploadEquipes(null)
    }) 
    .catch(error => {
    console.log(error);
    });
    
}
async function onSubmitModifyEquipes(e) {
    e.preventDefault();
    const dataEquipes= new FormData
    dataEquipes.append("name","martine")
    dataEquipes.append('file',UploadEquipes)
    dataEquipes.append('UserPseudo',connectedUser)
    dataEquipes.append('EcoleName',Fiche.EcoleName)
    dataEquipes.append("idEquipes",IdLogo)
    dataEquipes.append("Fonction",FonctionMemberEquipe)
    dataEquipes.append("Nom",NameMemberEquipe)
    dataEquipes.append("logoUrl",EquipeUrl)
    dataEquipes.append("pictureName",EquipePictureName)
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    }
    
    axios.post("http://localhost:5000/FicheEquipes",dataEquipes,config)
    .then((response)=>{(console.log(response.data))
     setUploadEquipes(null)
    }) 
    .catch(error => {
    console.log(error);
    });
    
    axios
    .delete(`http://localhost:5000/FicheEquipes/delete/${IdEquipeModify}`)
    .then((response)=>{(console.log(response.data))
        getEquipe()
        setModifyEquipe(false)
        setUploadEquipes(null)
       }) 
    .catch(error => {
        console.log(error);
        });
    
}


const uploadLogoId=(e)=>{
    setUploadLogo(e.target.files[0])
    const idtyLogo=Date.now()
    setIdLogo(idtyLogo)
}
const uploadCouvId=(e)=>{
    setUploadCouv(e.target.files[0])
    const idtyLogo=Date.now()
    setIdLogo(idtyLogo)
}
const uploadEquipesId=(e)=>{
    setUploadEquipes(e.target.files[0])
    const idtyLogo=Date.now()
    setIdLogo(idtyLogo)
}
const ModifUploadEquipe=(pictureName,url,id,name,fonction)=>{
    setEquipePictureName(pictureName)
    setEquipeUrl(url)
    setModifyEquipe(true)
    setIdEquipeModify(id)
    setNameMemberEquipe(name)
    setFonctionMemberEquipe(fonction)
}
/***************************fonction récupération d'évènements******************************************** */

const getBackInitiale=()=>{
    setCreate(false)
    setAddEcole(false)
    getAllOfOne()
    setCouverture([])
    setLogo([])
    setValider(false)
    setCheckAuto(false)
    setCheckMoto(false)
    setCheckbateau(false)
    setMinusTE(false)
    setMinusND(false)
    setMinusLocal(false)
    setMinusContact(false)
    setMinusHoraires(false)
    setMinusFormations(false)
    setOngletHoraires('bureau')
    setOngletFormations('Auto')
    setValiderHorBur(false)
    setValiderHorairesConduites(false)
    setIsdescriptif(false)
    setIsCategorieFormation(false)
    setIsCategorieCarte(false)
    setMinusAddCarte(false)
    for(let i=0;i<=55;i++)
    {document.getElementsByTagName('select')[i].selectedIndex=0
    console.log("moi je m'appelle weshden")
    }
    setCouvNew([])
    setLogoNew([])
    setEquipesInfo([])
   
}
const getBackInitialeLien=()=>{
    setCreate(false)
    setAddEcole(false)
    setTest(false)
}


useEffect(()=>{
    console.log(typeof checkAuto)
    //console.log(`${Fiche.Formation[0].Formation.Nom}je ne comprend pas`)
    console.log(ModifFormSup)
    console.log(Fiche.EcoleName)
    console.log(LundiMatinOuvreConduite)
    console.log(Fiche.Descriptif)
    console.log(checkAuto)
    console.log(`${ModifTypesEtablissement} c'est celui-ci le type d'établissement`)
    console.log(`${valider} ça c'est valider`)
})



    return(
        <div className={Create===true || test===true ?'fiche':'fiche2'}>
            <Navbar/>
            <div className={CheckPopUpSupOpen===true?'containerPopupSupprimerFiche':'containerPopupSupprimerFiche2'}>
                <div className={isFormDelete===true || isFormCarteDelete==true?'containerDeplacementPopUpDelete':OpenPopUpDeleteFromEquipe==true?'containerDeplacementPopUpDeleteEquipe':'containerDeplacementPopUp'}>
                    <p>Êtes-vous sûr de vouloir supprimer</p>
                    {isFormDelete===false && isFormCarteDelete===false?<p className='pValuePopUp'>{EcoleSup}</p>:<p className='pValuePopUp'>{FormationNameSup}</p>}
                    <div className='containerButtonPopUpSup'>
                        <button className='ButtonPopUpSupOui' onClick={()=>{deleteOneFiche(EcoleSup,uniquIdForm)}}>oui</button>
                        <button className='ButtonPopUpSupNon' onClick={()=>{closePopupWithoutDeleting()}}>non</button>
                    </div>
                </div>
            </div>
            <main className={CheckPopUpSupOpen===true?'mainFiche2':'mainFiche'}>
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
                    <div className={AddEcole===true&&Create===false?'containerNomEtaButtonValider':'containerNomEtaButtonValider2'}>
                        <input type='text' placeholder="Nom de l'établissement" className='inputNom' onChange={(e)=>{setEcoleName(e.target.value)}}></input>
                        <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={createFiche}></input>
                    </div>
                </div>
                <div className={Create===true?'containerInformations':'containerInformations2'}>
                    <p className='pInformations'>Informations</p> 
                    <div className='containerCouvUpload'>
                    {couvNew.length!=0?<img src={couvNew.CouvertureUrl} className='imgCouverture'></img>: <img src={couv} className='imgCouverture'></img>}
                        <input  type="file" id="imageFile" accept="image/*" placeholder='uploadCouv'  className='uploadHidden'onChange={(e)=>{uploadCouvId(e)}} multiple></input>
                        <div className='uploadFront'>Modifier Couverture</div>
                        <input  type="file" id="imageFile" accept="image/*" className='uploadLogoHidden' onChange={(e)=>{uploadLogoId(e)}}></input>
                        <div className='uploadfrontLogo'>Modifier Logo</div>
                        {LogoNew.length!=0?<img src={LogoNew.logoUrl}  className='uploadLogo'></img>:<div className='uploadLogo'>
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
                            <div className={checkAuto===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondTypeEtablissement(checkAuto,setCheckAuto)}}>
                                <img src={check} className={checkAuto===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <div className='containercheckBoxAndP'>
                            <p>Moto-école</p>
                            <div className={checkMoto===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondTypeEtablissement(checkMoto,setCheckMoto)}}>
                                <img src={check} className={checkMoto===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <div className='containercheckBoxAndP'>
                            <p>Bateau-école</p>
                            <div className={checkBateau===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondTypeEtablissement(checkBateau,setCheckbateau)}}>
                                <img src={check} className={checkBateau===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <input   type='submit' className={valider===false?'buttonValidBoxcase':'buttonValidBoxcase2'}  value={'Valider'} onClick={()=>{EcoleModif()}}></input>
                        <input   type='submit' className={valider===true && ModifTypesEtablissement===false?'buttonValidBoxcaseModif':valider===true && ModifTypesEtablissement===true?'buttonValidBoxcaseModif3':'buttonValidBoxcaseModif2'}  value={ModifTypesEtablissement===false?'Modification enregistrée':'valider'} onClick={()=>{ModifSecondTypeEtabissementRequest()}}></input>
                    </div>
                    <div className='pNDAndLogoMinus'>
                        <p>Description</p>
                        {MinusND===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusND===false?setMinusND(true):setMinusND(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusND===false?setMinusND(true):setMinusND(false)}}>-</p></div>}
                    </div>
                    <div className={isDescriptif===true && MinusND===true?'containerpDescriptifFicheModificonForfaitFiche':'containerpDescriptifFicheModificonForfaitFiche2'}>
                        {isDescriptif===true?<p className='pDescriptifFicheModif'>{Fiche.Descriptif}</p>:<p>hello</p>}
                        <img src={modif} className='iconForfaitFiche' onClick={()=>{closeApperçusDescriptifEtModdif()}}></img>
                    </div>
                    <form className={MinusND===false || isDescriptif===true || isDescriptifModif===true?'containerNomDescription':'containerNomDescription2'} id='resetDescriptif'>
                        <textarea type='text' placeholder='Descriptif' className='inputDescriptif' rows="10" cols="30" id='resetDescriptif' onChange={(e)=>{setDescriptionEcole(e.target.value)}}></textarea>
                        <input   type='reset' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{DescriptifModif()}}></input>
                    </form>
                    <form className={isDescriptifModif===false?'containerNomDescription':'containerNomDescription2'} id='resetDescriptif'>
                        <img src={cross} className='fermerFormFormationModifFiche' onClick={()=>{closeFormulaireDescriptifOpenApperçusDescriptif()}}></img>
                        <textarea type='text' placeholder='Descriptif' className='inputDescriptif'value={DescriptionEcole} rows="10" cols="30"  id='resetDescriptif' onChange={(e)=>{setDescriptionEcole(e.target.value)}}></textarea>
                        <input   type='reset' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{DescriptifModif()}}></input>
                    </form>
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
                                        <select name="Horaires1" className="Horaires2" id='selectHoraireBureauMatinLundiOuvert' onChange={(e)=>{setLundiMatinOuvre(e.target.value)}}>
                                            <option value="Fermé">Fermé</option>
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2"  onChange={(e)=>{setLundiMatinferme(e.target.value)}}>
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
                                        <select name="Horaires1" className="Horaires2"  onChange={(e)=>{setLundiApremOuvre(e.target.value)}} >
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
                                        <select name="Horaires" className="Horaires2"  id='selectHoraireBureauApremLundiferme' onChange={(e)=>{setLundiApremferme(e.target.value)}} >
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
                                        <select name="Horaires1" className="Horaires2"  onChange={(e)=>{setMardiMatinOuvre(e.target.value)}}>
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>{setDimancheMatinFerme(e.target.value)}}>
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
                            <input   type='submit' className={validerHorBur===false?'buttonValidBoxcase':'buttonValidBoxcase2'}  value={'Valider'} onClick={()=>{HorairesBureauModif()}}></input>
                            <input   type='submit' className={validerHorBur===true?'buttonValidBoxcaseModif':'buttonValidBoxcaseModif2'}  value={'Modification enregistrée'} ></input>
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
                            <input type='submit'   className={ValiderHorairesConduites===false?'buttonValidBoxcase':'buttonValidBoxcase2'} value={'Valider'} onClick={()=>{HorairesConduiteModif()}}></input>
                            <input   type='submit' className={ValiderHorairesConduites===true?'buttonValidBoxcaseModif':'buttonValidBoxcaseModif2'}  value={'Modification enregistrée'} ></input>
                        </div>
                    </div>
                    <div className='pFormationAndLogoMinus'>
                        <p>Formation</p>
                        {MinusFormations===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusFormations===false?setMinusFormations(true):setMinusFormations(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusFormations===false?setMinusFormations(true):setMinusFormations(false)}}>-</p></div>}
                    </div>
                    <div className={MinusFormations===false?'containerFormation2':'containerFormation'}>
                        <div className='containerOngletsFormation'>
                            <div className={OngletFormations==='Auto'?'categorieOngletandLiseret2':'categorieOngletandLiseret'}onClick={()=>{isOngletFormationsameAsFicheCategorie('Auto')}}>
                                <p>Auto</p>
                                <div className={OngletFormations==='Auto'?'liseretCateg':"liseretCateg2"}></div>
                            </div>
                            <div className={OngletFormations==='Moto'?'categorieOngletandLiseret2':'categorieOngletandLiseret'}onClick={()=>{isOngletFormationsameAsFicheCategorie('Moto')}}>
                                <p>2 Roues</p>
                                <div className={OngletFormations==='Moto'?'liseretCateg':"liseretCateg2"}></div>
                            </div>
                            <div className={OngletFormations==='Bateau'?'categorieOngletandLiseret2':'categorieOngletandLiseret'}onClick={()=>{isOngletFormationsameAsFicheCategorie('Bateau')}}>
                                <p>Bateau</p>
                                <div className={OngletFormations==='Bateau'?'liseretCateg':"liseretCateg2"}></div>
                            </div>
                            <div className={OngletFormations==='Stages'?'categorieOngletandLiseret2':'categorieOngletandLiseret'}onClick={()=>{isOngletFormationsameAsFicheCategorie('Stages')}}>
                                <p>Stages</p>
                                <div className={OngletFormations==='Stages'?'liseretCateg':"liseretCateg2"}></div>
                            </div>
                        </div>
                        <div className='liseretHoraires'></div>
                        <div className='pForfaitAndLogoMinus'>
                            <p className="pFormationFiche">Forfaits</p>
                            <button  className={Fiche.length!=0 && isCategorieFormation===false?'buttonAjouter':'buttonAjouter2'} onClick={()=>{setMinusAddFormations(true)}}>+ Nouveau forfait</button>
                        </div>
                        <div className={isCategorieFormation===true ?'containerPrixNomFormation':'containerPrixNomFormation2'}>
                            <div className={Fiche.length!=0 && Fiche.Formation.length!=0?'containerNomPrixFormationFiche':'containerNomPrixFormationFiche2'}>
                            <p>Nom</p>
                            <p className='pPrixForfaitFiche'>Prix</p>
                            </div>
                        {Fiche.length!=0 && Fiche.Formation.length!=0?Fiche.Formation.map( 
                        (event)=>
                        event.categorie==='Auto'&& OngletFormations==='Auto'? 
                        <div > 
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{OpenModifFormation(event.Nom,event.Descriptif,event.prix,event.uniqueId)}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpForm(Fiche.EcoleName,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>: event.categorie==='Moto'&& OngletFormations==='Moto'?<div >
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{OpenModifFormation(event.Nom,event.Descriptif,event.prix,event.uniqueId)}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpForm(Fiche.EcoleName,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>: event.categorie==='Bateau'&& OngletFormations==='Bateau'?<div >
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{OpenModifFormation(event.Nom,event.Descriptif,event.prix,event.uniqueId)}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpForm(Fiche.EcoleName,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>:event.categorie==='Stages'&& OngletFormations==='Stages'?<div>
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{OpenModifFormation(event.Nom,event.Descriptif,event.prix,event.uniqueId)}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpForm(Fiche.EcoleName,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>:console.log('genial')
                        ):console.log('ok') }
                        </div>
                        <button  className={Fiche.length!=0 && isCategorieFormation===true && ModifFormation===false && MinusAddFormations===false?'buttonAjouter3':'buttonAjouter2'} onClick={()=>{letContainerFormationdesappear()}}>+ Nouveau forfait</button>   
                        <div className={MinusAddFormations===false?'containerNomDescription':'containerNomDescription2'}>
                            <img src={cross} className='fermerFormFormationModifFiche'onClick={()=>{letContainerAppearFromFormationAdd()}}></img>
                            <input type='text' placeholder='Nom de la formation' className='inputNom' onChange={(e)=>setFormationName(e.target.value)}></input>
                            <textarea type='text' placeholder='Descriptif de la formation' className='inputDescriptif' rows="10" cols="30"onChange={(e)=>setFormationDescriptif(e.target.value)}></textarea>
                            <input type='number' placeholder='prix de la formation' className='inputNom' onChange={(e)=>{setFormationPrix(e.target.value)}}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{formationsModif()}}></input>
                        </div>
                        <div className={ModifFormation===false?'containerNomDescription':'containerNomDescription2'}>
                            <div className='containerModifFormationPAndCross'>
                                <p>Modifier Formation</p>
                                <img src={cross} className='fermerFormFormationModifFiche2'onClick={()=>{letContainerAppear()}}></img>
                            </div> 
                            <input type='text' placeholder='Nom de la formation' className='inputNom' value={ModificationFormationNom} onChange={(e)=>{setModificationFormationNom(e.target.value)}}></input>
                            <textarea type='text' placeholder='Descriptif de la formation' className='inputDescriptif' rows="10" cols="30" value={ModificationFormationDescriptif} onChange={(e)=>{setModificationFormationDescriptif(e.target.value)}}></textarea>
                            <input type='number' placeholder='prix de la formation' className='inputNom' value={ModificationFormationPrix} onChange={(e)=>{setModificationFormationPrix(e.target.value)}}></input>
                            <input   type='submit' className='buttonValidModifForm' value={'Valider modifications'} onClick={()=>{ModifFormationSecond()}}></input>
                        </div>
                        <div className='pForfaitAndLogoMinus'>
                            <p className="pFormationFiche">A la carte</p>
                            <button  className={Fiche.length!=0 && IsCategorieCarte===false?'buttonAjouter':'buttonAjouter2'} onClick={()=>{setMinusAddCarte(true)}}>+ Nouveau service</button>
                        </div>
                        <div className={IsCategorieCarte===true ?'containerPrixNomFormation':'containerPrixNomFormation2'}>
                            <div className={Fiche.length!=0 && Fiche.FormationCarte.length!=0?'containerNomPrixFormationFiche':'containerNomPrixFormationFiche2'}>
                            <p>Service</p>
                            <p className='pPrixForfaitFiche'>Prix</p>
                            </div>
                        {Fiche.length!=0 && Fiche.FormationCarte.length!=0?Fiche.FormationCarte.map( 
                        (event)=>
                        event.categorie==='Auto'&& OngletFormations==='Auto'? 
                        <div > 
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{ OpenModifFormationCarte(event.Nom,event.Descriptif,event.prix,event.uniqueId)}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpFormCarte(Fiche.EcoleName,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>: event.categorie==='Moto'&& OngletFormations==='Moto'?<div >
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{ OpenModifFormationCarte(event.Nom,event.Descriptif,event.prix,event.uniqueId)}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpFormCarte(Fiche.EcoleName,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>: event.categorie==='Bateau'&& OngletFormations==='Bateau'?<div >
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{ OpenModifFormationCarte(event.Nom,event.Descriptif,event.prix,event.uniqueId)}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpFormCarte(Fiche.EcoleName,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>:event.categorie==='Stages'&& OngletFormations==='Stages'?<div>
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{ OpenModifFormationCarte(event.Nom,event.Descriptif,event.prix,event.uniqueId)}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpFormCarte(Fiche.EcoleName,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>:console.log('genial')
                        ):console.log('ok') }
                        </div>
                        <button  className={Fiche.length!=0 && IsCategorieCarte===true && ModifFormation===false && MinusAddCarte===false?'buttonAjouter3':'buttonAjouter2'} onClick={()=>{letContainerFormationCartedesappear()}}>+ Nouveau service</button>   
                        <div className={MinusAddCarte===false?'containerNomDescription':'containerNomDescription2'}>
                            <img src={cross} className='fermerFormFormationModifFiche'onClick={()=>{letContainerAppearFromAddCarte()}}></img>
                            <input type='text' placeholder='Nom de la formation' className='inputNom' onChange={(e)=>setFormationCarteName(e.target.value)}></input>
                            <textarea type='text' placeholder='Descriptif de la formation' className='inputDescriptif' rows="10" cols="30"onChange={(e)=>setFormationCarteDescriptif(e.target.value)}></textarea>
                            <input type='number' placeholder='prix de la formation' className='inputNom' onChange={(e)=>{setFormationCartePrix(e.target.value)}}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{formationCarteModif()}}></input>
                        </div>
                        <div className={ModifFormationCarte===false?'containerNomDescription':'containerNomDescription2'}>
                            <div className='containerModifFormationPAndCross'>
                                <p>Modifier Service</p>
                                <img src={cross} className='fermerFormFormationModifFiche2'onClick={()=>{letContainerCarteAppear()}}></img>
                            </div> 
                            <input type='text' placeholder='Nom de la formation' className='inputNom' value={ModificationFormationCarteNom} onChange={(e)=>{setModificationFormationCarteNom(e.target.value)}}></input>
                            <textarea type='text' placeholder='Descriptif de la formation' className='inputDescriptif' rows="10" cols="30" value={ModificationFormationCarteDescriptif} onChange={(e)=>{setModificationFormationCarteDescriptif(e.target.value)}}></textarea>
                            <input type='number' placeholder='prix de la formation' className='inputNom' value={ModificationFormationCartePrix} onChange={(e)=>{setModificationFormationCartePrix(e.target.value)}}></input>
                            <input   type='submit' className='buttonValidModifForm' value={'Valider modifications'} onClick={()=>{ModifFormationCarteSecond()}}></input>
                        </div>   
                    </div>
                    <div className='pFormationAndLogoMinus'>
                        <p>Equipe</p>
                        {MinusEquipe===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusEquipe===false?setMinusEquipe(true):setMinusEquipe(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusEquipe===false?setMinusEquipe(true):setMinusEquipe(false)}}>-</p></div>}
                    </div>
                    <div className={MinusEquipe===false?'containerFormation2':'containerFormation'}>
                        <div className='pForfaitAndLogoMinusEquipe'>
                                <button  className={EquipesInfo.length==0 && MinusAddMembre==false?'buttonAjouterMembre':'buttonAjouterMembre2'} onClick={()=>{setMinusAddMembre(true)}}>+ Nouveau collaborateur</button>
                        </div>
                        <div className={MinusAddMembre===false?'containerNomDescription':'containerNomDescription2'}>
                            <img src={cross} className='fermerFormFormationModifFiche'onClick={()=>{setMinusAddMembre(false)}}></img>
                            <input  type="file" id="imageFile" accept="image/*"  placeholder='uploadEquipes' className='UploadEquipe'  onChange={(e)=>{uploadEquipesId(e)}} multiple></input>
                            {UploadEquipes==null?<div  className='PhotoEquipe'>Télécharger Photo</div>:<div  className='PhotoEquipe'>Photo téléchargée</div>}
                            <input type='text' placeholder='Nom' className='inputNom' onChange={(e)=>setNameMemberEquipe(e.target.value)}></input>
                            <input type='text' placeholder='Fonction' className='inputNom'onChange={(e)=>setFonctionMemberEquipe(e.target.value)}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={onSubmitEquipes}></input>
                        </div>
                        <div className={ModifyEquipe===false?'containerNomDescription':'containerNomDescription2'}>
                            <img src={cross} className='fermerFormFormationModifFiche'onClick={()=>{setModifyEquipe(false)}}></img>
                            <img src={EquipeUrl} className={UploadEquipes==null?'PhotoEquipeModif':'PhotoEquipeModif2'}></img>
                            <input  type="file" id="imageFile" accept="image/*"  placeholder='uploadEquipes' className='UploadEquipe'  onChange={(e)=>{uploadEquipesId(e)}} multiple></input>
                            {UploadEquipes==null?<div  className='PhotoEquipe'>modifier photo</div>:<div  className='PhotoEquipe'>Photo modifiée</div>}
                            <input type='text' placeholder='Nom' className='inputNom' value={NameMemberEquipe} onChange={(e)=>setNameMemberEquipe(e.target.value)}></input>
                            <input type='text' placeholder='Fonction' className='inputNom' value={FonctionMemberEquipe} onChange={(e)=>setFonctionMemberEquipe(e.target.value)}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={onSubmitModifyEquipes}></input>
                        </div>
                        <div className={EquipesInfo.length!=0 && MinusAddMembre==false && ModifyEquipe==false?'containerEquipeInfo':'containerEquipeInfo2'}>
                            {EquipesInfo.map((equi)=>
                            <div className='containerPhotoIconEquipe'>
                                <div className='cardInfoEquipe'> 
                                {!equi.logoUrl? <img src={picEquipe} className='picEquipeDefault'></img>:<img src={equi.logoUrl} className='picEquipe'></img>}
                                    <p className='NomEquipe'>{equi.Nom}</p>
                                    <p className='FonctionEquipe'>{equi.Fonction}</p>          
                                </div>
                                <div className='liseretEquipeCard'></div>
                                <div className='containerIconEquipe'>
                                        <img src={modif} onClick={()=>{ModifUploadEquipe(equi.pictureName,equi.logoUrl,equi._id,equi.Nom,equi.Fonction)}} className='iconForfaitFiche'></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpGeneral(setCheckPopUpSupOpen,setOpenPopUpDeleteFromEquipe,setIdEquipe,equi._id,setNameEquipe,equi.Nom)}}></img>
                                </div>
                            </div>
                            )}
                        </div>
                        <button  className={EquipesInfo!=0 && MinusAddMembre===false && ModifyEquipe==false?'buttonAjouterMembreBottom':'buttonAjouterMembre2'} onClick={()=>{setMinusAddMembre(true)}}>+ Nouveau collaborateur</button>
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
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{HorairesConduiteModif()}}></input>
                        </div>
                    </div>
                </div>   
            </main>
        </div>
    )
}

export default Fiche