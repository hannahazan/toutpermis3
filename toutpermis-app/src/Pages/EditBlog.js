import '../css/Fiche.css'
import '../css/Blog.css'
import '../css/InscriptionFinale.css'
import Navbar from '../component/Navbar'
import { useEffect,useState,ChangeEvent,useContext } from 'react'
import {InscriptionContext as getConnectedUser} from '../utilitaires/InscriptionContext'
import axios from 'axios'
import { set } from 'mongoose'
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
    
       const onSubmit=(e) =>{
            const data = new FormData();
            const ID= Math.random()+Date.now()
            data.append('name','josephine')
            data.append('file',UploadPic)
            data.append('UniqueId',ID)
        
            const config = {
                headers: {
                  'content-type': 'multipart/form-data'
                }
            } 
            axios.post("http://localhost:5000/Blog",data,config)
            .then((response)=>{(console.log(response.data))
            getArticle(ID)      
            }) 
            .catch(error => {
            console.log(error);
            });
    }

    return(
        <div className='Blog'>
            <Navbar/>
            <div className='containerImg'><img src={Article!=null?Article.PicBlogUrl:console.log("non")} className='AperçusImg'></img></div>
            <div className='mainBlog'>
                <input  type="file" id="imageFile" accept="image/*" placeholder='uploadCouv' className='uploadHiddenBlog'  onChange={(e)=>{setUploadPic(e.target.files[0])}} multiple></input>
                <input   type='submit' className='buttonUploadBlog' onClick={()=>{onSubmit()}} value={'Valider photo article'}></input>
                <div className='uploadFrontBlog'>Modifier Photo </div>
                <div className='containerFormBlogEdit'>
                    <input type="text" id="name" name="user_name" placeholder='Surtitre' className='inNameFinale' ></input>
                    <input type="text" id="name" name="user_name" placeholder='Titre' className='inNameFinale' ></input>
                    <input type="text" id="name" name="user_name" placeholder='Sous-Titre' className='inNameFinale'></input>
                    <input type="text" id="name" name="user_name" placeholder="Chapo" className='inNameFinale'></input>
                    <textarea type='text' placeholder='Corps de texte' className='inputDescriptif' rows="10" cols="30" id='resetDescriptif'></textarea>
                    <input type="number" id="name" name="user_name" placeholder='Liens' className='inNameFinale'></input> 
                    <div className='containerButtonAndBoxcase'>
                        <p className='CatBlogP'>Catégories</p>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Voiture</p>
                                <div className={voiture===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{}}>
                                    <img src={check} className={voiture===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Financement</p>
                                <div className={Financement===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{}}>
                                    <img src={check} className={Financement===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Moto</p>
                                <div className={Moto===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{}}>
                                    <img src={check} className={Moto===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Bateau</p>
                                <div className={Bateau===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{}}>
                                    <img src={check} className={Bateau===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>code</p>
                                <div className={code===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{}}>
                                    <img src={check} className={code===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Examen</p>
                                <div className={Examen===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{}}>
                                    <img src={check} className={Examen===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div>
                        <div className='containerDoubleCat'>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Médecin</p>
                                <div className={Medecin===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{}}>
                                    <img src={check} className={Medecin===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                            <div className='containercheckBoxAndPBlog'>
                                <p>Amenageur</p>
                                <div className={Amenageur===true?'checkBoxTrue':'checkBoxFalse'} onClick={()=>{}}>
                                    <img src={check} className={Amenageur===true?'checkTrue':'checkFalse'}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button  className='buttonFormFinale' onClick={onSubmit}>Editer</button>
                </div>
            </div>    
        </div>
    )
}

export default EditBlog