import '../css/Fiche.css'
import Navbar from '../component/Navbar'
import Localisation from '../component/Localisation'
import { useEffect,useState,ChangeEvent,useContext } from 'react'
import {InscriptionContext as getConnectedUser} from '../utilitaires/InscriptionContext'
import axios from 'axios'
import dropArrow from '../images/iconsAwesome/caret-down-solid.svg'
import check from '../images/iconsAwesome/check-solid (1).svg'
import couv from '../images/Rectangle 516.png'
import couvMedecin from '../images/ordinateur-illustration-covid19-ecran-debout-bureau-dans-salle-bureau-vide-pendant-pandemie-mondiale-chambre-hopital-moderne-equipee-instruments-medicaux-professionnels-image-cellule-virale.jpg'
import arrow from '../images/iconsAwesome/arrow-right-solid.svg'
import trash from '../images/iconsAwesome/trash-solid.svg'
import modif from '../images/iconsAwesome/gear-solid (1).svg'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import picEquipe from '../images/CardImage/Rectangle 519.png'
import picVéhicule from '../images/CardImage/véhiculeDefaut.jpg'
import { Link } from 'react-router-dom'






const Fiche=()=>{
    const{choice,connectedUser,Adresse,assignAdresse,AdresseValue,assignAdresseValue,Longitude,assignLongitude,Lattitude,assignLattitude,IdFiche,assignIdFiche}=useContext(getConnectedUser)

    console.log(connectedUser)
    const [uploadCouv, setUploadCouv] = useState(null)
    const [uploadLogo,setUploadLogo]=useState(null)
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
    const [checkFormationTypeClassique,setCheckFormationTypeClassique]=useState(false)
    const [checkFormationTypeAccellérée,setCheckFormationTypeAccellérée]=useState(false)
    const [checkFormationOptionAcc,setcheckFormationOptionAcc]=useState(false)
    const [checkFormationOptionSuper,setcheckFormationOptionSuper]=useState(false)
    const [checkFormationOptionAucune,setcheckFormationOptionAucune]=useState(false)
    const [AddEcole,setAddEcole]=useState(false)
    const [EcoleName,setEcoleName]=useState('')
    const [Create,setCreate]=useState(false)
    const [Fiche,setFiche]=useState([])
    const [modify,setModify]=useState()
    const [User,setUser]=useState([])
    const [DescriptionEcole,setDescriptionEcole]=useState(null)
    const EcoleNameId=`${EcoleName+Math.random()+Date.now()}`

    /*******************Localisation*************************/
    const [Ville,setVille]=useState(String)
    const [Departement,setDepartement]=useState(null)
    const [IsCoordinate,setIsCoordinate]=useState(false)
    const [ModifLocalisation,setModifLocalisation]=useState(false)
    /****************************logique part: premières modifications apparition d'un nouveau boutton
     * validé pour modifier une partie des données de la fiche************************************* */
    const [valider,setValider]=useState(false)
    const [validerHorBur,setValiderHorBur]=useState(false)
    const [ValiderHorairesConduites,setValiderHorairesConduites]=useState(false)
   
    /***************************Toutes les fiches d'un user*******************************************************/
    const [AllOfOne,setAllOfOne]=useState([])

    /***********************Les informations d'une seule fiche************************************** */
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
    const [ecoleNameSup,setEcolenameSup]=useState(String)
    const [CheckPopUpSupOpen,setCheckPopUpSupOpen]=useState(false)
    const [CheckDelete,setCheckDelete]=useState(Boolean)
    const [uniquIdForm,setUniqueIdForm]=useState(Number)
    const [isFormDelete,setIsFormDelete]=useState(false)
    const [FormationNameSup,setFormationNameSup]=useState(null)
    /**************************identifier logo et couv****************************************************/
    const [IdLogo,setIdLogo]=useState(Number)
    const [LogoNew,setLogoNew]=useState([])
    const [couvNew,setCouvNew]=useState([])
    /***************************info upload Equipes***********************************************************/
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
    /***************************info upload véhicule***********************************************************/
    const [VéhiculeInfo,setVéhiculeInfo]=useState([])
    const [UploadVéhicule,setUploadVéhicule]=useState(null)
    const [MinusVéhicule,setMinusVéhicule]=useState(false)
    const [MinusAddVéhicule,setMinusAddVéhicule]=useState(false)
    const [NameMemberVéhicule,setNameMemberVéhicule]=useState(String)
    const [FonctionVéhicule,setFonctionVéhicule]=useState(String)
    const [OpenPopUpDeleteFromvéhicule,setOpenPopUpDeleteFromVéhicule]=useState(false)
    const [NameVéhicule,setNameVéhicule]=useState(String)
    const [IdVéhicule,setIdVéhicule]=useState(String)
    const [VéhiculeUrl,setVéhiculeUrl]=useState(String)
    const [VéhiculePictureName,setVéhiculePictureName]=useState(String)
    const [ModifyVéhicule,setModifyVéhicule]=useState(false)
    const [IdVéhiculeModify,setIdVéhiculeModify]=useState(String)
    /********************inclusivité***********************************/
    const [MinusTEInclusive,setMinusTEInclusive]=useState(false)
    const [MinusTEILangue,setMinusTELangue]=useState(false)
    const [MinusTEIAccompHandi,setMinusTEAccompHandi]=useState(false)
    const [MinusTEICognitif,setMinusTECognitif]=useState(false)
    const [MinusTEIAuditif,setMinusTEAuditif]=useState(false)
    const [MinusTEIAmménage,setMinusTEAmménage]=useState(false)
    const [MinusTEIMoteur,setMinusTEMoteur]=useState(false)
    const [CheckPara,setCheckPara]=useState(false)
    const [CheckTetra,setCheckTetra]=useState(false)
    const [CheckHemi,setCheckHemi]=useState(false)
    const [CheckAmpuSup,setCheckAmpuSup]=useState(false)
    const [CheckAmpuInf,setCheckAmpuInf]=useState(false)
    const [MinusTEISurdité,setMinusTESurdité]=useState(false)
    const [checkSigne,setCheckSigne]=useState(false)
    const [checkLabiale,setCheckLabiale]=useState(false)
    const [checkDefAud,setCheckDefAud]=useState(false)
    const [checkDys,setCheckDys]=useState(false)
    const [checkTDAH,setCheckTDAH]=useState(false)
    const [checkBoule,setCheckBoule]=useState(false)
    const [checkCombiné,setCheckcombiné]=useState(false)
    const [checkCercle,setCheckCercle]=useState(false)
    const [checkPedalier,setCheckPedalier]=useState(false)
    const [checkAnglais,setCheckAnglais]=useState(false)
    const [checkEspagnol,setCheckEspagnol]=useState(false)
    const [checkAllemand,setCheckAllemand]=useState(false)
    const [checkPortugais,setCheckPortugais]=useState(false)
    const [checkItalien,setCheckItalien]=useState(false)
    const [ValiderInclusive,setValiderinclusive]=useState(false)
    const [ModifySecondInclusive,setModifySecondInclusive]=useState(false)
    /*****************Paiement******************************/
    const [MinusTEPaiement,setMinusTEPaiement]=useState(false)
    const [checkBancaire,setCheckBancaire]=useState(false)
    const [checkEspeces,setCheckEspece]=useState(false)
    const [checkCheque,setCheckCheque]=useState(false)
    const [checkCadeau,setCheckCadeau]=useState(false)
    const [ValiderPaiment,setValiderPaiment]=useState(false)
    const [ModifySecondPaiement,setModifySecondPaiment]=useState(false)
    /********************Options****************************** */
    const [MinusOption,setMinusOption]=useState(false)
    const [CheckOptionCours,setCheckOptionCours]=useState(false)
    const [CheckOptionDomicile,setCheckOptionDomicile]=useState(false)
    const [CheckOptionSimulateur,setCheckOptionSimulateur]=useState(false)
    const [CheckOptionDashcam,setCheckOptionDashCam]=useState(false)
    const [ValiderOptions,setValiderOptions]=useState(false)
    const [ModifySecondOptions,setModifySecondOptions]=useState(false)
    /*******************financements****************************/
    const [MinusFinancement,setMinusFinancement]=useState(false)
    const [CheckCPF,setCheckCPF]=useState(false)
    const [CheckPermis1,setCheckpermis1]=useState(false)
    const [CheckPoleEmp,setCheckPoleEmp]=useState(false)
    const [CheckAideApp,setCheckAideApp]=useState(false)
    const [CheckAideLocales,setCheckAideLocales]=useState(false)
    const [ValiderFinancements,setValiderFinancements]=useState(false)
    const [ModifSecondFinancements,setModifsecondFinancements]=useState(false)
    /*************création fiche unique id ecole */
    const [uniqueIdFicheEcoleName,setUniqueIdFicheEcoleName]=useState(String)
    /******************Variable medecin************************** */   
    const [MinusAccessibilité,setMinusAccessibilité]=useState(false)
    const [Accessibilité,SetAccessibilité]=useState(Boolean)
    const [CheckAccessibilitéYes,setCheckAccéssibilitéYes]=useState(false)
    const [CheckAccessibilitéNo,setCheckAccéssibilitéNo]=useState(false)
    const [ValiderAccessibilité,setValiderAccessibilité]=useState(false)
    const [ModifySecondAccessibilité,setModifySecondAccessibilité]=useState(false)

    const [MinusSpe,setMinusSpe]=useState(false)
    const [spe,setSpe]=useState(String)
    const [AddSpe,setAddSpe]=useState(false)
    const [ModifySpe,setModifySpe]=useState(false)
    const [indexSpe,setIndexSpe]=useState(Number)
    const [valueModifySpe,setValueModifySpe]=useState(null)
    const [inDeleteSpe,setInDeleteSpe]=useState(false)

    const [MinusTarifs,setMinusTarifs]=useState(false)
    const [Tarif,setTarif]=useState(null)
    const [TarifPrix,setTarifPrix]=useState(null)
    const [AddTarif,setAddTarif]=useState(false)
    const [ModifyTarif,setModifyTarif]=useState(false)
    const [indexTarif,setIndexTarif]=useState(Number)
    const [valueModifyTarif,setValueModifyTarif]=useState(null)
    const [valueModifyTarifPrix,setValueModifyTarifPrix]=useState(null)
    const [inDeleteTarif,setInDeleteTarif]=useState(false)
    /*************contact variable****************************/
    const [MailContact,setMailContact]=useState(String)
    const [SiteWeb, setSiteWeb]=useState(String)
    const [PhoneNumber,setPhoneNumber]=useState(Number)
    const [validContact,setValidContact]=useState(false)
    const [ModifContactValue,setModifContactValue]=useState(false)
    /**************openPopUp*************** */  
    const OpenPopUp=(ecolePop,ecoleNameSup)=>{
        setEcoleSup(ecolePop)
        setCheckPopUpSupOpen(true)
        setEcolenameSup(ecoleNameSup)
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
        setInDeleteSpe(false)
        setInDeleteTarif(false)
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
        console.log(Adresse)
        console.log(Ville)
    })
    /****************modification formation et delete Hook********************** */
    const [ModifFormation,setModifFormation]=useState(false)
    const [ModificationFormationNom,setModificationFormationNom]=useState(null)
    const [ModificationFormationDescriptif,setModificationFormationDescriptif]=useState(null)
    const [ModificationFormationPrix,setModificationFormationPrix]=useState(null)
    const [ModifFormSup,setModifFormSup]=useState(null)
    /****************modification formation logique fonction*************************** */
    const OpenModifFormation=(Name,Descriptif,Prix,sup,typeClass,typeAcc,optionAccom,optionSuper,optionAucune)=>{
        setModifFormation(true)
        setModificationFormationNom(Name)
        setModificationFormationDescriptif(Descriptif)
        setModificationFormationPrix(Prix)
        setModifFormSup(sup)
        setIsCategorieFormation(false)
        if(OngletFormations==="Auto"||OngletFormations==="Bateau"||OngletFormations==="Moto")
       { 
        setCheckFormationTypeAccellérée(typeAcc)
        setCheckFormationTypeClassique(typeClass)}
        if(OngletFormations==="Auto")
        {setcheckFormationOptionAcc(optionAccom)
        setcheckFormationOptionSuper(optionSuper)
        setcheckFormationOptionAucune(optionAucune)}
    }
    const oneOrTheOther=(setHook,setHook2)=>{
        setHook(true)
        setHook2(false)
    }
    const oneOrTheOtherTwo=(setHook,setHook2,setHook3)=>{
        setHook(true)
        setHook2(false)
        setHook3(false)
    }
    /*************change Horaires logique*************** */
    const ChangeHoraires=(e,setHookHoraires,hookHorairesValider,setHookHorairesvalider)=>{
            setHookHoraires(e.target.value)
            if (hookHorairesValider===true){
                setHookHorairesvalider(false)
            }
            else console.log("hé ben c'est cool")
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
                    console.log("pourquoi tu rentres là-dedans")
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
        console.log('je rentre dans aucune condition')
        if(Hook===false && valider===false){
            setHook(true)
            console.log('je rentre dans la 1er check')
        }
        else if (Hook===false && valider===true){
            setModifTypesEtablissement(true)
            console.log(ModifTypesEtablissement)
            setHook(true)
            console.log('je rentre dans la seconde check')
        }
        else if (Hook===true && valider===true){
            setModifTypesEtablissement(true)
            setHook(false)
            console.log('je rentre dans la 3eme check')
        }
        else if(Hook==true && valider==false){
            setHook(false)
        }
        else{
        setHook(true)
        console.log('je rentre dans la dernière check')
    }
  }

  const ModifSecondCheckBox=(Hook,setHook,HookValide,setHookModify)=>{
    console.log('je rentre dans aucune condition')
    console.log(`${HookValide} je rentre valider`)
    if(Hook===false && HookValide==false){
        setHook(true)
        console.log('je rentre dans la 1er check')
        console.log(`${HookValide} je rentre 1er valider`)
    }
    else if (Hook===false && HookValide===true){
        setHookModify(true)
        setHook(true)
        console.log('je rentre dans la seconde check')
        console.log(`${HookValide} je rentre 2nd valider`)
    }
    else if (Hook===true && HookValide===true){
        setHookModify(true)
        setHook(false)
        console.log('je rentre dans la 3eme check')
        console.log(`${HookValide} je rentre 3eme valider`)
    }
    else if(Hook==true && HookValide==false){
        setHook(false)
        console.log(`${HookValide} je rentre 4eme valider`)
    }
    else{
    setHook(true)
    console.log('je rentre dans la dernière check')
    console.log(`${HookValide} je rentre dernière valider`)
}
}
/*******************Modify second with conditions of one check is true the other is false************************ */
const ModifSecondCheckBoxCondition=(Hook,setHook,HookValide,setHookModify,setHookTrueOrFalse)=>{
    console.log('je rentre dans aucune condition')
   
    if(Hook===false && HookValide==false){
        setHook(true)
        console.log('je rentre dans la 1er check')
        setHookTrueOrFalse(false)
    }
    else if (Hook===false && HookValide===true){
        setHookModify(true)
        setHook(true)
        console.log('je rentre dans la seconde check')
        setHookTrueOrFalse(false)
    }
    else if (Hook===true && HookValide===true){
        setHookModify(true)
        setHook(false)
        console.log('je rentre dans la 3eme check')
    }
    else if(Hook==true && HookValide==false){
        setHook(false)
    }
    else{
    setHook(true)
    setHookTrueOrFalse(false)
    console.log('je rentre dans la dernière check')
}
}




