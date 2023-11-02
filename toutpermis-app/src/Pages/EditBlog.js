import '../css/Fiche.css'
import '../css/Blog.css'
import '../css/InscriptionFinale.css'
import Navbar from '../component/Navbar'
import { useEffect,useState,ChangeEvent,useContext } from 'react'
import {InscriptionContext as getConnectedUser} from '../utilitaires/InscriptionContext'
import axios from 'axios'
import dropArrow from '../images/iconsAwesome/caret-down-solid.svg'
import check from '../images/iconsAwesome/check-solid (1).svg'
import couv from '../images/Rectangle 516.png'

const EditBlog=()=>{
    const [UploadPic,setUploadPic]=useState()
    const [Article,setArticle]=useState(null)
    const [Financement,setFinancement]=useState(false)
    const [voiture,setVoiture]=useState(false)
    const [Moto,setMoto]=useState(false)
    const [Bateau,setBateau]=useState(false)
    const [code,setCode]=useState(false)
    const [Examen,setExamen]=useState(false)
    const [Medecin,setMedecin]=useState(false)
    const [Amenageur,setAmenageur]=useState(false)
    const [Handicap,setHandicap]=useState(false)
    const [ArticleModif,setArticleModif]=useState(null)
   

    const [Actualites,setActualites]=useState(false)
    const [CatégoriesPDC,setCatégoriesPDC]=useState(false)
    const [Pratique,setPratique]=useState(false)
    const [FAQS,setFAQS]=useState(false)
    const [BoiteOutils,setBoiteOutils]=useState(false)
    const [BoiteGants,setBoiteGants]=useState(false)
    const [idModif,setIdModif]=useState(null)

    const [SurTitre,setSurTitre]=useState(null)
    const [Titre,setTitre]=useState(null)
    const [SousTitre,setSousTitre]=useState(null)
    const [Chapo,setChapo]=useState(null)
    const [Texte,setTexte]=useState(null)
        
        const getArticle=(id)=>{
            axios.post(`http://localhost:5000/Blog/test/getONe`,{UniqueId:id})
            .then((res)=>{(setArticle(res.data))
            console.log(res.data)
            }    
            )
            .catch(error => {
                console.log(error);
                });
        }
        const getArticleModif=(id)=>{
            axios.post(`http://localhost:5000/Blog/test/getONe`,{UniqueId:id})
            .then((res)=>{(setArticleModif(res.data))
            console.log(res.data)
            }    
            )
            .catch(error => {
                console.log(error);
                });
        }
       const onSubmit=(e) =>{
            const data = new FormData();
            const ID= Math.random()+Date.now()
            data.append('name','Marie')
            data.append('file',UploadPic)
            data.append('UniqueId',ID)
            data.append('Titre',Titre)
            data.append('SousTitre',SousTitre)
            data.append('Surtitre',SurTitre)
            data.append('Chapo',Chapo)
            data.append('Texte',Texte)
            data.append('Financement',Financement)
            data.append('Voiture',voiture)
            data.append(' Moto',Moto)
            data.append('Bateau',Bateau)
            data.append('code',code)
            data.append('Examen',Examen)
            data.append('Medecin',Medecin)
            data.append('Amenageur',Amenageur)
            data.append('Handicap',Handicap)
            data.append('Actualites',Actualites)
            data.append('CatPermisConduire',CatégoriesPDC)
            data.append('Pratique',Pratique)
            data.append('BoiteOutils',BoiteOutils)
            data.append('BoitesGants',BoiteGants)
            data.append('Faqs',FAQS)
        
            const config = {
                headers: {
                  'content-type': 'multipart/form-data'
                }
            } 
            axios.post("http://localhost:5000/Blog",data,config)
            .then((response)=>{(console.log(response.data))
            getArticle(ID)
            setIdModif(ID)      
            }) 
            .catch(error => {
            console.log(error);
            });
    }
    const modif=()=>{
        const data = new FormData();
        data.append('name','josephine')
        data.append('file',UploadPic)
        data.append('Titre',Titre)
        data.append('SousTitre',SousTitre)
        data.append('Surtitre',SurTitre)
        data.append('Chapo',Chapo)
        data.append('Texte',Texte)
        data.append('Financement',Financement)
        data.append('Voiture',voiture)
        data.append(' Moto',Moto)
        data.append('Bateau',Bateau)
        data.append('code',code)
        data.append('Examen',Examen)
        data.append('Medecin',Medecin)
        data.append('Amenageur',Amenageur)
        data.append('Handicap',Handicap)
        data.append('Actualites',Actualites)
        data.append('CatPermisConduire',CatégoriesPDC)
        data.append('Pratique',Pratique)
        data.append('BoiteOutils',BoiteOutils)
        data.append('BoitesGants',BoiteGants)
        data.append('Faqs',FAQS)
        data.append('pictureName',UploadPic.name)
    
        const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
        } 
        axios.post(`http://localhost:5000/Blog/1695296053385.2866`,data,config)
        .then((response)=>{(console.log(response.data))
        getArticleModif("1695296053385.2866")
      
        }) 
        .catch(error => {
        console.log(error);
        });
    }
    const TestUpload=(e)=>{
        setUploadPic(e.target.files[0])
    }
    useEffect(()=>{
        console.log(UploadPic)
    })
    
    return(
        <div className='Blog'>
            <Navbar/>
            <div className='containerImg'><img src={Article!=null?Article.PicBlogUrl:console.log("non")} className='AperçusImg'></img></div>
            <div className='mainBlog'>
                <input  type="file" id="imageFile" accept="image/*" placeholder='uploadCouv' className='uploadHiddenBlog'  onChange={(e)=>{TestUpload(e)}} multiple></input>
                <input   type='submit' className='buttonUploadBlog' onClick={()=>{onSubmit()}} value={'Valider photo article'}></input>
                <div className='uploadFrontBlog'>Modifier Photo </div>
                <div className='containerFormBlogEdit'>
                    <input type="text" id="name" name="user_name" placeholder='Surtitre' className='inNameFinale'onChange={(e)=>{setSurTitre(e.target.value)}} ></input>
                    <input type="text" id="name" name="user_name" placeholder='Titre' className='inNameFinale' onChange={(e)=>{setTitre(e.target.value)}} ></input>
                    <input type="text" id="name" name="user_name" placeholder='Sous-Titre' className='inNameFinale' onChange={(e)=>{setSousTitre(e.target.value)}}></input>
                    <input type="text" id="name" name="user_name" placeholder="Chapo" className='inNameFinale' onChange={(e)=>{setChapo(e.target.value)}}></input>
                    <textarea type='text' placeholder='Corps de texte' className='inputDescriptif' rows="10" cols="30" id='resetDescriptif' onChange={(e)=>{setTexte(e.target.value)}}></textarea>
                    <input type="number" id="name" name="user_name" placeholder='Liens' className='inNameFinale'></input> 
                    <div className='containerButtonAndBoxcase'>
                        <p className='CatBlogP'>Catégories</p>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Voiture</p>
                                <div className={voiture===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{voiture===false?setVoiture(true):setVoiture(false)}}>
                                    <img src={check} className={voiture===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Financement</p>
                                <div className={Financement===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{Financement===false?setFinancement(true):setFinancement(false)}}>
                                    <img src={check} className={Financement===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Moto</p>
                                <div className={Moto===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{Moto===false?setMoto(true):setMoto(false)}}>
                                    <img src={check} className={Moto===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Bateau</p>
                                <div className={Bateau===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{Bateau===false?setBateau(true):setBateau(false)}}>
                                    <img src={check} className={Bateau===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>code</p>
                                <div className={code===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{code===false?setCode(true):setCode(false)}}>
                                    <img src={check} className={code===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Examen</p>
                                <div className={Examen===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{Examen===false?setExamen(true):setExamen(false)}}>
                                    <img src={check} className={Examen===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Médecin</p>
                                <div className={Medecin===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{Medecin===false?setMedecin(true):setMedecin(false)}}>
                                    <img src={check} className={Medecin===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Amenageur</p>
                                <div className={Amenageur===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{Amenageur===false?setAmenageur(true):setAmenageur(false)}}>
                                    <img src={check} className={Amenageur===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div>
                        <div className='containercheckBoxAndPBlog'>
                            <p>Handicap</p>
                            <div className={Handicap===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{Handicap===false?setHandicap(true):setHandicap(false)}}>
                                <img src={check} className={Handicap===true?'checkTrue':'checkFalse'}></img>
                            </div>
                        </div>             
                    </div>
                    <div className='containerButtonAndBoxcase'>
                        <p className='CatBlogP'>Dossiers</p>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Actualités</p>
                                <div className={Actualites===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{Actualites===false?setActualites(true):setActualites(false)}}>
                                    <img src={check} className={Actualites===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Catégories PDC</p>
                                <div className={CatégoriesPDC===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{CatégoriesPDC===false?setCatégoriesPDC(true):setCatégoriesPDC(false)}}>
                                    <img src={check} className={CatégoriesPDC===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Pratique</p>
                                <div className={Pratique===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{Pratique===false?setPratique(true):setPratique(false)}}>
                                    <img src={check} className={Pratique===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>FAQS</p>
                                <div className={FAQS===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{FAQS===false?setFAQS(true):setFAQS(false)}}>
                                    <img src={check} className={FAQS===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Boite outils</p>
                                <div className={BoiteOutils===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{BoiteOutils===false?setBoiteOutils(true):setBoiteOutils(false)}}>
                                    <img src={check} className={BoiteOutils===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Boite gants</p>
                                <div className={BoiteGants===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{BoiteGants===false?setBoiteGants(true):setBoiteGants(false)}}>
                                    <img src={check} className={BoiteGants===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {idModif!=null?<p>{idModif}</p>:<p>nop</p>}
                    <button  className='buttonFormFinaleBlog' onClick={()=>{modif()}}>Editer</button>
                    <div className='containerImg'><img src={ArticleModif!=null?ArticleModif.PicBlogUrl:console.log("non")} className='AperçusImg'></img></div>
                </div>  
            </div>    
        </div>
    )
}

export default EditBlog