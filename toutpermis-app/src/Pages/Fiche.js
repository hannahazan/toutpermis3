import '../css/Fiche.css'
import Navbar from '../component/Navbar'
import { useEffect,useState } from 'react'
import { set } from 'mongoose'


const Fiche=()=>{
    const [NumberEcole,setNumberEcole]=useState(Number)
    const [ecoleNumberArray,setEcoleNumberArray]=useState([])
    let arrayTest=[]
    let stringtest="hello"

   function display(){
        <p>{ecoleNumberArray}hello</p>
   }
   
    useEffect(()=>{
        console.log(NumberEcole)
        console.log(ecoleNumberArray)
        for(let i=1;i<=NumberEcole;i++){
          arrayTest.push(` EC ${i}`)
        }
        setEcoleNumberArray(arrayTest)    
    },[NumberEcole])
    const getValue=(e)=>{
        setNumberEcole(e.target.value)
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
                        {ecoleNumberArray.map(event=>
                            <p className='OngletP'>{event}</p>)} 
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Fiche