useEffect(()=>{
    console.log(`${checkAuto} auto checkBox`)
    console.log(`${valider} valider checkbox`)
  })
 

  const ModifSecondTypeEtabissementRequest =()=>{
        console.log('what')
        axios
        .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{Bateau:checkBateau,Voiture:checkAuto,Moto:checkMoto})
        .then((response) => {
            console.log(setModify(response.data));
            setModifTypesEtablissement(false)
            console.log("ca marche vraiment?")
          })
        .catch((err) => console.error(err)); 
  }
  const ModifSecondPaiementRequest =()=>{
    console.log('what')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{Cadeau:checkCadeau,Especes:checkEspeces,Bancaire:checkBancaire,Cheque:checkCheque})
    .then((response) => {
        console.log(setModify(response.data));
        setModifySecondPaiment(false)
        console.log("ca marche vraiment?")
      })
    .catch((err) => console.error(err)); 
}
const ModifSecondOptionsRequest =()=>{
    console.log('ha yes options')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{CoursCode:CheckOptionCours,Domicile:CheckOptionDomicile,Simulateur:CheckOptionSimulateur,DashCam:CheckOptionDashcam})
    .then((response) => {
        console.log(setModify(response.data));
        setModifySecondOptions(false)
        console.log("ca marche vraiment Options?")
      })
    .catch((err) => console.error(err)); 
}

const ModifSecondInclusive=()=>{
    console.log('dans le paiement')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{Espagnol:checkEspagnol,Anglais:checkAnglais,Portugais:checkPortugais,Italien:checkItalien,Boule:checkBoule,
    Combine:checkCombiné,Cercle:checkCercle,Para:CheckPara,Tetra:CheckTetra,Hemi:CheckHemi,AmpuMI:CheckAmpuInf,AmpuMS:CheckAmpuSup
    ,Dys:checkDys,TDAH:checkTDAH, SurPartielle:checkLabiale,Surcomplete:checkSigne,Allemand:checkAllemand
})
    .then((response) => {
        console.log(setModify(response.data));
        setModifySecondInclusive(false)
        console.log("dans le paiement et ça marche")
      })
    .catch((err) => console.error(err)); 
}
    /**********************Delete fiche******************** */
    const deleteOneFiche=(valeur,id)=>{
    if(isFormDelete===false && isFormCarteDelete===false && OpenPopUpDeleteFromEquipe==false && OpenPopUpDeleteFromvéhicule==false && inDeleteSpe===false && inDeleteTarif===false)    
   { setCheckPopUpSupOpen(false)
    axios
   .delete(`http://localhost:5000/FicheEcolePrincipale/delete/${valeur}`)
   .then((response)=>{(console.log(response.data))
       getAllOfOne()
   }) 
   .catch(error => {
   console.log(error);
   })  }
   else if(inDeleteSpe){
        setCheckPopUpSupOpen(false)
        console.log('ici')
        axios
        .put(`http://localhost:5000/FicheEcolePrincipale/removeSpe/${valeur}`,{Specialite:{"id":id}})
        .then((response)=>{(console.log(response.data))
        console.log("je ne comprend pas")
            setInDeleteSpe(false)
            //getFicheFormation()
            getFiche()
            
        }) 
        .catch(error => {
        console.log(error);
        })
   }

   else if(inDeleteTarif){
    setCheckPopUpSupOpen(false)
    console.log('ici')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/removeTarif/${valeur}`,{Tarifs:{"id":id}})
    .then((response)=>{(console.log(response.data))
    console.log("je ne comprend pas")
        setInDeleteTarif(false)
        //getFicheFormation()
        getFiche()
        
    }) 
    .catch(error => {
    console.log(error);
    })
}

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
    else if(OpenPopUpDeleteFromvéhicule){
        setCheckPopUpSupOpen(false)
        axios
        .delete(`http://localhost:5000/FicheVehicule/delete/${IdVéhicule}`)
        .then((response)=>{(console.log(response.data))
            console.log("je suis bien ici dans un véhicule")
              setOpenPopUpDeleteFromVéhicule(false)
              //getFicheFormation()
              getVéhicule()
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
   .put(`http://localhost:5000/FicheEcolePrincipale/removeFormation/${Fiche.EcoleNameId}`,{Formation:{"uniqueId":ModifFormSup}})
   .then((response)=>{(console.log(response.data))
    getFiche()
   }) 
   .catch(error => {
   console.log(error);
   })  }
   const deleteOneFormationCarte=()=>{
    axios
   .put(`http://localhost:5000/FicheEcolePrincipale/removeFormationCarte/${Fiche.EcoleNameId}`,{FormationCarte:{"uniqueId":ModifCarteSup}})
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

   
    /***************** get infos d'une fiche en particulier*************************** */
    const getOneFiche=(LinkEcole)=>{
        
        axios
    .get(`http://localhost:5000/FicheEcolePrincipale/creation/${LinkEcole}`)
    .then((res) => {
      console.log(setFiche(res.data))
      getUser()
      if(res.data.Descriptif)
      { setIsdescriptif(true)}
      if(res.data.HorairesBureau.length!=0){
        setLundiMatinOuvre(res.data.HorairesBureau[0].LundiMatinOuvre)
        setLundiMatinferme(res.data.HorairesBureau[0].LundiMatinFerme)
        setLundiApremOuvre(res.data.HorairesBureau[0].LundiApremOuvre)
        setLundiApremferme(res.data.HorairesBureau[0].LundiApremFerme)
        setMardiMatinOuvre(res.data.HorairesBureau[0].MardiMatinOuvre)
        setMardiMatinFerme(res.data.HorairesBureau[0].MardiMatinFerme)
        setMardiApremOuvre(res.data.HorairesBureau[0].MardiApremOuvre)
        setMardiApremFerme(res.data.HorairesBureau[0].MardiApremFerme)
        setMercrediMatinOuvre(res.data.HorairesBureau[0].MercrediMatinOuvre)
        setMercrediMatinFerme(res.data.HorairesBureau[0].MercrediMatinFerme)
        setMercrediApremOuvre(res.data.HorairesBureau[0].MercrediApremOuvre)
        setMercrediApremFerme(res.data.HorairesBureau[0].MercrediApremFerme)
        setJeudiMatinOuvre(res.data.HorairesBureau[0].JeudiMatinOuvre)
        setJeudiMatinFerme(res.data.HorairesBureau[0].JeudiMatinFerme)
        setJeudiApremOuvre(res.data.HorairesBureau[0].JeudiApremOuvre)
        setJeudiApremFerme(res.data.HorairesBureau[0].JeudiApremFerme)
        setVendrediMatinOuvre(res.data.HorairesBureau[0].VendrediMatinOuvre)
        setVendrediMatinFerme(res.data.HorairesBureau[0].VendrediMatinFerme)
        setVendrediApremOuvert(res.data.HorairesBureau[0].VendrediApremOuvre)
        setVendrediApremFerme(res.data.HorairesBureau[0].VendrediApremFerme)
        setSamediMatinOuvre(res.data.HorairesBureau[0].SamediMatinOuvre)
        setSamediMatinFerme(res.data.HorairesBureau[0].SamediMatinFerme)
        setSamediApremOuvert(res.data.HorairesBureau[0].SamediApremOuvre)
        setSamediApremFerme(res.data.HorairesBureau[0].SamediApremFerme)
        setDimancheMatinOuvre(res.data.HorairesBureau[0].DimancheMatinOuvre)
        setDimancheMatinFerme(res.data.HorairesBureau[0].DimancheMatinFerme)
        setDimancheApremOuvert(res.data.HorairesBureau[0].DimancheApremOuvre)
        setDimancheApremFerme(res.data.HorairesBureau[0].DimancheApremFerme)
      }
      if(res.data.HorairesConduite.length!=0){
        setLundiMatinOuvreConduite(res.data.HorairesConduite[0].LundiMatinOuvreConduite)
        setLundiMatinfermeConduite(res.data.HorairesConduite[0].LundiMatinFermeConduite)
        setLundiApremOuvreConduite(res.data.HorairesConduite[0].LundiApremOuvreConduite)
        setLundiApremfermeConduite(res.data.HorairesConduite[0].LundiApremFermeConduite)
        setMardiMatinOuvreConduite(res.data.HorairesConduite[0].MardiMatinOuvreConduite)
        setMardiMatinFermeConduite(res.data.HorairesConduite[0].MardiMatinFermeConduite)
        setMardiApremOuvreConduite(res.data.HorairesConduite[0].MardiApremOuvreConduite)
        setMardiApremFermeConduite(res.data.HorairesConduite[0].MardiApremFermeConduite)
        setMercrediMatinOuvreConduite(res.data.HorairesConduite[0].MercrediMatinOuvreConduite)
        setMercrediMatinFermeConduite(res.data.HorairesConduite[0].MercrediMatinFermeConduite)
        setMercrediApremOuvreConduite(res.data.HorairesConduite[0].MercrediApremOuvreConduite)
        setMercrediApremFermeConduite(res.data.HorairesConduite[0].MercrediApremFermeConduite)
        setJeudiMatinOuvreConduite(res.data.HorairesConduite[0].JeudiMatinOuvreConduite)
        setJeudiMatinFermeConduite(res.data.HorairesConduite[0].JeudiMatinFermeConduite)
        setJeudiApremOuvreConduite(res.data.HorairesConduite[0].JeudiApremOuvreConduite)
        setJeudiApremFermeConduite(res.data.HorairesConduite[0].JeudiApremFermeConduite)
        setVendrediMatinOuvreConduite(res.data.HorairesConduite[0].VendrediMatinOuvreConduite)
        setVendrediMatinFermeConduite(res.data.HorairesConduite[0].VendrediMatinFermeConduite)
        setVendrediApremOuvertConduite(res.data.HorairesConduite[0].VendrediApremOuvreConduite)
        setVendrediApremFermeConduite(res.data.HorairesConduite[0].VendrediApremFermeConduite)
        setSamediMatinOuvreConduite(res.data.HorairesConduite[0].SamediMatinOuvreConduite)
        setSamediMatinFermeConduite(res.data.HorairesConduite[0].SamediMatinFermeConduite)
        setSamediApremOuvertConduite(res.data.HorairesConduite[0].SamediApremOuvreConduite)
        setSamediApremFermeConduite(res.data.HorairesConduite[0].SamediApremFermeConduite)
        setDimancheMatinOuvreConduite(res.data.HorairesConduite[0].DimancheMatinOuvreConduite)
        setDimancheMatinFermeConduite(res.data.HorairesConduite[0].DimancheMatinFermeConduite)
        setDimancheApremOuvertConduite(res.data.HorairesConduite[0].DimancheApremFermeConduite)
        setDimancheApremFermeConduite(res.data.HorairesConduite[0].DimancheApremFermeConduite)
      }
      if(res.data.Formation.length!=0){
        setIsCategorieFormation(true)
      }
      if(res.data.FormationCarte.length!=0){
        setIsCategorieCarte(true)
      }
      setUniqueIdFicheEcoleName(res.data.EcoleNameId)
      setCheckAuto(res.data.Voiture)
      setCheckbateau(res.data.Bateau)
      setCheckMoto(res.data.Moto)
      setTest(true)
      setCheckBancaire(res.data.Bancaire)
      setCheckCadeau(res.data.Cadeau)
      setCheckCheque(res.data.Cheque)
      setCheckEspece(res.data.Especes)
      setCheckAllemand(res.data.Allemand)
      setCheckAnglais(res.data.Anglais)
      setCheckEspagnol(res.data.Espagnol)
      setCheckPortugais(res.data.Portugais)
      setCheckItalien(res.data.Italien)
      setCheckPara(res.data.Para)
      setCheckTetra(res.data.Tetra)
      setCheckHemi(res.data.Hemi)
      setCheckAmpuSup(res.data.AmpuMS)
      setCheckAmpuInf(res.data.AmpuMI)
      setCheckDys(res.data.Dys)
      setCheckTDAH(res.data.TDAH)
      setCheckSigne(res.data.Surcomplete)
      setCheckLabiale(res.data.SurPartielle)
      setCheckBoule(res.data.Boule)
      setCheckCercle(res.data.Cercle)
      setCheckcombiné(res.data.Combine)
      setCheckOptionCours(res.data.CoursCode)
      setCheckOptionDashCam(res.data.DashCam)
      setCheckOptionDomicile(res.data.Domicile)
      setCheckOptionSimulateur(res.data.Simulateur)
      assignLattitude(res.data.Lattitude)
      assignLongitude(res.data.Longitude)
      setDepartement(res.data.CodePos)
      assignAdresseValue(res.data.Adresse)
      setVille(res.data.Ville)
      if(res.data.Longitude){
        setIsCoordinate(true)
      }
      setCheckAccéssibilitéYes(res.data.AccessibiliteTrue)
      setCheckAccéssibilitéNo(res.data.AccessibiliteFalse)
      setMailContact(res.data.MailContact)
      setPhoneNumber(res.data.PhoneNumber)
      setSiteWeb(res.data.SiteWeb)
      if (res.data.MailContact.length !=0  || res.data.PhoneNumber !=0 && res.data.PhoneNumber!= null|| res.data.SiteWeb.length !=0 ){
        setValidContact(true)}

      setCheckAideApp(res.data.AidesApp)
      setCheckAideLocales(res.data. AidesLocales)
      setCheckCPF(res.data.CPF)
      setCheckPoleEmp(res.data.PoleEmploi)
      setCheckpermis1(res.data.PermisJour)
      ;
    })
    .catch((err) => console.error(err));
        
        axios
    .get(`http://localhost:5000/FicheCouverture/${LinkEcole}`)
    .then((res) => {
      console.log(setCouvNew(res.data))
      console.log('ca fonctionne dans getOnefiche?')
      ;
    })
    .catch((err) => console.error(err));

        axios
    .get(`http://localhost:5000/FicheLogo/${LinkEcole}`)
    .then((res) => {
      console.log(setLogoNew(res.data))
      console.log('ca fonctionne?')
      
      ;
    })
    .catch((err) => console.error(err));
    axios
        .get(`http://localhost:5000/FicheEquipes/${LinkEcole}`)
        .then((res) => {
          setEquipesInfo(res.data) 
          console.log(EquipesInfo)
          ;
        })
        .catch((err) => console.error(err));

     axios
        .get(`http://localhost:5000/FicheVehicule/${LinkEcole}`)
        .then((res) => {
          setVéhiculeInfo(res.data) 
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
    const getUser=()=>{
        axios
        .get(`http://localhost:5000/Users/${connectedUser}`)
        .then((res)=>{
            setUser(res.data)          
        })
        .catch((err) => console.error(err));
    }
    const getFicheFirst=()=>{
        axios
        .get(`http://localhost:5000/FicheEcolePrincipale/creation/${EcoleNameId}`)
        .then((res) => {
          setFiche(res.data)
          getUser()
          setUniqueIdFicheEcoleName(res.data.EcoleNameId)
          assignIdFiche(res.data.EcoleNameId)
          console.log(Fiche)
          //isOngletFormationsameAsFicheCategorie(OngletFormations)
          ;
        })
        .catch((err) => console.error(err));
    }
    const getFiche=()=>{
        axios
    .get(`http://localhost:5000/FicheEcolePrincipale/creation/${uniqueIdFicheEcoleName}`)
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
        .get(`http://localhost:5000/FicheEquipes/${Fiche.EcoleNameId}`)
        .then((res) => {
          setEquipesInfo(res.data) 
          console.log(EquipesInfo)
          ;
        })
        .catch((err) => console.error(err));
    }

    const getVéhicule=()=>{
        axios
        .get(`http://localhost:5000/FicheVehicule/${Fiche.EcoleNameId}`)
        .then((res) => {
          setVéhiculeInfo(res.data) 
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
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{Descriptif:DescriptionEcole})
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
    .put(`http://localhost:5000/FicheEcolePrincipale/addHorairesConduite/${Fiche.EcoleNameId}`,{HorairesConduite:{LundiMatinOuvreConduite,LundiMatinFermeConduite,LundiApremOuvreConduite,
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
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{Bateau:checkBateau,Voiture:checkAuto,Moto:checkMoto})
    .then((response) => {
        console.log(setModify(response.data));
        setValider(true)
        console.log("ca marche vraiment?")
      })
    .catch((err) => console.error(err)); 
}
const PaiementModif=()=>{
    console.log('dans le paiement')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{Cadeau:checkCadeau,Especes:checkEspeces,Bancaire:checkBancaire,Cheque:checkCheque})
    .then((response) => {
        console.log(setModify(response.data));
        setValiderPaiment(true)
        console.log("dans le paiement et ça marche")
      })
    .catch((err) => console.error(err)); 
}

const financementsModif=()=>{
    console.log('dans le paiement')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{PoleEmploi:CheckPoleEmp, CPF:CheckCPF,PermisJour:CheckPermis1,AidesApp:CheckAideApp, AidesLocales:CheckAideLocales})
    .then((response) => {
        console.log(setModify(response.data));
        setValiderFinancements(true)
        console.log("dans le Financement et ça marche")
      })
    .catch((err) => console.error(err)); 
}

const financementsSecondModif=()=>{
    console.log('dans le paiement')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{PoleEmploi:CheckPoleEmp, CPF:CheckCPF,PermisJour:CheckPermis1,AidesApp:CheckAideApp, AidesLocales:CheckAideLocales})
    .then((response) => {
        console.log(setModify(response.data));
        setModifsecondFinancements(false)
        console.log("dans le Financement et ça marche")
      })
    .catch((err) => console.error(err)); 
}

const OptionsModif=()=>{console.log('dans le paiement')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{CoursCode:CheckOptionCours,Domicile:CheckOptionDomicile,Simulateur:CheckOptionSimulateur,DashCam:CheckOptionDashcam})
    .then((response) => {
        console.log(setModify(response.data));
        setValiderOptions(true)
        console.log("dans les options et ça marche")
      })
    .catch((err) => console.error(err));}



const InclusiveModif=()=>{
    console.log('dans le paiement')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{Espagnol:checkEspagnol,Anglais:checkAnglais,Portugais:checkPortugais,Italien:checkItalien,Boule:checkBoule,
    Combine:checkCombiné,Cercle:checkCercle,Para:CheckPara,Tetra:CheckTetra,Hemi:CheckHemi,AmpuMI:CheckAmpuInf,AmpuMS:CheckAmpuSup
    ,Dys:checkDys,TDAH:checkTDAH, SurPartielle:checkLabiale,Surcomplete:checkSigne,Allemand:checkAllemand
})
    .then((response) => {
        console.log(setModify(response.data));
        setValiderinclusive(true)
        console.log("dans le paiement et ça marche")
      })
    .catch((err) => console.error(err)); 
}



const HorairesBureauModif=()=>{
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addHorairesBureau/${Fiche.EcoleNameId}`,{HorairesBureau:{LundiMatinOuvre,LundiMatinFerme,LundiApremOuvre,LundiApremFerme,
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
    const uniqueId= Date.now()+Math.random()
    let NouvelleForm={
        Nom:FormationName,
        Descriptif:FormationDescriptif,
        prix:FormationPrix,
        categorie:OngletFormations,
        uniqueId:uniqueId,
        typeClass:checkFormationTypeClassique,
        typeAcc:checkFormationTypeAccellérée,
        optionSuper:checkFormationOptionSuper,
        optionAccom:checkFormationOptionAcc,
        optionAucune:checkFormationOptionAucune
     }
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addFormation/${Fiche.EcoleNameId}`,{Formation:NouvelleForm})
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
    const uniqueId= Date.now()+Math.random()
    let NouvelleForm={
        Nom:ModificationFormationNom,
        Descriptif:ModificationFormationDescriptif,
        prix:ModificationFormationPrix,
        categorie:OngletFormations,
        uniqueId:uniqueId,
        typeClass:checkFormationTypeClassique,
        typeAcc:checkFormationTypeAccellérée,
        optionSuper:checkFormationOptionSuper,
        optionAccom:checkFormationOptionAcc,
        optionAucune:checkFormationOptionAucune
     }
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addFormation/${Fiche.EcoleNameId}`,{Formation:NouvelleForm})
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
    const uniqueId= Date.now()+Math.random()
    let NouvelleForm={
        Nom:FormationCarteName,
        Descriptif:FormationCarteDescriptif,
        prix:FormationCartePrix,
        categorie:OngletFormations,
        uniqueId:uniqueId
     }
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addFormationCarte/${Fiche.EcoleNameId}`,{FormationCarte:NouvelleForm})
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
    const uniqueId=  Date.now()+Math.random()
    let NouvelleForm={
        Nom:ModificationFormationCarteNom,
        Descriptif:ModificationFormationCarteDescriptif,
        prix:ModificationFormationCartePrix,
        categorie:OngletFormations,
        uniqueId:uniqueId
     }
     axios
    .put(`http://localhost:5000/FicheEcolePrincipale/addFormationCarte/${Fiche.EcoleNameId}`,{FormationCarte:NouvelleForm})
    .then((response) => {
        console.log(setModify(response.data));
        setModifFormationCarte(false)
        setIsCategorieCarte(true)
        deleteOneFormationCarte()
        console.log("ca marche vraiment? carte modification")
      })
    .catch((err) => console.error(err)); 
}
const ContactModif=()=>{console.log('dans le contact')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{MailContact:MailContact,SiteWeb:SiteWeb,PhoneNumber:PhoneNumber})
    .then((response) => {
        console.log(setModify(response.data));
        console.log("dans les options et ça marche")
        if(MailContact.length === 0 && SiteWeb.length === 0 && PhoneNumber === null){
            setValidContact(false)
            setModifContactValue(false)
        }
        else
        {setValidContact(true)
         setModifContactValue(false)   
        }
        getFiche()
      })
    .catch((err) => console.error(err));}
 const LogicModiContact=()=>{
    setValidContact(false)
    setModifContactValue(true)
 }
 const closeFormContact=()=>{
    setValidContact(true)
    setModifContactValue(false)
 }
/*****************createfiche************************************/
    async function createFiche() {
     
     axios
     .post("http://localhost:5000/FicheEcolePrincipale/test",{EcoleNameId:EcoleNameId,EcoleName:EcoleName,UserPseudo:connectedUser,MailContact:MailContact,PhoneNumber:PhoneNumber
        ,SiteWeb:SiteWeb 
    })
     .then((response)=>{(console.log(response.data))
        getFicheFirst()
        assignLattitude(null)
        assignLongitude(null)
     }) 
     .catch(error => {
     console.log(error);
     })
     setCreate(true)   
    }

/***********************************upload part ************************************************ */
async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('name','josephine')
    data.append('file',uploadCouv)
    data.append('UserPseudo',connectedUser)
    data.append('EcoleNameId',Fiche.EcoleNameId)
    data.append("idCouv",IdLogo)
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    }
    if(couvNew._id && uploadCouv!=null) 
   {
        axios.delete(`http://localhost:5000/FicheCouverture/delete/${couvNew._id}`)
        .then((response)=>{console.log(response.data)})
        .catch((err)=>{console.log(err)})
        
        axios.post("http://localhost:5000/FicheCouverture",data,config)
        .then((response)=>{(console.log(response.data))
            getCouverturewithId()
        }) 
        .catch(error => {
        console.log(error);
        });
   }
   else{
    axios.post("http://localhost:5000/FicheCouverture",data,config)
        .then((response)=>{(console.log(response.data))
            getCouverturewithId()
        }) 
        .catch(error => {
        console.log(error);
        });
   }
    const dataLogo= new FormData
    dataLogo.append("name","martine")
    dataLogo.append('file',uploadLogo)
    dataLogo.append('UserPseudo',connectedUser)
    dataLogo.append('EcoleNameId',Fiche.EcoleNameId)
    dataLogo.append("idLogo",IdLogo)
   if(LogoNew._id && uploadLogo!=null) 
    {
        axios.delete(`http://localhost:5000/FicheLogo/delete/${LogoNew._id}`)
        .then((response)=>{console.log(response.data)})
        .catch((err)=>{console.log(err)})

        axios.post("http://localhost:5000/FicheLogo",dataLogo,config)
        .then((response)=>{(console.log(response.data))
            getLogowithId()
        }) 
        .catch(error => {
        console.log(error);
        });
    }
    else{
        axios.post("http://localhost:5000/FicheLogo",dataLogo,config)
        .then((response)=>{(console.log(response.data))
            getLogowithId()
        }) 
        .catch(error => {
        console.log(error);
        });
    }
    
}

