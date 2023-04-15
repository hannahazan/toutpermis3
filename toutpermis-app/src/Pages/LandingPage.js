import '../css/LandingPage.css';
import '../css/Navbar.css'
import Burger from '../images/iconsAwesome/bars-solid.svg'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import carCard from'../images/iconsAwesome/car-rear-solid.svg'
import stetoCard from '../images/iconsAwesome/stethoscope-solid.svg'
import listcheckCard from '../images/iconsAwesome/list-check-solid.svg'
import arrow from '../images/iconsAwesome/arrow-right-solid.svg'
import ship from '../images/iconsAwesome/ship-solid.svg'
import moto from '../images/iconsAwesome/motorcycle-solid.svg'
import localicon from '../images/iconsAwesome/location-dot-solid (1).svg'
import imgCard from '../images/CardImage/Rectangle 508.png'
import ellipseTop from '../images/Ellipse 18.png'
import ombreSuperGirl from '../images/Ombrejambe-removebg-preview.png'
import ombreGolgoth from '../images/OmbreIinvsible-removebg-preview.png'
import ombreAgée from '../images/Ombreagée-removebg-preview.png'
import heros from '../images/CODEO_016_002-removebg-preview.png'
import Navbar from '../component/Navbar';
import { useState,useEffect } from 'react';




function LandingPage() {

  const [Open,setOpen]=useState(false)

  return (
    <div className="App">
      <Navbar />
     <main>
        <div className='paraTrouve2'>
        <p className="ligne7">Trouve le</p>
            <p className="ligne8">professionnel du </p>
            <div className='ligne9et10'>
              <p className='ligne9'>permis</p>
              <p className='ligne10'>adapté à</p>
            </div>
            <p className="ligne11">à tes besoins </p>
        </div>
        <div className="secondPara2">
          <p className='ligne12'>Besoin d'un aménagement particulier ?</p> 
          <p className='ligne13'>d'une formation spécifique ? Toutpermis.fr</p> 
          <p className='ligne14'>t'accompagne!</p> 
        </div>
        <div className="cardLocalAndCardPro">
          <div className="cardPro">
            <div className="containerIconLien">
                <div className="icon">
                  <img src={carCard} className="carCard"></img>
                </div>
                <p className='pIconLien'>Ecole de conduite</p>
                <img src={arrow} className='arrow'></img>
            </div>
            <div className="containerIconLien">
                <div className="icon2">
                  <img src={stetoCard} className="stetoCard"></img>
                </div>
                <p className='pIconLien'>Médecin agréé permis</p>
                <img src={arrow} className='arrow2'></img>
            </div>
            <div className="containerIconLien">
                <div className="icon3">
                  <img src={listcheckCard} className="listcheckCard"></img>
                </div>
                <p className='pIconLien'>Tests psychotechniques</p>
                <img src={arrow} className='arrow3'></img>
            </div>
          </div>
          <div className="cardLocale">
             <div className='containerTousPro'>
                <p className='pPro'>Voir tous les types de pros</p>
                <img src={arrow} className='arrowPlus'></img>
             </div>
             <div className="containerIconMap">
                <img src={ship} className='laCroisièreSamuse'></img>
             </div>
             <div className="containerIconMap2">
                <img src={moto} className='tonnerreMechanique'></img>
             </div>
             <div className="containerIconMap3">
                <img src={carCard} className='K2000'></img>
             </div>
             <div className="containerIconMap4">
                <img src={stetoCard} className='Urgence'></img>
             </div>
             <div className="containerIconMap5">
                <img src={listcheckCard} className='toDoListe'></img>
             </div>
          </div>
        </div>
        <div className='marcheSection2'>
          <p className='titreMarcheSection2'>Comment ça marche ?</p>
          <div className='stepPara2'>
            <p className='step1'>1</p>
            <div className='containerStep2'>
              <img src={ombreSuperGirl} className='ombreSuperGirl'></img>
            </div>
            <div>
              <p className='para12'>Sélectionne le professionnel qui t'intéresse </p>
            </div>
          </div>
          <div className='stepPara2'>
            <p className='pSituation'>Applique les filtres adpatés à ta situation</p>
            <p className='step2'>2</p>
            <div className='containerStep2'>
              <img src={ombreAgée} className='ombreAgée'></img>
            </div>
          </div>
          <div className='stepPara3'>
            <p className='step3'>3</p>
            <div className='containerStep2'>
              <img src={ombreGolgoth} className='ombreGolgoth'></img>
            </div>
            <p className='pRésultats'>Fais ton choix parmis les résultats</p>
          </div>
        </div>

        <h2 className='titreSug'>Nos suggestions</h2>
        <div className='nosSugestionsContainer'>
          <div className="cardSugestions">
            <p className="p1">Formateur</p>
            <div className='localisation'>
                <img src={localicon} className='iconLocal'></img>
                <p className='p2'>Tours</p>
            </div>
          </div>
          <div className="cardSugestions">
            <p className="p1">Médecin agrée</p>
            <div className='localisation'>
                <img src={localicon}   className='iconLocal'></img>
                <p className='p2'>Paris</p>
            </div>
          </div>
          <div className="cardSugestions">
            <p className="p1">Auto-école</p>
            <div className='localisation'>
                <img src={localicon}   className='iconLocal'></img>
                <p className='p2'>Nantes</p>
            </div>
          </div>
        </div>
        <div className="sectionNosArticles">
          <h2 className='titreBlog'>Je m'informe</h2>
          <div className="containerElemBlog">
            <div className="dateContenu">
              <div className="date">
                  <p className='pdates'>Financement</p>
              </div>
              <p className='pcontent'>Financer son permis avec le CPF c’est possible !</p>
            </div>
            <div className='imgBlogContainer'>
              <img src={imgCard} className='imgBlog' ></img>
            </div>
          </div>
          <div className="containerElemBlog">
            <div className="dateContenu">
              <div className="date">
                  <p className='pdates'>Insolite</p>
              </div>
              <p className='pcontent'>Top 10 des auto-écoles les plus insolites</p>
            </div>
            <div className='imgBlogContainer'>
              <img src={imgCard} className='imgBlog' ></img>
            </div>
          </div>
        </div>
        <div className='containerFormulaire'>
        <img src={ellipseTop} className='ellipseTop'></img>
          <div className='containerParaForm'>
            <h1 className='pQuestion'>Une question?</h1>
            <p className='pSuggestions'>Des suggestions d'améliorations ?</p>
          </div>
          <form  method='post' className='FormContainer'>
              <input type="text" id="name" name="user_name" placeholder='Nom' className='inName'></input>
              <input type="email" id="mail" name="user_mail" placeholder='E-mail' className='inMail'></input>
              <textarea id="msg" name="user_message" placeholder='Message' className='areaMessage'></textarea>
              <button className='buttonForm'>Envoyer <img src={arrow} className='formArrow'></img></button>
          </form>
        </div>
     </main>
    </div>
  );
}

export default LandingPage;
