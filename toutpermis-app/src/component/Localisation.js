import { useEffect,useState,ChangeEvent,useContext,componentDidMount } from 'react'
import axios from 'axios'
import React from 'react'
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {InscriptionContext as getAdresse} from '../utilitaires/InscriptionContext'



const Localisation=()=>{
 const{Adresse,assignAdresse,Lattitude,assignLattitude,Longitude,assignLongitude,IdFiche}=useContext(getAdresse)
 const [isLoaded, setLoaded] = React.useState(false)
 const [Modify,setModify]=useState([])
 var L = window.L;
 let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  });
 

React.useEffect(() => {
  const baliseScript = document.createElement("script")
  baliseScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  baliseScript.crossorigin=""
  baliseScript.addEventListener("load", () => setLoaded(true))
  document.body.appendChild(baliseScript)
  
}, [])

React.useEffect(() => {
  if (isLoaded) {
    console.log(L)
  }
}, [isLoaded])
useEffect(() => {
    var container = L.DomUtil.get("map");
    
    if (container != null) {
    container._leaflet_id = null;
    }   
    console.log("je suis ici")
    
    let accessToken = 'pk.eyJ1IjoiZ2FsbGllMTIiLCJhIjoiY2xsNnFuZHRpMHB0NzNlb3p4ZGpmaXRveSJ9.y0fIA1zRcZ8vZdtjlbYKFw';
    
    var mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
           attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
           tileSize: 512,
           zoomOffset: -1
    });
    if(Longitude !=null && Lattitude !=null)
    {console.log("je passe par là")
      var map = L.map('map')
      .addLayer(mapboxTiles)
      .setView([Lattitude, Longitude], 15);
    
      L.Marker.prototype.options.icon = DefaultIcon;
      var marker = L.marker([Lattitude, Longitude]).addTo(map);
      //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    }
},);

    return(
        <div> 
            <div style={{height:"170px",width:"111%",position:"relative",right:"4%",marginTop:"20px"}} className='mapContainer' id="map"></div>
        </div>       

    )
}

export default Localisation