async function onSubmitEquipes(e) {
    e.preventDefault();
    const dataEquipes= new FormData
    dataEquipes.append("name","martine")
    dataEquipes.append('file',UploadEquipes)
    dataEquipes.append('UserPseudo',connectedUser)
    dataEquipes.append('EcoleNameId',Fiche.EcoleNameId)
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
async function onSubmitVéhicule(e) {
    e.preventDefault();
    const dataVéhicule= new FormData
    dataVéhicule.append("name","martine")
    dataVéhicule.append('file',UploadVéhicule)
    dataVéhicule.append('UserPseudo',connectedUser)
    dataVéhicule.append('EcoleNameId',Fiche.EcoleNameId)
    dataVéhicule.append("idVéhicule",IdLogo)
    dataVéhicule.append("Fonction",FonctionVéhicule)
    dataVéhicule.append("Nom",NameVéhicule)
    dataVéhicule.append("logoUrl",VéhiculeUrl)
    dataVéhicule.append("pictureName",VéhiculePictureName)
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    }
    
    axios.post("http://localhost:5000/FicheVehicule",dataVéhicule,config)
    .then((response)=>{(console.log(response.data))
     getVéhicule()
     setMinusAddVéhicule(false)
     setUploadVéhicule(null)
    }) 
    .catch(error => {
    console.log(error);
    });
    
}
async function onSubmitModifyVéhicule(e) {
    e.preventDefault();
    const dataVéhicule= new FormData
    dataVéhicule.append("name","martine")
    dataVéhicule.append('file',UploadVéhicule)
    dataVéhicule.append('UserPseudo',connectedUser)
    dataVéhicule.append('EcoleNameId',Fiche.EcoleNameId)
    dataVéhicule.append("idVéhicule",IdLogo)
    dataVéhicule.append("Fonction",FonctionVéhicule)
    dataVéhicule.append("Nom",NameVéhicule)
    dataVéhicule.append("logoUrl",VéhiculeUrl)
    dataVéhicule.append("pictureName",VéhiculePictureName)
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    }
    
    axios.post("http://localhost:5000/FicheVehicule",dataVéhicule,config)
    .then((response)=>{(console.log(response.data))
    }) 
    .catch(error => {
    console.log(error);
    });
    axios
    .delete(`http://localhost:5000/FicheVehicule/delete/${IdVéhiculeModify}`)
    .then((response)=>{(console.log(response.data))     
        getVéhicule()
        setModifyVéhicule(false)
        setUploadVéhicule(null)
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
    dataEquipes.append('EcoleNameId',Fiche.EcoleNameId)
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
const uploadVehiculeId=(e)=>{
    setUploadVéhicule(e.target.files[0])
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
const ModifUploadVéhicule=(pictureName,url,id,name,fonction)=>{
    setVéhiculePictureName(pictureName)
    setVéhiculeUrl(url)
    setModifyVéhicule(true)
    setIdVéhiculeModify(id)
    setNameVéhicule(name)
    setFonctionVéhicule(fonction)
}
/***********************************récupère les coordonnées pour afficher la map et les envois à la bdd************************************************************/

var url="https://nominatim.openstreetmap.org/search?format=json&limit=3&q="+Adresse
const localModifFiche=(response)=>{
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${IdFiche}`,{Ville:Ville,Adresse:AdresseValue,CodePos:Departement,Longitude:response.data[0].lon,Lattitude:response.data[0].lat})
    .then((res) => {
        console.log(setModify(res.data));
        console.log("dans la localisation ça le fait")
        console.log(response.data[0].lat)
        console.log(response.data[0].lon)
      })
    .catch((err) => console.error(err))
  } 
  const getCoordinate=()=>
  {
    axios
  .get(url)
  .then((response)=>(assignLattitude(parseFloat(response.data[0].lat)),assignLongitude(parseFloat(response.data[0].lon),console.log(response.data)),
    localModifFiche(response),
    assignAdresse(String),
    setVille(String),
    setIsCoordinate(true),
    setModifLocalisation(false)
  )
  )
  .catch((err)=>(console.log(err)));}
  useEffect(()=>{
    assignAdresse(`${AdresseValue} ${Ville}`)
  })


/********************************fiche médecin************************************************************************** */
const closeFormSpe=()=>{
    setAddSpe(false)
    setModifySpe(false)
    setValueModifySpe(null)
}
const closeFormTarif=()=>{
    setAddTarif(false)
    setModifyTarif(false)
    setValueModifyTarif(null)
    setValueModifyTarifPrix(null)
}
const OpenModiFySpe=(Index,value)=>{
    setModifySpe(true)
    setIndexSpe(Index)
    setValueModifySpe(value)
}
const OpenModifyGeneral=(setIndex,Index,setValue1,Value1,setValue2,Value2,setBool)=>{
    setBool(true)
    setIndex(Index)
    setValue1(Value1)
    setValue2(Value2)
}
const AccessibiliteModif=()=>{console.log('dans accessibilité')
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{AccessibiliteTrue:CheckAccessibilitéYes,AccessibiliteFalse:CheckAccessibilitéNo})
    .then((response) => {
        console.log(setModify(response.data));
        setValiderAccessibilité(true)
        console.log("dans les options et ça marche")
      })
    .catch((err) => console.error(err));}



const ModifSecondAcce=()=>{
        console.log('dans le accessibilité')
        axios
        .put(`http://localhost:5000/FicheEcolePrincipale/${Fiche.EcoleNameId}`,{AccessibiliteTrue:CheckAccessibilitéYes,AccessibiliteFalse:CheckAccessibilitéNo
    })
        .then((response) => {
            console.log(setModify(response.data));
            setModifySecondAccessibilité(false)
            console.log("dans le paiement et ça marche")
          })
        .catch((err) => console.error(err)); 
    }

const speModif=()=>{
         axios
        .put(`http://localhost:5000/FicheEcolePrincipale/addSpe/${Fiche.EcoleNameId}`,{Specialite:{value:spe,id:Math.random()+Date.now()}})
        .then((response) => {
            console.log(setModify(response.data));
            setAddSpe(false)
            getFiche()
            console.log("ca marche vraiment? spe")
          })
        .catch((err) => console.error(err)); 
    }    

const speModifIndex=()=>{
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/UpdateSpe/${Fiche.EcoleNameId}`,{Specialite:{value:valueModifySpe,id:Math.random()+Date.now()},Index:indexSpe})
    .then((response) => {
        console.log(setModify(response.data));
        setAddSpe(false)
        setModifySpe(false)
        setValueModifySpe(null)
        setSpe(null)
        getFiche()
        console.log("ca marche vraiment? spe")
      })
    .catch((err) => console.error(err)); 
}

const TarifModif=()=>{
    axios
   .put(`http://localhost:5000/FicheEcolePrincipale/addTarif/${Fiche.EcoleNameId}`,{Tarifs:{Consultation:Tarif,Prix:TarifPrix,id:Math.random()+Date.now()}})
   .then((response) => {
       console.log(setModify(response.data));
       setAddTarif(false)
       getFiche()
       console.log("ca marche vraiment? spe")
     })
   .catch((err) => console.error(err)); 
}
const tarifModifIndex=()=>{
    axios
    .put(`http://localhost:5000/FicheEcolePrincipale/UpdateTarif/${Fiche.EcoleNameId}`,{Tarifs:{Consultation:valueModifyTarif,Prix:valueModifyTarifPrix,id:Math.random()+Date.now()},Index:indexTarif})
    .then((response) => {
        console.log(setModify(response.data));
        setAddTarif(false)
        setModifyTarif(false)
        setValueModifyTarif(null)
        setValueModifyTarifPrix(null)
        setTarif(null)
        setTarifPrix(null)
        getFiche()
        console.log("ca marche vraiment? spe")
      })
    .catch((err) => console.error(err)); 
}
/**********************************************************************************************************************************/
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
    console.log(`${isCategorieFormation} voilà le pb`)
})
useEffect
(()=>{console.log(`${Longitude} LA LONGITUDE BB`)
console.log(`${Lattitude} LA LATTITUDE BB`)
console.log(`${IdFiche}  L'ID FICHE BB`)
console.log(`${MailContact} le mailcontact`)
console.log(`${PhoneNumber} le phoneNumber`)
console.log(`${SiteWeb} le siteWeb`)
console.log(`${MinusContact} ici c'est le minus contact`)
console.log(`${validContact} ici c'est le validcontact`)
console.log(`${ModifContactValue} ici c'est le modifContactvalue`)
})

    return(
        <div className={Create===true || test===true ?'fiche':'fiche2'}>
            <Navbar/>
            <div className={CheckPopUpSupOpen===true?'containerPopupSupprimerFiche':'containerPopupSupprimerFiche2'}>
                <div  id='containerFormationPosition' className='containerDeplacementPopUp'>
                    <p>Êtes-vous sûr de vouloir supprimer</p>
                    {isFormDelete===false && isFormCarteDelete===false?<p className='pValuePopUp'>{ecoleNameSup}</p>:<p className='pValuePopUp'>{FormationNameSup}</p>}
                    <div className='containerButtonPopUpSup'>
                        <button className='ButtonPopUpSupOui' onClick={()=>{deleteOneFiche(EcoleSup,uniquIdForm)}}>oui</button>
                        <button className='ButtonPopUpSupNon' onClick={()=>{closePopupWithoutDeleting()}}>non</button>
                    </div>
                </div>
            </div>
            <main className={CheckPopUpSupOpen===true?'mainFiche2':'mainFiche'}>
                <div className={Create===true || test===true?'containerTitreLien2':'containerTitreLien'}>
                    <div className='containerTitreArrow'>
                        <h1 className='titreFiche'>Mes fiches</h1>
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
                                    <img src={modif} className='iconLien'onClick={()=>{getOneFiche(event.EcoleNameId)}}></img>
                                    <img src={trash} className='iconLien' onClick={()=>{OpenPopUp(event.EcoleNameId,event.EcoleName)}}></img>
                                </div>
                            </div>
                            <div className='liseretLien'></div>
                        </div> ):console.log('ok') }
                    {choice==='voiture'?<button className={AddEcole===false?'buttonAddEcole':'buttonAddEcole2'} onClick={()=>{setAddEcole(true)}}>Ajouter un établissement de conduite</button>:<button className={AddEcole===false?'buttonAddEcole':'buttonAddEcole2'} onClick={()=>{setAddEcole(true)}}>Ajouter un établissement de santé</button> }
                    <div className={AddEcole===true&&Create===false?'containerNomEtaButtonValider':'containerNomEtaButtonValider2'}>
                        <input type='text' placeholder="Nom de l'établissement" className='inputNom' onChange={(e)=>{setEcoleName(e.target.value)}}></input>
                        <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={createFiche}></input>
                    </div>
                </div>
                {Fiche.length!=0?<div className={Create===true ||test===true?'containerInformations':'containerInformations2'}>
                    <h1 className='titreFiche'>{Fiche.EcoleName}</h1>
                    <p className='pInformations'>Informations</p> 
                    <div className='containerCouvUpload'>
                    {couvNew.length!=0?<img src={couvNew.CouvertureUrl} className='imgCouverture'></img>:choice==='voiture'? <img src={couv} className='imgCouverture'></img>:<img src={couvMedecin} className='imgCouverture'></img>}
                        <input  type="file" id="imageFile" accept="image/*" placeholder='uploadCouv'  className='uploadHidden'onChange={(e)=>{uploadCouvId(e)}} multiple></input>
                        <div className='uploadFront'>Modifier Couverture</div>
                        <input  type="file" id="imageFile" accept="image/*" className='uploadLogoHidden' onChange={(e)=>{uploadLogoId(e)}}></input>
                        <div className='uploadfrontLogo'>Modifier Logo</div>
                        {LogoNew.length!=0?<img src={LogoNew.logoUrl}  className='uploadLogo'></img>:<div className='uploadLogo'>
                            <p className='pR'>{User.Initiales}</p>
        
                        </div>}
                    </div>
                    <input   type='submit' className='buttonUploadImg' onClick={onSubmit} value={'Valider logo et couverture'}></input> 
                    <div className={choice==='voiture'?'displayBlockChoice':'displayNoneblockChoice'}>
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
                    <form className={isDescriptifModif===false?'containerNomDescription':'containerFormFormation'} id='resetDescriptif'>
                        <img src={cross} className='fermerFormFormationModifFiche' onClick={()=>{closeFormulaireDescriptifOpenApperçusDescriptif()}}></img>
                        <textarea type='text' placeholder='Descriptif' className='inputDescriptif'value={DescriptionEcole} rows="10" cols="30"  id='resetDescriptif' onChange={(e)=>{setDescriptionEcole(e.target.value)}}></textarea>
                        <input   type='reset' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{DescriptifModif()}}></input>
                    </form>

                    <div className={choice==='médecin'?'displayBlockChoice':'displayNoneblockChoice'}>
                        <div className='pTEAndLogoMinusPaiement'>
                                    <p>Spécialités</p>
                                    {MinusSpe===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusSpe===false?setMinusSpe(true):setMinusSpe(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusSpe===false?setMinusSpe(true):setMinusSpe(false)}}>-</p></div>}
                        </div>
                        <div className='pForfaitAndLogoMinusEquipe'>
                                <button  className={Fiche.Specialite.length==0 && MinusSpe==true && AddSpe==false?'buttonAjouterMembre':'buttonAjouterMembre2'} onClick={()=>{setAddSpe(true)}}>+ Ajouter spécialité</button>
                        </div>
                        <form className={  AddSpe===true || ModifySpe===true?'containerNomDescription2':'containerNomDescription'} id='resetDescriptif'>
                            <img src={cross} className='fermerFormFormationModifFiche' onClick={()=>{closeFormSpe()}}></img>
                            <input type='text' placeholder='Spécialité' className='inputNom' id='resetDescriptif' value={valueModifySpe!=null?valueModifySpe:null} onChange={(e)=>{ModifySpe===true?setValueModifySpe(e.target.value):setSpe(e.target.value)}}></input>
                            <input   type='reset' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{ModifySpe===true?speModifIndex():speModif()}}></input>
                        </form>
                    </div>
                    <div className={Fiche.Specialite!=0 && MinusSpe===true && AddSpe===false && ModifySpe===false?'containerpSpeFicheMédecin':'containerpSpeFicheMédecinNone'}>
                        {Fiche.Specialite!=0 && MinusSpe===true? Fiche.Specialite.map((event)=>
                            <div className='SpeContainer'>
                                <p className='pSpécialitéFicheModif'>{event.value}</p>
                                <div className='containerIconSpe'>
                                    <img src={modif} className='iconForfaitFiche' onClick={()=>{OpenModiFySpe(Fiche.Specialite.indexOf(event),event.value)}}></img>
                                    <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpGeneral(setCheckPopUpSupOpen,setInDeleteSpe,setUniqueIdForm,event.id,setFormationNameSup," cette spécialité")}}></img>
                                </div>
                            </div> 
                            ):console.log("pas de spe")}
                    </div>
                    <div className='pForfaitAndLogoMinusEquipe'>
                                <button  className={Fiche.Specialite.length!=0 && MinusSpe==true && AddSpe==false && ModifySpe===false?'buttonAjouterMembre':'buttonAjouterMembre2'} onClick={()=>{setAddSpe(true)}}>+ Ajouter spécialité</button>
                    </div>

                    <div className='pLocalAndLogoMinus'>
                        <p>Localisation</p>
                        {MinusLocal===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusLocal===false?setMinusLocal(true):setMinusLocal(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusLocal===false?setMinusLocal(true):setMinusLocal(false)}}>-</p></div>}
                    </div>
                    <div className={MinusLocal===false || IsCoordinate===true && ModifLocalisation===false ?'containerLocalisation':'containerNomDescription2'}>
                        <div className={ModifLocalisation===true?'containerModifFormationPAndCross':'containerModifFormationPAndCross2'}>
                            <p>Modifier Localisation</p>
                            <img src={cross} className='fermerFormFormationModifFiche2'onClick={()=>{setModifLocalisation(false)}}></img>
                        </div> 
                        <input type='text' placeholder='Adresse' className='inputNom' value={AdresseValue} onChange={(e)=>{assignAdresseValue(e.target.value )}}></input>
                        <input type='number' className='inputNom' placeholder='département' value={Departement} onChange={(e)=>{setDepartement(e.target.value)}}></input>
                        <input type='text' placeholder='Ville' className='inputNom' value={Ville} onChange={(e)=>{setVille(e.target.value)}}></input>
                        <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{getCoordinate()}}></input>
                    </div>
                   {IsCoordinate===true && MinusLocal===true && ModifLocalisation===false? <Localisation></Localisation>:console.log("nop")}
                   <input   type='submit' className={IsCoordinate===false || ModifLocalisation===true || MinusLocal===false?'buttonValidBoxcaseModif2':'buttonValidBoxcaseModifOk'}  value='Modifier Localisation' onClick={()=>{setModifLocalisation(true)}} ></input>
                    
                    <div className='pContactAndLogoMinus'>
                        <p>Contact</p>
                        {MinusContact===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusContact===false?setMinusContact(true):setMinusContact(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusContact===false?setMinusContact(true):setMinusContact(false)}}>-</p></div>}
                    </div>
                    <div className={MinusContact===false || validContact===true?'containerLocalisation':'containerNomDescription2'}>
                        <img src={cross} className={ModifContactValue===true?'fermerFormFormationModifFiche':'fermerFormFormationModifFicheNone'} onClick={()=>{closeFormContact()}}></img>
                        <input type='text' placeholder='Adresse mail' className='inputNom' id='resetDescriptif' value={ModifContactValue===true?MailContact:null} onChange={(e)=>{setMailContact(e.target.value)}}></input>
                        <input type='number' className='inputNom' placeholder='Téléphone' id='resetDescriptif' value={ModifContactValue===true?PhoneNumber:null}   onChange={(e)=>{setPhoneNumber(e.target.value)}}></input>
                        <input type='text' placeholder='site internet' className='inputNom' id='resetDescriptif'  value={ModifContactValue===true?SiteWeb:null} onChange={(e)=>{setSiteWeb(e.target.value)}}></input>
                        <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{ContactModif()}}></input>
                    </div>
                    <div className={ModifContactValue===true || MinusContact === false?'containerpSpeFicheMédecinNone':validContact===false && MinusContact===true?'containerpSpeFicheMédecinNone': MailContact.length !=0 || (PhoneNumber!= 0 && PhoneNumber!= null) || SiteWeb.length!=0 ?'containerpSpeFicheMédecin':'containerpSpeFicheMédecinNone'}>
                        <div className="contactIconValueContainer">
                            <p className={ MailContact.length !=0?'pSpécialitéFicheModif':'pSpécialitéFicheModifNone'}>{MailContact}</p>
                            <p className={PhoneNumber!= 0 && PhoneNumber!= null?'pSpécialitéFicheModif':'pSpécialitéFicheModifNone'}>{PhoneNumber}</p>
                            <p className={SiteWeb.length!=0?'pSpécialitéFicheModif':'pSpécialitéFicheModifNone'}>{SiteWeb}</p>
                        </div>
                        <img src={modif} className='iconForfaitFiche' onClick={()=>{LogicModiContact()}}></img>
                    </div> 

                    <div className='pContactAndLogoMinus'>
                        <p>Horaires</p>
                        {MinusHoraires===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusHoraires===false?setMinusHoraires(true):setMinusHoraires(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusHoraires===false?setMinusHoraires(true):setMinusHoraires(false)}}>-</p></div>}
                    </div>
                    <div className={MinusHoraires===false?'containerLocalisation':'containerLocalisation2'}>
                        <div className={choice=='voiture'?'containerOngletBureauConduite':'containerOngletBureauConduiteNone'}>
                            <div className='containerLiseretOnglet'>
                                <p className={OngletHoraires==='bureau'?'bureauTrue':'bureauFalse'}onClick={()=>{OngletHoraires==='bureau'?setOngletHoraires('conduite'):setOngletHoraires('bureau')}}>Bureau</p>
                                <div className={OngletHoraires==='bureau'?'liseretOngletSelectionne':'liseretOngletSelectionne2'}></div>
                            </div>
                            <div>
                                <p className={OngletHoraires==='bureau'?'bureauFalse':'bureauTrue'} onClick={()=>{OngletHoraires==='bureau'?setOngletHoraires('conduite'):setOngletHoraires('bureau')}}>Conduite</p>
                                <div className={OngletHoraires==='bureau'?'liseretOngletSelectionneConduite2':'liseretOngletSelectionneConduite'}></div>
                            </div>
                        </div>
                        <div className={choice=='voiture'?'liseretHoraires':'liseretHorairesNone'}></div>
                        <div className={OngletHoraires==='bureau'?'containerHorairesBureau':'containerHorairesBureau2'}>
                            <div className='containerHorairesCalendar'>
                                <p>Lundi</p>
                                <div className='containerBoxHorairesDay'>
                                    <p>Matin</p>
                                    <div className='containerDropBox'>
                                        <select name="Horaires1" className="Horaires2" id='selectHoraireBureauMatinLundiOuvert' onChange={(e)=>ChangeHoraires(e,setLundiMatinOuvre,validerHorBur,setValiderHorBur)}>
                                           {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].LundiMatinOuvre}>{Fiche.HorairesBureau[0].LundiMatinOuvre}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2"  onChange={(e)=>ChangeHoraires(e,setLundiMatinferme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].LundiMatinFerme}>{Fiche.HorairesBureau[0].LundiMatinFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2"  onChange={(e)=>ChangeHoraires(e,setLundiApremOuvre,validerHorBur,setValiderHorBur)} >
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].LundiApremOuvre}>{Fiche.HorairesBureau[0].LundiApremOuvre}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2"  id='selectHoraireBureauApremLundiferme' onChange={(e)=>ChangeHoraires(e,setLundiApremferme,validerHorBur,setValiderHorBur)} >
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].LundiApremFerme}>{Fiche.HorairesBureau[0].LundiApremFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2"  onChange={(e)=>ChangeHoraires(e,setMardiMatinOuvre,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].MardiMatinOuvre}>{Fiche.HorairesBureau[0].MardiMatinOuvre}</option>:<option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMardiMatinFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].MardiMatinFerme}>{Fiche.HorairesBureau[0].MardiMatinFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMardiApremOuvre,validerHorBur,setValiderHorBur)}>
                                        {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].MardiApremOuvre}>{Fiche.HorairesBureau[0].MardiApremOuvre}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMardiApremFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].MardiApremFerme}>{Fiche.HorairesBureau[0].MardiApremFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMercrediMatinOuvre,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].MercrediMatinOuvre}>{Fiche.HorairesBureau[0].MercrediMatinOuvre}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMercrediMatinFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].MercrediMatinFerme}>{Fiche.HorairesBureau[0].MercrediMatinFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMercrediApremOuvre,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].MercrediApremOuvre}>{Fiche.HorairesBureau[0].MercrediApremOuvre}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMercrediApremFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].MercrediApremFerme}>{Fiche.HorairesBureau[0].MercrediApremFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setJeudiMatinOuvre,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].JeudiMatinOuvre}>{Fiche.HorairesBureau[0].JeudiMatinOuvre}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setJeudiMatinFerme,validerHorBur,setValiderHorBur)}>
                                        {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].JeudiMatinFerme}>{Fiche.HorairesBureau[0].JeudiMatinFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setJeudiApremOuvre,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].JeudiApremOuvre}>{Fiche.HorairesBureau[0].JeudiApremOuvre}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setJeudiApremFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].JeudiApremFerme}>{Fiche.HorairesBureau[0].JeudiApremFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setVendrediMatinOuvre,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].VendrediMatinOuvre}>{Fiche.HorairesBureau[0].VendrediMatinOuvre}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setVendrediMatinFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].VendrediMatinFerme}>{Fiche.HorairesBureau[0].LundiMatinFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setVendrediApremOuvert,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].VendrediApremOuvre}>{Fiche.HorairesBureau[0].VendrediApremOuvre}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setVendrediApremFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].VendrediApremFerme}>{Fiche.HorairesBureau[0].VendrediApremFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setSamediMatinOuvre,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].SamediMatinOuvre}>{Fiche.HorairesBureau[0].SamediMatinOuvre}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setSamediMatinFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].SamediMatinFerme}>{Fiche.HorairesBureau[0].SamediMatinFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setSamediApremOuvert,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].SamediApremOuvre}>{Fiche.HorairesBureau[0].SamediApremOuvre}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setSamediApremFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].SamediApremFerme}>{Fiche.HorairesBureau[0].SamediApremFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setDimancheMatinOuvre,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].DimancheMatinOuvre}>{Fiche.HorairesBureau[0].DimancheMatinOuvre}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setDimancheMatinFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].DimancheMatinFerme}>{Fiche.HorairesBureau[0].DimancheMatinFerme}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setDimancheApremOuvert,validerHorBur,setValiderHorBur)}>
                                        {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].DimancheApremOuvre}>{Fiche.HorairesBureau[0].DimancheApremOuvre}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setDimancheApremFerme,validerHorBur,setValiderHorBur)}>
                                            {Fiche.HorairesBureau.length!=0?<option value={Fiche.HorairesBureau[0].DimancheApremFerme}>{Fiche.HorairesBureau[0].DimancheApremFerme}</option>: <option value="fermé">Fermé</option>}
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
                            <input   type='submit' className={validerHorBur==false?'buttonValidBoxcase':'buttonValidBoxcaseModifOk'}  value={validerHorBur==false?'Valider':"Modifications enregistrées"} onClick={()=>{HorairesBureauModif()}}></input>
                            
                        </div>
                        <div className={OngletHoraires==='bureau'?'containerHorairesConduite2':'containerHorairesBureau'}>
                            <div className='containerHorairesCalendar'>
                                <p>Lundi</p>
                                <div className='containerBoxHorairesDay'>
                                    <p>Matin</p>
                                    <div className='containerDropBox'>
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setLundiMatinOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].LundiMatinOuvreConduite}>{Fiche.HorairesConduite[0].LundiMatinOuvreConduite}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setLundiMatinfermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].LundiMatinFermeConduite}>{Fiche.HorairesConduite[0].LundiMatinFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setLundiApremOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].LundiApremOuvreConduite}>{Fiche.HorairesConduite[0].LundiApremOuvreConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setLundiApremfermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].LundiApremFermeConduite}>{Fiche.HorairesConduite[0].LundiApremFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMardiMatinOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].MardiMatinOuvreConduite}>{Fiche.HorairesConduite[0].MardiMatinOuvreConduite}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMardiMatinFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].MardiMatinFermeConduite}>{Fiche.HorairesConduite[0].MardiMatinFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMardiApremOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].MardiApremOuvreConduite}>{Fiche.HorairesConduite[0].MardiApremOuvreConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMardiApremFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                        {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].MardiApremFermeConduite}>{Fiche.HorairesConduite[0].MardiApremFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMercrediMatinOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].MercrediMatinOuvreConduite}>{Fiche.HorairesConduite[0].MercrediMatinOuvreConduite}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMercrediMatinFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].MercrediMatinFermeConduite}>{Fiche.HorairesConduite[0].MercrediMatinFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMercrediApremOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].MardiApremOuvreConduite}>{Fiche.HorairesConduite[0].MardiApremOuvreConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setMercrediApremFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                        {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].MercrediApremFermeConduite}>{Fiche.HorairesConduite[0].MercrediApremFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setJeudiMatinOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].JeudiMatinOuvreConduite}>{Fiche.HorairesConduite[0].JeudiMatinOuvreConduite}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setJeudiMatinFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                        {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].JeudiMatinFermeConduite}>{Fiche.HorairesConduite[0].JeudiMatinFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setJeudiApremOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                        {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].JeudiApremOuvreConduite}>{Fiche.HorairesConduite[0].JeudiApremOuvreConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setJeudiApremFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].JeudiApremFermeConduite}>{Fiche.HorairesConduite[0].JeudiApremFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setVendrediMatinOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].VendrediMatinOuvreConduite}>{Fiche.HorairesConduite[0].VendrediMatinOuvreConduite}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setVendrediMatinFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].VendrediMatinFermeConduite}>{Fiche.HorairesConduite[0].VendrediMatinFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setVendrediApremOuvertConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                        {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].VendrediApremOuvreConduite}>{Fiche.HorairesConduite[0].VendrediApremOuvreConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setVendrediApremFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                        {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].VendrediApremFermeConduite}>{Fiche.HorairesConduite[0].VendrediApremFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setSamediMatinOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].SamediMatinOuvreConduite}>{Fiche.HorairesConduite[0].SamediMatinOuvreConduite}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setSamediMatinFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                        {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].SamediMatinFermeConduite}>{Fiche.HorairesConduite[0].SamediMatinFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setSamediApremOuvertConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].SamediApremOuvreConduite}>{Fiche.HorairesConduite[0].SamediApremOuvreConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setSamediApremFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].SamediApremFermeConduite}>{Fiche.HorairesConduite[0].SamediMatinFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setDimancheMatinOuvreConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].DimancheMatinOuvreConduite}>{Fiche.HorairesConduite[0].DimancheMatinOuvreConduite}</option>: <option value="fermé">Fermé</option>}
                                            <option value="7:00">7:00</option>
                                            <option value="7:30">7:30</option>
                                            <option value="8:00">8:00</option>
                                            <option value="8:30">8:30</option>
                                            <option value="9:00">9:00</option>
                                            <option value="9:30">9:30</option>   
                                        </select>
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setDimancheMatinFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                        {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].DimancheMatinFermeConduite}>{Fiche.HorairesConduite[0].DimancheMatinFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires1" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setDimancheApremOuvertConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].DimancheApremOuvreConduite}>{Fiche.HorairesConduite[0].DimancheApremOuvreConduite}</option>: <option value="fermé">Fermé</option>}
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
                                        <select name="Horaires" className="Horaires2" onChange={(e)=>ChangeHoraires(e,setDimancheApremFermeConduite,ValiderHorairesConduites,setValiderHorairesConduites)}>
                                            {Fiche.HorairesConduite.length!=0?<option value={Fiche.HorairesConduite[0].DimancheApremFermeConduite}>{Fiche.HorairesConduite[0].DimancheApremFermeConduite}</option>: <option value="fermé">Fermé</option>}
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
                            <input type='submit' className={ValiderHorairesConduites===false?'buttonValidBoxcase':'buttonValidBoxcaseModifOk'} value={ValiderHorairesConduites===false?"Valider":"Modifications enregistrées"} onClick={()=>{HorairesConduiteModif()}}></input>
                        </div>
                    </div>

                    <div className={choice==='médecin'?'displayBlockChoice':'displayNoneblockChoice'}>
                        <div className='pTEAndLogoMinusPaiement'>
                                    <p>Tarifs</p>
                                    {MinusTarifs===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusTarifs===false?setMinusTarifs(true):setMinusTarifs(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusTarifs===false?setMinusTarifs(true):setMinusTarifs(false)}}>-</p></div>}
                        </div>
                        <div className='pForfaitAndLogoMinusEquipe'>
                                <button  className={Fiche.Tarifs.length==0 && MinusTarifs==true && AddTarif==false?'buttonAjouterMembre':'buttonAjouterMembre2'} onClick={()=>{setAddTarif(true)}}>+ Ajouter Tarif</button>
                        </div>
                        <form className={  AddTarif===true || ModifyTarif===true?'containerNomDescription2':'containerNomDescription'} id='resetDescriptif'>
                            <img src={cross} className='fermerFormFormationModifFiche' onClick={()=>{closeFormTarif()}}></img>
                            <input type='text' placeholder='Consultation' className='inputNom' id='resetDescriptif' value={valueModifyTarif!=null?valueModifyTarif:null} onChange={(e)=>{ModifyTarif===true?setValueModifyTarif(e.target.value):setTarif(e.target.value)}}></input>
                            <input type='number' placeholder='prix' className='inputNom' id='resetDescriptif' value={valueModifyTarifPrix!=null?valueModifyTarifPrix:null} onChange={(e)=>{ModifyTarif===true?setValueModifyTarifPrix(e.target.value):setTarifPrix(e.target.value)}}></input>
                            <input   type='reset' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{ModifyTarif===true?tarifModifIndex():TarifModif()}}></input>
                        </form>
                    </div>
                    <div className={Fiche.Tarifs!=0 && MinusTarifs===true && AddTarif===false && ModifyTarif===false ?'containerPrixNomFormation':'containerPrixNomFormation2'}>
                            <div className={Fiche.Tarifs!=0 && MinusTarifs===true && AddTarif===false && ModifyTarif===false?'containerConsultationPrixTarifsFiche':'containerNomPrixFormationFiche2'}>
                                <p>Consultation</p>
                                <p className='pPrixForfaitFiche'>Prix</p>  
                            </div>
                        {Fiche.Tarifs!=0 && MinusTarifs===true? Fiche.Tarifs.map((event)=>
                            <div className='SpeContainer'>
                                <p className='pTarifsFicheModif'>{event.Consultation}</p>
                                <p className='pTarifsPrixFicheModif'>{event.Prix} €</p>
                                <div className='containerIconTarifs'>
                                    <img src={modif} className='iconForfaitFiche' onClick={()=>{OpenModifyGeneral(setIndexTarif,Fiche.Tarifs.indexOf(event),setValueModifyTarif,event.Consultation,setValueModifyTarifPrix,event.Prix,setModifyTarif)}}></img>
                                    <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpGeneral(setCheckPopUpSupOpen,setInDeleteTarif,setUniqueIdForm,event.id,setFormationNameSup,"ce tarif")}}></img>
                                </div>   
                            </div> 
                            ):console.log("pas de spe")}
                    </div>
                    <div className='pForfaitAndLogoMinusEquipe'>
                                <button  className={Fiche.Tarifs.length!=0 && MinusTarifs==true && AddTarif==false && ModifyTarif===false?'buttonAjouterMembre':'buttonAjouterMembre2'} onClick={()=>{setAddTarif(true)}}>+ Ajouter Tarif</button>
                    </div>

                    <div className={choice==='voiture'?'displayBlockChoice':'displayNoneblockChoice'}>
                    <div className='pFormationAndLogoMinus'>
                        <p>Formation</p>
                        {MinusFormations===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusFormations===false?setMinusFormations(true):setMinusFormations(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusFormations===false?setMinusFormations(true):setMinusFormations(false)}}>-</p></div>}
                    </div>
                    <div className={MinusFormations===false?'containerFormation2':'containerFormation'} >
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
                            <div className={Fiche.length!=0 && Fiche.Formation.length!=0&& OngletFormations!='Stages'?'containerNomPrixFormationFiche':Fiche.length!=0 && Fiche.Formation.length!=0&& OngletFormations=='Stages'?'containerNomPrixFormationFicheStages':'containerNomPrixFormationFiche2'}>
                                <p>Nom</p>
                               {OngletFormations==='Auto'?<p>Type</p>:OngletFormations==='Moto'||OngletFormations==='Bateau'?<p id='TypeFormationAutreMoto'>Type</p>:console.log("ha ba non")}
                               {OngletFormations==='Auto'?<p>Option</p>:console.log("toujourspas non")}
                                <p className='pPrixForfaitFiche'>Prix</p>  
                            </div>
                        {Fiche.length!=0 && Fiche.Formation.length!=0?Fiche.Formation.map( 
                        (event)=>
                        event.categorie==='Auto'&& OngletFormations==='Auto'? 
                        <div > 
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                {event.typeClass===true?<p className='pForfaitsMap'>Class</p>:<p className='pForfaitsMap'>Acce</p>}
                                {event.optionSuper===true?<p className='pForfaitsMap'>Supervi</p>:event.optionAccom===true?<p className='pForfaitsMap'>Accom</p>:<p className='pForfaitsMap'>Aucune</p>}
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{OpenModifFormation(event.Nom,event.Descriptif,event.prix,event.uniqueId,event.typeClass,event.typeAcc,event.optionAccom,event.optionSuper,event.optionAucune)}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpForm(Fiche.EcoleNameId,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>: event.categorie==='Moto'&& OngletFormations==='Moto'?<div >
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                {event.typeClass===true?<p className='pForfaitsMap'>Class</p>:<p className='pForfaitsMap'>Acce</p>}
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{OpenModifFormation(event.Nom,event.Descriptif,event.prix,event.uniqueId,event.typeClass,event.typeAcc,"NI","NI","NI")}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpForm(Fiche.EcoleNameId,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>: event.categorie==='Bateau'&& OngletFormations==='Bateau'?<div >
                            <div className='containerForfaitMapFiche'>
                                <p className='pForfaitsMap'> {event.Nom}</p>
                                {event.typeClass===true?<p className='pForfaitsMap'>Class</p>:<p className='pForfaitsMap'>Acce</p>}
                                <div className='containerIconFormationPrixFiche'>
                                    <p className='pPrixForfaitsFiche'>{event.prix}</p>
                                    <div className='containerIconForfaitFiche'>
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{OpenModifFormation(event.Nom,event.Descriptif,event.prix,event.uniqueId,event.typeClass,event.typeAcc,"NI","NI","NI")}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpForm(Fiche.EcoleNameId,event.uniqueId,event.Nom)}}></img>
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
                                        <img src={modif} className='iconForfaitFiche'onClick={()=>{OpenModifFormation(event.Nom,event.Descriptif,event.prix,event.uniqueId,"NI","NI","NI","NI","NI")}}></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpForm(Fiche.EcoleNameId,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>:console.log('genial')
                        ):console.log('ok') }
                        </div>
                        <button  className={Fiche.length!=0 && isCategorieFormation===true && ModifFormation===false && MinusAddFormations===false?'buttonAjouter3':'buttonAjouter2'} onClick={()=>{letContainerFormationdesappear()}}>+ Nouveau forfait</button>   
                        <div className={MinusAddFormations===false?'containerNomDescription':'containerFormFormation'}>
                            <img src={cross} className='fermerFormFormationModifFiche'onClick={()=>{letContainerAppearFromFormationAdd()}}></img>
                            <input type='text' placeholder='Nom de la formation' className='inputNom' onChange={(e)=>setFormationName(e.target.value)}></input>
                            <textarea type='text' placeholder='Descriptif de la formation' className='inputDescriptif' rows="10" cols="30"onChange={(e)=>setFormationDescriptif(e.target.value)}></textarea>
                            <input type='number' placeholder='prix de la formation' className='inputNom' onChange={(e)=>{setFormationPrix(e.target.value)}}></input>
                            <div className={OngletFormations!='Stages'?'checkBoxTypeEtOptionFormation':'checkBoxTypeEtOptionFormation2'}>
                                <p>Type :</p>
                                <div className='checkBoxFormation'>
                                    <p>Classique</p>
                                    <div className={checkFormationTypeClassique===true?'checkBoxTrueFormation':'checkBoxFalseFormation'} onClick={()=>{checkFormationTypeClassique==false?oneOrTheOther(setCheckFormationTypeClassique,setCheckFormationTypeAccellérée):setCheckFormationTypeClassique(false)}}>
                                        <img src={check} className={checkFormationTypeClassique===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <div className='checkBoxFormation'>
                                    <p>Accelérée</p>
                                    <div className={checkFormationTypeAccellérée===true?'checkBoxTrueFormation':'checkBoxFalseFormation'} onClick={()=>{checkFormationTypeAccellérée==false?oneOrTheOther(setCheckFormationTypeAccellérée,setCheckFormationTypeClassique):setCheckFormationTypeAccellérée(false)}}>
                                        <img src={check} className={checkFormationTypeAccellérée===true?'checkTrue':'checkFalse'}></img>
                                    </div> 
                                </div>
                            </div>
                            <div className={OngletFormations=='Auto'?'checkBoxTypeEtOptionFormation':'checkBoxTypeEtOptionFormation2'}>
                                <p>Option :</p> 
                                <div className='checkBoxFormation' id='checkBoxFormationAccom'>
                                    <p>Accompagnée</p>
                                    <div className={checkFormationOptionAcc===true?'checkBoxTrueFormation':'checkBoxFalseFormation'} onClick={()=>{checkFormationOptionAcc==false?oneOrTheOtherTwo(setcheckFormationOptionAcc,setcheckFormationOptionSuper,setcheckFormationOptionAucune):setcheckFormationOptionAcc(false)}}>
                                        <img src={check} className={checkFormationOptionAcc===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <div className='checkBoxFormation'id='checkBoxFormationSuper'>
                                    <p>Superviséé</p>
                                    <div className={checkFormationOptionSuper===true?'checkBoxTrueFormation':'checkBoxFalseFormation'} onClick={()=>{checkFormationOptionSuper==false?oneOrTheOtherTwo(setcheckFormationOptionSuper,setcheckFormationOptionAcc,setcheckFormationOptionAucune):setcheckFormationOptionSuper(false)}}>
                                        <img src={check} className={checkFormationOptionSuper===true?'checkTrue':'checkFalse'}></img>
                                    </div> 
                                </div>
                                <div className='checkBoxFormation'>
                                    <p>Aucune</p>
                                    <div className={checkFormationOptionAucune===true?'checkBoxTrueFormation':'checkBoxFalseFormation'} onClick={()=>{checkFormationOptionAucune==false?oneOrTheOtherTwo(setcheckFormationOptionAucune,setcheckFormationOptionSuper,setcheckFormationOptionAcc):setcheckFormationOptionAucune(false)}}>
                                        <img src={check} className={checkFormationOptionAucune===true?'checkTrue':'checkFalse'}></img>
                                    </div> 
                                </div>
                            </div>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{formationsModif()}}></input>
                        </div>
                        <div className={ModifFormation===false?'containerNomDescription':'containerFormFormation'}>
                            <div className='containerModifFormationPAndCross'>
                                <p>Modifier Formation</p>
                                <img src={cross} className='fermerFormFormationModifFiche2'onClick={()=>{letContainerAppear()}}></img>
                            </div> 
                            <input type='text' placeholder='Nom de la formation' className='inputNom' value={ModificationFormationNom} onChange={(e)=>{setModificationFormationNom(e.target.value)}}></input>
                            <textarea type='text' placeholder='Descriptif de la formation' className='inputDescriptif' rows="10" cols="30" value={ModificationFormationDescriptif} onChange={(e)=>{setModificationFormationDescriptif(e.target.value)}}></textarea>
                            <input type='number' placeholder='prix de la formation' className='inputNom' value={ModificationFormationPrix} onChange={(e)=>{setModificationFormationPrix(e.target.value)}}></input>
                            <div className={OngletFormations!='Stages'?'checkBoxTypeEtOptionFormation':'checkBoxTypeEtOptionFormation2'}>
                                <p>Type :</p>
                                <div className='checkBoxFormation'>
                                    <p>Classique</p>
                                    <div className={checkFormationTypeClassique===true?'checkBoxTrueFormation':'checkBoxFalseFormation'} onClick={()=>{checkFormationTypeClassique==false?oneOrTheOther(setCheckFormationTypeClassique,setCheckFormationTypeAccellérée):setCheckFormationTypeClassique(false)}}>
                                        <img src={check} className={checkFormationTypeClassique===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <div className='checkBoxFormation'>
                                    <p>Accelérée</p>
                                    <div className={checkFormationTypeAccellérée===true?'checkBoxTrueFormation':'checkBoxFalseFormation'} onClick={()=>{checkFormationTypeAccellérée==false?oneOrTheOther(setCheckFormationTypeAccellérée,setCheckFormationTypeClassique):setCheckFormationTypeAccellérée(false)}}>
                                        <img src={check} className={checkFormationTypeAccellérée===true?'checkTrue':'checkFalse'}></img>
                                    </div> 
                                </div>
                            </div>
                            <div className={OngletFormations=='Auto'?'checkBoxTypeEtOptionFormation':'checkBoxTypeEtOptionFormation2'}>
                                <p>Option :</p> 
                                <div className='checkBoxFormation' id='checkBoxFormationAccom'>
                                    <p>Accompagnée</p>
                                    <div className={checkFormationOptionAcc===true?'checkBoxTrueFormation':'checkBoxFalseFormation'} onClick={()=>{checkFormationOptionAcc==false?oneOrTheOtherTwo(setcheckFormationOptionAcc,setcheckFormationOptionSuper,setcheckFormationOptionAucune):setcheckFormationOptionAcc(false)}}>
                                        <img src={check} className={checkFormationOptionAcc===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <div className='checkBoxFormation'id='checkBoxFormationSuper'>
                                    <p>Superviséé</p>
                                    <div className={checkFormationOptionSuper===true?'checkBoxTrueFormation':'checkBoxFalseFormation'} onClick={()=>{checkFormationOptionSuper==false?oneOrTheOtherTwo(setcheckFormationOptionSuper,setcheckFormationOptionAcc,setcheckFormationOptionAucune):setcheckFormationOptionSuper(false)}}>
                                        <img src={check} className={checkFormationOptionSuper===true?'checkTrue':'checkFalse'}></img>
                                    </div> 
                                </div>
                                <div className='checkBoxFormation'>
                                    <p>Aucune</p>
                                    <div className={checkFormationOptionAucune===true?'checkBoxTrueFormation':'checkBoxFalseFormation'} onClick={()=>{checkFormationOptionAucune==false?oneOrTheOtherTwo(setcheckFormationOptionAucune,setcheckFormationOptionSuper,setcheckFormationOptionAcc):setcheckFormationOptionAucune(false)}}>
                                        <img src={check} className={checkFormationOptionAucune===true?'checkTrue':'checkFalse'}></img>
                                    </div> 
                                </div>
                            </div>
                            <input   type='submit' className='buttonValidModifForm' value={'Valider modifications'} onClick={()=>{ModifFormationSecond()}}></input>
                        </div>
                        <div className='pForfaitAndLogoMinus'>
                            <p className="pFormationFiche">A la carte</p>
                            <button  className={Fiche.length!=0 && IsCategorieCarte===false?'buttonAjouter':'buttonAjouter2'} onClick={()=>{setMinusAddCarte(true)}}>+ Nouveau service</button>
                        </div>
                        <div className={IsCategorieCarte===true ?'containerPrixNomFormation':'containerPrixNomFormation2'}>
                            <div className={Fiche.length!=0 && Fiche.FormationCarte.length!=0?'containerNomPrixFormationFicheStages':'containerNomPrixFormationFiche2'}>
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
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpFormCarte(Fiche.EcoleNameId,event.uniqueId,event.Nom)}}></img>
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
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpFormCarte(Fiche.EcoleNameId,event.uniqueId,event.Nom)}}></img>
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
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpFormCarte(Fiche.EcoleNameId,event.uniqueId,event.Nom)}}></img>
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
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpFormCarte(Fiche.EcoleNameId,event.uniqueId,event.Nom)}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className='liseretFormation'></div>
                        </div>:console.log('genial')
                        ):console.log('ok') }
                        </div>
                        <button  className={Fiche.length!=0 && IsCategorieCarte===true && ModifFormation===false && MinusAddCarte===false?'buttonAjouter3':'buttonAjouter2'} onClick={()=>{letContainerFormationCartedesappear()}}>+ Nouveau service</button>   
                        <div className={MinusAddCarte===false?'containerNomDescription':'containerFormFormation'}>
                            <img src={cross} className='fermerFormFormationModifFiche'onClick={()=>{letContainerAppearFromAddCarte()}}></img>
                            <input type='text' placeholder='Nom de la formation' className='inputNom' onChange={(e)=>setFormationCarteName(e.target.value)}></input>
                            <textarea type='text' placeholder='Descriptif de la formation' className='inputDescriptif' rows="10" cols="30"onChange={(e)=>setFormationCarteDescriptif(e.target.value)}></textarea>
                            <input type='number' placeholder='prix de la formation' className='inputNom' onChange={(e)=>{setFormationCartePrix(e.target.value)}}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={()=>{formationCarteModif()}}></input>
                        </div>
                        <div className={ModifFormationCarte===false?'containerNomDescription':'containerFormFormation'}>
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
                        <div className={MinusAddMembre===false?'containerNomDescription':'containerFormFormation'}>
                            <img src={cross} className='fermerFormFormationModifFiche'onClick={()=>{setMinusAddMembre(false)}}></img>
                            <input  type="file" id="imageFile" accept="image/*"  placeholder='uploadEquipes' className='UploadEquipe'  onChange={(e)=>{uploadEquipesId(e)}} multiple></input>
                            {UploadEquipes==null?<div  className='PhotoEquipe'>Télécharger Photo</div>:<div  className='PhotoEquipe'>Photo téléchargée</div>}
                            <input type='text' placeholder='Nom' className='inputNom' onChange={(e)=>setNameMemberEquipe(e.target.value)}></input>
                            <input type='text' placeholder='Fonction' className='inputNom'onChange={(e)=>setFonctionMemberEquipe(e.target.value)}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={onSubmitEquipes}></input>
                        </div>
                        <div className={ModifyEquipe===false?'containerNomDescription':'containerFormFormation'}>
                            <img src={cross} className='fermerFormFormationModifFiche'onClick={()=>{setModifyEquipe(false)}}></img>
                            <img src={EquipeUrl} className={UploadEquipes==null?'PhotoEquipeModif':'PhotoEquipeModif2'}></img>
                            <input  type="file" id="imageFile" accept="image/*"  placeholder='uploadEquipes' className='UploadEquipe'  onChange={(e)=>{uploadEquipesId(e)}} multiple></input>
                            {UploadEquipes==null?<div  className='PhotoEquipe'>modifier photo</div>:<div  className='PhotoEquipe'>Photo modifiée</div>}
                            <input type='text' placeholder='Nom' className='inputNom' value={NameMemberEquipe} onChange={(e)=>setNameMemberEquipe(e.target.value)}></input>
                            <input type='text' placeholder='Fonction' className='inputNom' value={FonctionMemberEquipe} onChange={(e)=>setFonctionMemberEquipe(e.target.value)}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={onSubmitModifyEquipes}></input>
                        </div>
                        <div className={EquipesInfo.length!=0 && EquipesInfo.length!=1 && MinusAddMembre==false && ModifyEquipe==false?'containerEquipeInfo': EquipesInfo.length==1 && MinusAddMembre==false && ModifyEquipe==false?'containerEquipeInfo3':'containerEquipeInfo2'}>
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

                    <div className='pTEAndLogoMinusPaiement'>
                        <p>Paiements acceptés</p>
                        {MinusTEPaiement===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusTEPaiement===false?setMinusTEPaiement(true):setMinusTEPaiement(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusTEPaiement===false?setMinusTEPaiement(true):setMinusTEPaiement(false)}}>-</p></div>}
                    </div>
                    <div className={MinusTEPaiement===false?'containerButtonAndBoxcase2':'containerButtonAndBoxcase'}>
                        <div className='containercheckBoxAndP'>
                            <p>Carte Bancaire</p>
                            <div className={checkBancaire===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(checkBancaire,setCheckBancaire,ValiderPaiment,setModifySecondPaiment)}}>
                                <img src={check} className={checkBancaire===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <div className='containercheckBoxAndP'>
                            <p>Espèces</p>
                            <div className={checkEspeces===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(checkEspeces,setCheckEspece,ValiderPaiment,setModifySecondPaiment)}}>
                                <img src={check} className={checkEspeces===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <div className='containercheckBoxAndP'>
                            <p>Chèque</p>
                            <div className={checkCheque===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(checkCheque,setCheckCheque,ValiderPaiment,setModifySecondPaiment)}}>
                                <img src={check} className={checkCheque===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <div className={choice==='voiture'?'containercheckBoxAndP':'containercheckBoxAndPNone'}>
                            <p>Carte et chèque cadeau</p>
                            <div className={checkCadeau===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(checkCadeau,setCheckCadeau,ValiderPaiment,setModifySecondPaiment)}}>
                                <img src={check} className={checkCadeau===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <input   type='submit' className={ValiderPaiment===false?'buttonValidBoxcase':'buttonValidBoxcase2'}  value={'Valider'} onClick={()=>{PaiementModif()}}></input>
                        <input   type='submit' className={ValiderPaiment===true && ModifySecondPaiement===false?'buttonValidBoxcaseModif':ValiderPaiment===true && ModifySecondPaiement===true?'buttonValidBoxcaseModif3':'buttonValidBoxcaseModif2'}  value={ModifySecondPaiement===false?'Modification enregistrée':'valider'} onClick={()=>{ModifSecondPaiementRequest()}}></input>
                    </div>

                    <div className={choice==='voiture'?'displayBlockChoice':'displayNoneblockChoice'}>           
                        <div className='pTEAndLogoMinusPaiement'>
                            <p>Financements</p>
                            {MinusFinancement===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusFinancement===false?setMinusFinancement(true):setMinusFinancement(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusFinancement===false?setMinusFinancement(true):setMinusFinancement(false)}}>-</p></div>}
                        </div>
                        <div className={MinusFinancement===false?'containerButtonAndBoxcase2':'containerButtonAndBoxcase'}>
                            <div className='containercheckBoxAndP'>
                                <p>CPF</p>
                                <div className={CheckCPF===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(CheckCPF,setCheckCPF,ValiderFinancements,setModifsecondFinancements)}}>
                                    <img src={check} className={CheckCPF===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndP'>
                                <p>Permis 1€/jour</p>
                                <div className={CheckPermis1===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(CheckPermis1,setCheckpermis1,ValiderFinancements,setModifsecondFinancements)}}>
                                    <img src={check} className={CheckPermis1===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndP'>
                                <p>Pôle emploi</p>
                                <div className={CheckPoleEmp===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(CheckPoleEmp,setCheckPoleEmp,ValiderFinancements,setModifsecondFinancements)}}>
                                    <img src={check} className={CheckPoleEmp===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndP'>
                                <p>Aide Apprentis</p>
                                <div className={CheckAideApp===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(CheckAideApp,setCheckAideApp,ValiderFinancements,setModifsecondFinancements)}}>
                                    <img src={check} className={CheckAideApp===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndP'>
                                <p>Aide locales</p>
                                <div className={CheckAideLocales===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(CheckAideLocales,setCheckAideLocales,ValiderFinancements,setModifsecondFinancements)}}>
                                    <img src={check} className={CheckAideLocales===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <input   type='submit' className={ValiderFinancements===false?'buttonValidBoxcase':'buttonValidBoxcase2'}  value={'Valider'} onClick={()=>{financementsModif()}}></input>
                            <input   type='submit' className={ValiderFinancements===true && ModifSecondFinancements===false?'buttonValidBoxcaseModif':ValiderFinancements===true && ModifSecondFinancements===true?'buttonValidBoxcaseModif3':'buttonValidBoxcaseModif2'}  value={ModifSecondFinancements===false?'Modification enregistrée':'valider'} onClick={()=>{financementsSecondModif()}}></input>
                        </div>
                    </div>

                    <div className={choice==='voiture'?'displayBlockChoice':'displayNoneblockChoice'}>
                    <div className='pFormationAndLogoMinus'>
                        <p>Véhicules</p>
                        {MinusVéhicule===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusVéhicule===false?setMinusVéhicule(true):setMinusVéhicule(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusVéhicule===false?setMinusVéhicule(true):setMinusVéhicule(false)}}>-</p></div>}
                    </div>
                    <div className={MinusVéhicule===false?'containerFormation2':'containerFormation'}>
                        <div className='pForfaitAndLogoMinusEquipe'>
                                <button  className={VéhiculeInfo.length==0 && MinusAddVéhicule==false?'buttonAjouterMembre':'buttonAjouterMembre2'} onClick={()=>{setMinusAddVéhicule(true)}}>+ Nouveau véhicule</button>
                        </div>
                        <div className={MinusAddVéhicule===false?'containerNomDescription':'containerNomDescription2'}>
                            <img src={cross} className='fermerFormFormationModifFiche'onClick={()=>{setMinusAddVéhicule(false)}}></img>
                            <input  type="file" id="imageFile" accept="image/*"  placeholder='uploadEquipes' className='UploadEquipe'  onChange={(e)=>{uploadVehiculeId(e)}} multiple></input>
                            {UploadVéhicule==null?<div  className='PhotoEquipe'>Télécharger Photo</div>:<div  className='PhotoEquipe'>Photo téléchargée</div>}
                            <input type='text' placeholder='Nom' className='inputNom' onChange={(e)=>setNameVéhicule(e.target.value)}></input>
                            <input type='text' placeholder='Fonction' className='inputNom'onChange={(e)=>setFonctionVéhicule(e.target.value)}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={onSubmitVéhicule}></input>
                        </div>
                        <div className={ModifyVéhicule===false?'containerNomDescription':'containerNomDescription2'}>
                            <img src={cross} className='fermerFormFormationModifFiche'onClick={()=>{setModifyVéhicule(false)}}></img>
                            <img src={VéhiculeUrl} className={UploadVéhicule==null?'PhotoEquipeModif':'PhotoEquipeModif2'}></img>
                            <input  type="file" id="imageFile" accept="image/*"  placeholder='uploadEquipes' className='UploadEquipe'  onChange={(e)=>{uploadVehiculeId(e)}} multiple></input>
                            {UploadEquipes==null?<div  className='PhotoEquipe'>modifier photo</div>:<div  className='PhotoEquipe'>Photo modifiée</div>}
                            <input type='text' placeholder='Nom' className='inputNom' value={NameVéhicule} onChange={(e)=>setNameVéhicule(e.target.value)}></input>
                            <input type='text' placeholder='Fonction' className='inputNom' value={FonctionVéhicule} onChange={(e)=>setFonctionVéhicule(e.target.value)}></input>
                            <input   type='submit' className='buttonValidBoxcase' value={'Valider'} onClick={onSubmitModifyVéhicule}></input>
                        </div>
                        <div className={VéhiculeInfo.length!=0 && VéhiculeInfo.length!=1 && MinusAddVéhicule==false && ModifyVéhicule==false?'containerEquipeInfo':VéhiculeInfo.length==1 && MinusAddVéhicule==false && ModifyVéhicule==false?'containerEquipeInfo3':'containerEquipeInfo2'}>
                            {VéhiculeInfo.map((vehi)=>
                            <div className='containerPhotoIconEquipe'>
                                {console.log(VéhiculeInfo)}
                                <div className='cardInfoEquipe'> 
                                {!vehi.logoUrl? <img src={picVéhicule} className='picEquipeDefault'></img>:<img src={vehi.logoUrl} className='picEquipe'></img>}
                                    <p className='NomEquipe'>{vehi.Nom}</p>
                                    <p className='FonctionEquipe'>{vehi.Fonction}</p>          
                                </div>
                                <div className='liseretEquipeCard'></div>
                                <div className='containerIconEquipe'>
                                        <img src={modif} onClick={()=>{ModifUploadVéhicule(vehi.pictureName,vehi.logoUrl,vehi._id,vehi.Nom,vehi.Fonction)}} className='iconForfaitFiche'></img>
                                        <img src={trash} className='iconForfaitFiche' onClick={()=>{OpenPopUpGeneral(setCheckPopUpSupOpen,setOpenPopUpDeleteFromVéhicule,setIdVéhicule,vehi._id,setNameVéhicule,vehi.Nom)}}></img>
                                </div>
                            </div>
                            )}
                        </div>
                        <button  className={VéhiculeInfo!=0 && MinusAddVéhicule===false && ModifyVéhicule==false?'buttonAjouterMembreBottom':'buttonAjouterMembre2'} onClick={()=>{setMinusAddVéhicule(true)}}>+ Nouveau véhicule</button>
                    </div>

                    <div className='pTEAndLogoMinusPaiement'>
                        <p>Inclusivité</p>
                        {MinusTEInclusive===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusTEInclusive===false?setMinusTEInclusive(true):setMinusTEInclusive(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusTEInclusive===false?setMinusTEInclusive(true):setMinusTEInclusive(false)}}>-</p></div>}
                    </div>
                    <div className={MinusTEInclusive===false?'containerButtonAndBoxcase2':'containerButtonAndBoxcase'}>
                        <div className='pTEAndLogoMinusLangueMenu'>
                            <div className='pTEAndLogoMinusLangue'>
                                <p>Langues</p>
                                {MinusTEILangue===false?<div className='containerMinusLangue'><p className='minusLangue' onClick={()=>{MinusTEILangue===false?setMinusTELangue(true):setMinusTELangue(false)}}>+</p></div>:<div className='containerMinusLangue'><p className='minusLangue' onClick={()=>{MinusTEILangue===false?setMinusTELangue(true):setMinusTELangue(false)}}>-</p></div>}
                            </div>   
                            <div className={MinusTEILangue===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                <p>Anglais</p>
                                <div className={checkAnglais===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkAnglais,setCheckAnglais,ValiderInclusive,setModifySecondInclusive)}}>
                                    <img src={check} className={checkAnglais===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className={MinusTEILangue===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                <p>Espagnol</p>
                                <div className={checkEspagnol===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkEspagnol,setCheckEspagnol,ValiderInclusive,setModifySecondInclusive)}}>
                                    <img src={check} className={checkEspagnol===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className={MinusTEILangue===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                <p>Allemand</p>
                                <div className={checkAllemand===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkAllemand,setCheckAllemand,ValiderInclusive,setModifySecondInclusive)}}>
                                    <img src={check} className={checkAllemand===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className={MinusTEILangue===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                <p>Italien</p>
                                <div className={checkItalien===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkItalien,setCheckItalien,ValiderInclusive,setModifySecondInclusive)}}>
                                    <img src={check} className={checkItalien===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className={MinusTEILangue===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                <p>Portugais</p>
                                <div className={checkPortugais===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkPortugais,setCheckPortugais,ValiderInclusive,setModifySecondInclusive)}}>
                                    <img src={check} className={checkPortugais===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                         </div>
                         <div className='pTEAndLogoMinusLangueMenu'>
                            <div className='pTEAndLogoMinusLangue'>
                                <p>Accompagnement handicap</p>
                                {MinusTEIAccompHandi===false?<div className='containerMinusLangue'><p className='minusLangue' onClick={()=>{MinusTEIAccompHandi===false?setMinusTEAccompHandi(true):setMinusTEAccompHandi(false)}}>+</p></div>:<div className='containerMinusLangue'><p className='minusLangue' onClick={()=>{MinusTEIAccompHandi===false?setMinusTEAccompHandi(true):setMinusTEAccompHandi(false)}}>-</p></div>}
                            </div> 
                            <div className={MinusTEIAccompHandi===false?'OptionAccompHand2':'OptionAccompHand'}>
                                <div className={MinusTEIAccompHandi===false?'pTEAndLogoMinusMoteur2':'pTEAndLogoMinusMoteur'}>
                                    <p className='Moteurp'>Moteur</p>
                                    {MinusTEIMoteur===false?<div className='containerMinusMoteur'><p className='minusMoteur' onClick={()=>{MinusTEIMoteur===false?setMinusTEMoteur(true):setMinusTEMoteur(false)}}>+</p></div>:<div className='containerMinusMoteur'><p className='minusMoteur' onClick={()=>{MinusTEIMoteur===false?setMinusTEMoteur(true):setMinusTEMoteur(false)}}>-</p></div>}
                                </div>
                                <div className={MinusTEIMoteur===false?'containerOptionMoteur2':'containerOptionMoteur'}>
                                    <div className={MinusTEIMoteur===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                        <p>Paraplégie</p>
                                        <div className={CheckPara===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(CheckPara,setCheckPara,ValiderInclusive,setModifySecondInclusive)}}>
                                            <img src={check} className={CheckPara===true?'checkTrue':'checkFalse'}></img>
                                        </div>
                                    </div>
                                    <div className={MinusTEIMoteur===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                        <p>Tétraplégie</p>
                                        <div className={CheckTetra===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(CheckTetra,setCheckTetra,ValiderInclusive,setModifySecondInclusive)}}>
                                            <img src={check} className={CheckTetra===true?'checkTrue':'checkFalse'}></img>
                                        </div>
                                    </div>
                                    <div className={MinusTEIMoteur===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                        <p>Hémiplégie</p>
                                        <div className={CheckHemi===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(CheckHemi,setCheckHemi,ValiderInclusive,setModifySecondInclusive)}}>
                                            <img src={check} className={CheckHemi===true?'checkTrue':'checkFalse'}></img>
                                        </div>
                                    </div>
                                    <div className={MinusTEIMoteur===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                        <p>Amputation Membre supérieur</p>
                                        <div className={CheckAmpuSup===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(CheckAmpuSup,setCheckAmpuSup,ValiderInclusive,setModifySecondInclusive)}}>
                                            <img src={check} className={CheckAmpuSup===true?'checkTrue':'checkFalse'}></img>
                                        </div>
                                    </div> 
                                    <div className={MinusTEIMoteur===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                        <p>Amputation Membre inférieur</p>
                                        <div className={CheckAmpuInf===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(CheckAmpuInf,setCheckAmpuInf,ValiderInclusive,setModifySecondInclusive)}}>
                                            <img src={check} className={CheckAmpuInf===true?'checkTrue':'checkFalse'}></img>
                                        </div>
                                    </div>
                                </div>  
                                <div className={MinusTEIAccompHandi===false?'pTEAndLogoMinusMoteur2':'pTEAndLogoMinusMoteur'}>
                                    <p className='Moteurp'>Cognitif</p>
                                    {MinusTEICognitif===false?<div className='containerMinusMoteur'><p className='minusMoteur' onClick={()=>{MinusTEICognitif===false?setMinusTECognitif(true):setMinusTECognitif(false)}}>+</p></div>:<div className='containerMinusMoteur'><p className='minusMoteur' onClick={()=>{MinusTEICognitif===false?setMinusTECognitif(true):setMinusTECognitif(false)}}>-</p></div>}
                                </div> 
                                <div className={MinusTEICognitif===false?'containerOptionMoteur2':'containerOptionMoteur'}>
                                    <div className={MinusTEICognitif===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                        <p>Dys</p>
                                        <div className={checkDys===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkDys,setCheckDys,ValiderInclusive,setModifySecondInclusive)}}>
                                            <img src={check} className={checkDys===true?'checkTrue':'checkFalse'}></img>
                                        </div>
                                    </div>
                                    <div className={MinusTEICognitif===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                        <p>TDAH</p>
                                        <div className={checkTDAH===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkTDAH,setCheckTDAH,ValiderInclusive,setModifySecondInclusive)}}>
                                            <img src={check} className={checkTDAH===true?'checkTrue':'checkFalse'}></img>
                                        </div>
                                    </div>
                                </div>     
                                <div className={MinusTEIAccompHandi===false?'pTEAndLogoMinusMoteur2':'pTEAndLogoMinusMoteur'}>
                                    <p className='Moteurp'>Auditif</p>
                                    {MinusTEIAuditif===false?<div className='containerMinusMoteur'><p className='minusMoteur' onClick={()=>{MinusTEIAuditif===false?setMinusTEAuditif(true):setMinusTEAuditif(false)}}>+</p></div>:<div className='containerMinusMoteur'><p className='minusMoteur' onClick={()=>{MinusTEIAuditif===false?setMinusTEAuditif(true):setMinusTEAuditif(false)}}>-</p></div>}
                                </div>
                                <div className={MinusTEIAuditif===false?'containerOptionMoteur2':'containerOptionMoteur'}>
                                    <div className={MinusTEIAuditif===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                        <p>Surdité partielle</p>
                                        <div className={checkSigne===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkSigne,setCheckSigne,ValiderInclusive,setModifySecondInclusive)}}>
                                            <img src={check} className={checkSigne===true?'checkTrue':'checkFalse'}></img>
                                        </div>
                                    </div>
                                    <div className={MinusTEIAuditif===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                        <p>Surdité complète</p>
                                        <div className={checkLabiale===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkLabiale,setCheckLabiale,ValiderInclusive,setModifySecondInclusive)}}>
                                            <img src={check} className={checkLabiale===true?'checkTrue':'checkFalse'}></img>
                                        </div>
                                    </div>
                                </div>     
                            </div> 
                         </div>
                         <div className='pTEAndLogoMinusLangueMenu'>
                            <div className='pTEAndLogoMinusLangue'>
                                <p>Aménagement Véhicules</p>
                                {MinusTEIAmménage===false?<div className='containerMinusLangue'><p className='minusLangue' onClick={()=>{MinusTEIAmménage===false?setMinusTEAmménage(true):setMinusTEAmménage(false)}}>+</p></div>:<div className='containerMinusLangue'><p className='minusLangue' onClick={()=>{MinusTEIAmménage===false?setMinusTEAmménage(true):setMinusTEAmménage(false)}}>-</p></div>}
                            </div>   
                            <div className={MinusTEIAmménage===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                <p>Boule au volant</p>
                                <div className={checkBoule===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkBoule,setCheckBoule,ValiderInclusive,setModifySecondInclusive)}}>
                                    <img src={check} className={checkBoule===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className={MinusTEIAmménage===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                <p>Cercle au volant</p>
                                <div className={checkCercle===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkCercle,setCheckCercle,ValiderInclusive,setModifySecondInclusive)}}>
                                    <img src={check} className={checkCercle===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className={MinusTEIAmménage===false?'containercheckBoxAndPLangue2':'containercheckBoxAndPLangue'}>
                                <p>Combiné accélérateur frein</p>
                                <div className={checkCombiné===true?'checkBoxTrueLangue':'checkBoxFalseLangue'} onClick={()=>{ModifSecondCheckBox(checkCombiné,setCheckcombiné,ValiderInclusive,setModifySecondInclusive)}}>
                                    <img src={check} className={checkCombiné===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                         </div>     
                        <input   type='submit' className={ValiderInclusive===false?'buttonValidBoxcase':'buttonValidBoxcase2'}  value={'Valider'} onClick={()=>{InclusiveModif()}}></input>
                        <input   type='submit' className={ValiderInclusive===true && ModifySecondInclusive===false?'buttonValidBoxcaseModif':ValiderInclusive===true && ModifySecondInclusive===true?'buttonValidBoxcaseModif3':'buttonValidBoxcaseModif2'}  value={ModifySecondInclusive===false?'Modification enregistrée':'valider'} onClick={()=>{ModifSecondInclusive()}}></input>
                    </div>

                    <div className='pTEAndLogoMinusPaiement'>
                        <p>Autres Options</p>
                        {MinusOption===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusOption===false?setMinusOption(true):setMinusOption(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusOption===false?setMinusOption(true):setMinusOption(false)}}>-</p></div>}
                    </div>
                    <div className={MinusOption===false?'containerButtonAndBoxcase2':'containerButtonAndBoxcase'}>
                        <div className='containercheckBoxAndP'>
                            <p>Cours avec enseignant</p>
                            <div className={CheckOptionCours===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(CheckOptionCours,setCheckOptionCours,ValiderOptions,setModifySecondOptions)}}>
                                <img src={check} className={CheckOptionCours===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <div className='containercheckBoxAndP'>
                            <p>Déplacement à domicile</p>
                            <div className={CheckOptionDomicile===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(CheckOptionDomicile,setCheckOptionDomicile,ValiderOptions,setModifySecondOptions)}}>
                                <img src={check} className={CheckOptionDomicile===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <div className='containercheckBoxAndP'>
                            <p>Simulateur de conduite</p>
                            <div className={CheckOptionSimulateur===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(CheckOptionSimulateur,setCheckOptionSimulateur,ValiderOptions,setModifySecondOptions)}}>
                                <img src={check} className={CheckOptionSimulateur===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <div className='containercheckBoxAndP'>
                            <p>Véhicule adapté de dashcam</p>
                            <div className={CheckOptionDashcam===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(CheckOptionDashcam,setCheckOptionDashCam,ValiderOptions,setModifySecondOptions)}}>
                                <img src={check} className={CheckOptionDashcam===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>
                        <input   type='submit' className={ValiderOptions===false?'buttonValidBoxcase':'buttonValidBoxcase2'}  value={'Valider'} onClick={()=>{OptionsModif()}}></input>
                        <input   type='submit' className={ValiderOptions===true && ModifySecondOptions===false?'buttonValidBoxcaseModif':ValiderOptions===true && ModifySecondOptions===true?'buttonValidBoxcaseModif3':'buttonValidBoxcaseModif2'}  value={ModifySecondOptions===false?'Modification enregistrée':'valider'} onClick={()=>{ModifSecondOptionsRequest()}}></input>
                    </div>
                    </div>

                    <div className={choice==='médecin'?'displayBlockChoice':'displayNoneblockChoice'}>
                        <div className='pTEAndLogoMinusPaiement'>
                            <p>Langues</p>
                            {MinusOption===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusOption===false?setMinusOption(true):setMinusOption(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusOption===false?setMinusOption(true):setMinusOption(false)}}>-</p></div>}
                        </div>
                        <div className={MinusOption===false?'containerButtonAndBoxcase2':'containerButtonAndBoxcase'}>
                                <div className='containercheckBoxAndP'>
                                    <p>Anglais</p>
                                    <div className={checkAnglais===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(checkAnglais,setCheckAnglais,ValiderInclusive,setModifySecondInclusive)}}>
                                        <img src={check} className={checkAnglais===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <div className='containercheckBoxAndP'>
                                    <p>Espagnol</p>
                                    <div className={checkEspagnol===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(checkEspagnol,setCheckEspagnol,ValiderInclusive,setModifySecondInclusive)}}>
                                        <img src={check} className={checkEspagnol===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <div className='containercheckBoxAndP'>
                                    <p>Allemand</p>
                                    <div className={checkAllemand===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(checkAllemand,setCheckAllemand,ValiderInclusive,setModifySecondInclusive)}}>
                                        <img src={check} className={checkAllemand===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <div className='containercheckBoxAndP'>
                                    <p>Italien</p>
                                    <div className={checkItalien===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(checkItalien,setCheckItalien,ValiderInclusive,setModifySecondInclusive)}}>
                                        <img src={check} className={checkItalien===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <div className='containercheckBoxAndP'>
                                    <p>Portugais</p>
                                    <div className={checkPortugais===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBox(checkPortugais,setCheckPortugais,ValiderInclusive,setModifySecondInclusive)}}>
                                        <img src={check} className={checkPortugais===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <input   type='submit' className={ValiderInclusive===false?'buttonValidBoxcase':'buttonValidBoxcase2'}  value={'Valider'} onClick={()=>{InclusiveModif()}}></input>
                                <input   type='submit' className={ValiderInclusive===true && ModifySecondInclusive===false?'buttonValidBoxcaseModif':ValiderInclusive===true && ModifySecondInclusive===true?'buttonValidBoxcaseModif3':'buttonValidBoxcaseModif2'}  value={ModifySecondInclusive===false?'Modification enregistrée':'valider'} onClick={()=>{ModifSecondInclusive()}}></input>
                            </div>

                            <div className='pTEAndLogoMinusPaiement'>
                                <p>Accessibilité PMR</p>
                                    {MinusAccessibilité===false?<div className='containerMinus'><p className='minus' onClick={()=>{MinusAccessibilité===false?setMinusAccessibilité(true):setMinusAccessibilité(false)}}>+</p></div>:<div className='containerMinus'><p className='minus' onClick={()=>{MinusAccessibilité===false?setMinusAccessibilité(true):setMinusAccessibilité(false)}}>-</p></div>}
                            </div>
                            <div className={MinusAccessibilité===false?'containerButtonAndBoxcase2':'containerButtonAndBoxcase'}>
                                <div className='containercheckBoxAndP'>
                                    <p>Oui</p>
                                    <div className={CheckAccessibilitéYes===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBoxCondition(CheckAccessibilitéYes,setCheckAccéssibilitéYes,ValiderAccessibilité,setModifySecondAccessibilité,setCheckAccéssibilitéNo)}}>
                                        <img src={check} className={CheckAccessibilitéYes===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <div className='containercheckBoxAndP'>
                                    <p>Non</p>
                                    <div className={CheckAccessibilitéNo===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{ModifSecondCheckBoxCondition(CheckAccessibilitéNo,setCheckAccéssibilitéNo,ValiderAccessibilité,setModifySecondAccessibilité,setCheckAccéssibilitéYes)}}>
                                        <img src={check} className={CheckAccessibilitéNo===true?'checkTrue':'checkFalse'}></img>
                                    </div>
                                </div>
                                <input   type='submit' className={ValiderAccessibilité===false?'buttonValidBoxcase':'buttonValidBoxcase2'}  value={'Valider'} onClick={()=>{AccessibiliteModif()}}></input>
                                <input   type='submit' className={ValiderAccessibilité==true && ModifySecondAccessibilité===false?'buttonValidBoxcaseModif':ValiderAccessibilité===true && ModifySecondAccessibilité===true?'buttonValidBoxcaseModif3':'buttonValidBoxcaseModif2'}  value={ModifySecondAccessibilité===false?'Modification enregistrée':'valider'} onClick={()=>{ModifSecondAcce()}}></input>
                            </div>
                        </div>



                    <Link to="/profil"  type='submit' className='buttonRevenirAuprofil' >Revenir à mon profil</Link>
                </div>:console.log("ha ouais") } 
            </main>
        </div>
    )
}

export default Fiche