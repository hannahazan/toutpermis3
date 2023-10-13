import "../css/ContactMessagerie.css"
import '../css/Profil.css'
import SocketIo from 'socket.io-client'
import arrow from '../images/iconsAwesome/arrow-right-solid.svg'
import Loupe from '../images/iconsAwesome/magnifying-glass-solid.svg'
import Plane from '../images/iconsAwesome/paper-plane-solid.svg'
import Pen from '../images/iconsAwesome/pen-solid.svg'
import localLogo from '../images/toutpermisLogoVidepng.png'
import cross from '../images/iconsAwesome/xmark-solid (1).svg'
import { useEffect,useState,ChangeEvent,useContext } from 'react'
import {InscriptionContext as getConnectedUser} from '../utilitaires/InscriptionContext'
import Navbar from '../component/Navbar';
import axios from 'axios';
const socket = SocketIo.connect('http://localhost:4000');

const ContactMessagerie=({socket})=>{
    const{connectedUser}=useContext(getConnectedUser)

    const [contacts,setContacts]=useState([])
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [user,setUser]=useState([])
    const [Destinataire,setDestinataire]=useState([])
    const [NomEmetteur,setNomEmetteur]=useState("")
    const [room,setRoom]=useState("")
    const [ConvOn,setConvOn]=useState(false)
    const [NickName,setNickName]=useState("")
    const [Conv,setConv]=useState([])
    const [lastMessage,setLastMessage]=useState()
    const [MapConv,setMapConv]=useState(false)
    const [WriteON,setWriteOn]=useState(false)
    const [ChangeHeigthConv,setChangeHeigthConv]=useState(false)
    const [DisplayFooter,setDisplayFooter]=useState(false)

    //logique notification de message
    const [messageNonlu,setMessageNonLu]=useState(false)
    const [MessageNotLuEmmeteur,setMessageNotLuEmmeteur]=useState("")
    const [Nom,setNom]=useState("")
    const [pro,setPro]=useState("")
   
    let NotificationArray=[]
    const ScrollEnding=(heigth)=>{
    window.scroll(0,heigth)
    console.log (window.scrollY)
}
    
    const getContact=()=>{
        axios
        .get(`http://localhost:5000/MessUtil/6528398bd2efed6f6387edc4`)
        .then((res)=>{setContacts(res.data.ListeContacts)
            console.log(res.data.ListeContacts)})
        .catch((err) => console.error(err));
    }
   
    const getConv=()=>{
        axios
        .get(`http://localhost:5000/Users/${connectedUser}`)
        .then((res)=>{setConv(res.data.Message)
        setNomEmetteur(res.data.Prenom)
        setMapConv(true)
          
        })
        .catch((err) => console.error(err));
    }
    
    useEffect(() => {
        //socket.on('messageResponse', (data) => setMessages([...messages,data]));
        socket.on('messageResponse',(data)=>{
            console.log(`${data.destinataire} c'est la response emit de la socket`)
            let destRef=data.destinataire
            axios
        .get(`http://localhost:5000/Users/${connectedUser}`)
        .then((res)=>{setConv(res.data.Message)
        console.log(`${destRef} destinataire de ref`)
        setNomEmetteur(res.data.Prenom)
        setMapConv(true)
        console.log("je suis bien rentrée dans le fetch de la socket")
        setTimeout(() => {
            let clientHeightConv = document.getElementById('ConvId').clientHeight
            console.log(`${clientHeightConv} c'est la hauteur de la conv dans le get`)
            ScrollEnding(clientHeightConv)
            if(clientHeightConv>=window.innerHeight-150){
                setDisplayFooter(true)
                setWriteOn(true)
                setChangeHeigthConv(true)
                console.log("ha ouais leng")
              }
              else{
                console.log("tout va bien")
              }
        }, 200);
        })
        .catch((err) => console.error(err));
        })
        
    }, [socket,messages]);
    useEffect(()=>{
        socket.on('NoteMessageReçus',(data)=>{
            console.log(`${data.emmeteur} j'emet bien à tout le monde sauf moi`)
            console.log(`${data.destinataire} j'emet bien à tout le monde sauf moi`)
            console.log(`${data.prenom} j'emet bien à tout le monde sauf moi`)
            console.log(`${data.nom} j'emet bien à tout le monde sauf moi`)
            console.log(`${data.pro} j'emet bien à tout le monde sauf moi`)
            let ContactNotif={
                emmeteur:data.emmeteur,
                prenom:data.prenom,
                nom:data.nom,
                pro:data.pro,
                nonLu:1
            }
            console.log(`${ContactNotif} c'est la classe`)
                 
            if(data.destinataire===connectedUser){
                console.log('oui c\'est moi le destinataire')
                setMessageNonLu(true)
                setMessageNotLuEmmeteur(data.emmeteur)
                console.log(`${contacts.length} c'est la taille des contacts`)
                 /*axios
                .get(`http://localhost:5000/MessUtil/6528398bd2efed6f6387edc4`)
                .then((res)=>{setContacts(res.data.ListeContacts)
                    console.log(`${res.data.ListeContacts} la data listecontacts pour le nouveau tableau`)
                    /*for(let i=0;i<=res.data.ListeContacts.length;i++){
                        console.log("je rentre bien dans la boucle tableau")
                        if(res.data.ListeContacts[i].Utilisateur===data.emmeteur){
                            NotificationArray.push(res.data.ListeContacts[i])
                            console.log(`${NotificationArray[i].Prenom} dans la boucle le tableau`)
                        }
                        
                    }
                
                })
                .catch((err) => console.error(err)); */
                console.log("get dans le tableau/boucle")
            }
        })
    },[socket])
    useEffect(() => {
        socket.on('newUserResponse', (data) =>setUsers(data),console.log("ha ba ouais je passe par ici"),console.log(users));
      }, [socket]);
    useEffect(()=>{
        getContact()
    },[])
    useEffect(()=>{
        console.log(Destinataire)
        console.log(NickName)
        console.log(`${lastMessage} le dernier message`)
        console.log(ConvOn)
        console.log(`${ChangeHeigthConv} c'est la variable pour changer la taille`)
    })

    const handleSendMessage = (e) => {
        let TimeStamp=Date.now()
        axios
        .put(`http://localhost:5000/Users/${connectedUser}`,{Message:{Destinataire:Destinataire,Body:message,uniqueId:Date.now()+Math.random(),Room:room,TimeStamp:TimeStamp}})
        .then((response)=>{(console.log(response.data))  
            console.log("il est bien dans le message user")
           getConv()
        })
        .catch(error => {
        console.log(error);
        alert("Oops!voyageur sans ticket débarqué!")
        })

        axios
        .put(`http://localhost:5000/Users/${Destinataire}`,{Message:{Emetteur:connectedUser,Body:message,uniqueId:Date.now()+Math.random(),Room:room,TimeStamp:TimeStamp,Lu:false}})
        .then((response)=>{(console.log(response.data))  
            console.log("il est bien dans le message user")
        })
        .catch(error => {
        console.log(error);
        alert("Oops!voyageur sans ticket débarqué!")
        })
      socket.emit('NoteMessageReçus',{
            emmeteur:connectedUser,
            destinataire:Destinataire,
            prenom:NickName,
            nom:Nom,
            pro:pro
      })
      /*if(room!==""){
        socket.emit("join_room",room)
      }*/
      if (message.trim()){
        socket.emit('message', {
          text: message,
          name:connectedUser,
          nickName:NomEmetteur,
          destinataire:Destinataire,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
          room,
          TimeStamp:TimeStamp
        });
      }
      setMessage('');
      setLastMessage(TimeStamp)
      setMapConv(false)
      if(WriteON===true){
        setDisplayFooter(true)
      }
      setTimeout(() => {
        let clientHeightConv = document.getElementById('ConvId').clientHeight
        console.log(`${clientHeightConv} c'est la hauteur de la conv dans le get`)
        ScrollEnding(clientHeightConv)
        if(clientHeightConv>=window.innerHeight-150){
            setDisplayFooter(true)
            setWriteOn(true)
            setChangeHeigthConv(true)
            console.log("ha ouais leng")
          }
          else{
            console.log("tout va bien")
          }
         
    }, 200);
     
    };

     //set la Room unique pour l'envoyer dans le tableau message par la suite
     const joinRoom=(hookRoom,hookdesti,desti,hookNickName,NickName,hookName,Name,hookPro,Pro)=>{

        //on récupère le tableau message du user et on check plusieurs conditions:
        //que le tableau contient des données
        //si oui on compare la donnée destinataire avec le destinaire sur lequel on a cliqué
        //si ça concorde on set la room avec la data room du tableau
        //sinon on en crée une nouvelle.
        axios
        .get(`http://localhost:5000/Users/${connectedUser}`)
        .then((res)=>{
            setUser(res.data)
            console.log(res.data.Message)
            if(res.data.Message.length==0){
                let NumRoom=Math.random()*Math.random()+Date.now() 
                let StringRoom=NumRoom.toString()
                hookRoom(StringRoom)
                //hookRoom(NumRoom.toString())
                socket.emit("join_room",StringRoom)
                    console.log("je suis dans la condition 0")
                    
            }
            else{
                for(let i=0;i<res.data.Message.length;i++){
                    console.log("je rentre dans la boucle")
                    if( res.data.Message[i].Destinataire===desti || res.data.Message[i].Emetteur===desti){
                        hookRoom(res.data.Message[i].Room)
                        socket.emit("join_room",res.data.Message[i].Room)
                        console.log("je suis là dans la condition 2 de la joinroom")
                        break
                    }
                   else{
                        let NumRoom=Math.random()*Math.random()+Date.now()
                        let StringRoom=NumRoom.toString()
                        //console.log(textRoom) 
                        //console.log(NumRoom)
                        //hookRoom(NumRoom.toString())
                        hookRoom(StringRoom)
                        console.log("il est rentré dans le else")
                        socket.emit("join_room",StringRoom)
                
                    }
                }          
            }      
        })
        .catch((err) => console.error(err));  
        hookdesti(desti)
        setConvOn(true) 
        hookNickName(NickName)
        hookName(Name)
        hookPro(Pro)
        getConv()
       //Scroll automatique à la fin de la conversation et changement de classe pour la conv si jamais sa hauteur => window.hauteur-150px
       //le setTimeout permet de récupérer la taille de la conv lorsqu'elle est déjà chargée
       setTimeout(() => {
            let clientHeightConv = document.getElementById('ConvId').clientHeight
            console.log(`${clientHeightConv} c'est la hauteur de la conv dans le get`)
            ScrollEnding(clientHeightConv)
            if(clientHeightConv>=window.innerHeight-150){
                setDisplayFooter(true)
                setWriteOn(true)
                setChangeHeigthConv(true)
                console.log("ha ouais leng")
              }
              else{
                console.log("tout va bien")
              }
             
        }, 200);
       
    }
    const WriteMessage=()=>{
        if(DisplayFooter===true){
            setDisplayFooter(false)
        }
        else{
            setDisplayFooter(true)
        }
       
    }
    const goBackToContact=()=>{
        setConvOn(false)
        setWriteOn(false)
        setChangeHeigthConv(false)
        setDisplayFooter(false)
        ScrollEnding(0,0)
    }

    return(
        <div className="Messagerie">
            {ConvOn===false?<Navbar/>:<div className="containerArrowPMessagerie">
                <img src={arrow} className="ArrowMessagerie" onClick={()=>{goBackToContact()}}></img>
                <div className="NomPrenomConvMess">{NickName}</div>
                <div  className={WriteON===true?'buttonWriteMessage':'buttonDisplayFooterNone'}  onClick={()=>{WriteMessage()}}><img src={Pen}  className={DisplayFooter===true?"PenWriteDisplay":"PenWriteDisplayNone"}></img><img src={cross}  className={DisplayFooter===false?"CrossWriteDisplay":"PenWriteDisplayNone"}></img></div>
                </div>}
            <div  className={ConvOn===false && messageNonlu===true?"containerContactMap":"containerContactMapNone"}>
                {contacts.map((contact)=>
                contact.Utilisateur!= connectedUser && contact.Utilisateur===MessageNotLuEmmeteur?
                   <div className="ContactList"  onClick={()=>{joinRoom(setRoom,setDestinataire,contact.Utilisateur,setNickName,contact.Prenom,setNom,contact.Nom,setPro,contact.Pro)}}>
                        <div className="pictoLogoEspaceProMessagerie">
                            <img src={localLogo} className='localLogoPictoMessagerie'></img>
                            <div className='ContainerInitialesMessagerie'><p className='InitialesMess'>{contact.Initiales}</p></div>  
                        </div>
                        <div className="NomPreProMessagerie">
                            <p className="NomPrenomMess">{contact.Prenom} {contact.Nom}</p>
                            {contact.Pro==="voiture"?<p className="ProMess">Ecole de conduite</p>:contact.Pro==="médecin"?<p className="ProMess">Médecin</p>:<p className="ProMess">Aménageur de véhicule</p>}
                       </div>
                       <p className={messageNonlu===true && MessageNotLuEmmeteur===contact.Utilisateur?"displayNoteMessage":"displayNoneNoteMessage"}>message</p>
                    </div>:console.log("ba non")
                )}
                </div>
            <div  className={ConvOn===false?"containerContactMap":"containerContactMapNone"}>
                {contacts.map((contact)=>
                contact.Utilisateur!= connectedUser && contact.Utilisateur!=MessageNotLuEmmeteur?
                   <div className="ContactList"  onClick={()=>{joinRoom(setRoom,setDestinataire,contact.Utilisateur,setNickName,contact.Prenom,setNom,contact.Nom,setPro,contact.Pro)}}>
                        <div className="pictoLogoEspaceProMessagerie">
                            <img src={localLogo} className='localLogoPictoMessagerie'></img>
                            <div className='ContainerInitialesMessagerie'><p className='InitialesMess'>{contact.Initiales}</p></div>  
                        </div>
                        <div className="NomPreProMessagerie">
                            <p className="NomPrenomMess">{contact.Prenom} {contact.Nom}</p>
                            {contact.Pro==="voiture"?<p className="ProMess">Ecole de conduite</p>:contact.Pro==="médecin"?<p className="ProMess">Médecin</p>:<p className="ProMess">Aménageur de véhicule</p>}
                       </div>
                       <p className={messageNonlu===true && MessageNotLuEmmeteur===contact.Utilisateur?"displayNoteMessage":"displayNoneNoteMessage"}>message</p>
                    </div>:console.log("ba non")
                )}
            </div>

            <div className={ConvOn===true && Conv.length !=0 && ChangeHeigthConv===false?"containerConv":ConvOn===true && Conv.length !=0 && ChangeHeigthConv===true?"containerConvHeigth":"messageContainerNone"} id="ConvId">
                    {Conv.map((conversation) =>
                    conversation.Destinataire === Destinataire? (
                        <div className="containerMessageSender" >
                            <div className="message__sender">
                                <p className="sender__name">You </p>
                                <p>{conversation.Body}</p>
                            </div>
                        </div>
                    ) : conversation.Emetteur===Destinataire?
                        <div className="message__chats"> 
                            <div className="message__recipient">
                                <p>{conversation.Emetteur}</p>
                                <p>{conversation.Body}</p>
                            </div>
                        </div>
                        :console.log("nop pas la bonne personne")
                    )}
             </div>

             
             {/*<div className={ConvOn===true && Conv.length==0 && MapConv===false?"message__container":ConvOn===true && Conv.length!=0 && MapConv===false?"message__container2":"messageContainerNone"}>
                        {messages.map((message) =>
                        message.name === connectedUser && message.room===room  ? (
                            <div className="containerMessageSender" key={message.id}>
                                <div className="message__sender">
                                    <p className="sender__name">You from socket</p>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ) :message.room===room? 
                            <div className="message__chats" key={message.id}> 
                                <div className="message__recipient">
                                    <p>{message.nickName}</p>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                            :console.log("nop on en veut pas")
                        )}
                </div>*/}
               
            <footer className={DisplayFooter===false?"FooterMessagerie":"FooterMessagerieNone"}>
                    {ConvOn===false?<div className="containerLoupeInputMessagerieFooter">
                        <img src={Loupe} className="LoupeMessagerieFooter"></img>
                        <input type="text"  placeholder='Rechercher pro' className='inNameFinaleMessagerieFooter'></input>
                    </div>:
                    <div className= "containerLoupeInputMessagerieFooter">
                        <textarea type="area" placeholder="Ecrire réponse" className='inNameFinaleMessagerieFooterTextArea' col="80" rows="1" onChange={(e)=>{setMessage(e.target.value)}}></textarea>
                        <div  className='buttonValidMessageriConv'  onClick={()=>{handleSendMessage()}}><img src={Plane}  className="planeMessagerieFooter"></img></div>
                    </div> 
                    }
            </footer>
        </div>
    )
}

export default ContactMessagerie