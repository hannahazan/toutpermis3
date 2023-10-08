import "../css/ContactMessagerie.css"
import '../css/Profil.css'
import SocketIo from 'socket.io-client'
import arrow from '../images/iconsAwesome/arrow-right-solid.svg'
import Loupe from '../images/iconsAwesome/magnifying-glass-solid.svg'
import Plane from '../images/iconsAwesome/paper-plane-solid.svg'
import Pen from '../images/iconsAwesome/pen-solid.svg'
import localLogo from '../images/toutpermisLogoVidepng.png'
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
    const getContact=()=>{
        axios
        .get(`http://localhost:5000/MessUtil`)
        .then((res)=>{setContacts(res.data)
            console.log(res.data)})
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
        socket.on('messageResponse',()=>{
            axios
        .get(`http://localhost:5000/Users/${connectedUser}`)
        .then((res)=>{setConv(res.data.Message)
        setNomEmetteur(res.data.Prenom)
        setMapConv(true)
        console.log("je suis bien rentrée dans le fetch de la socket")
        })
        .catch((err) => console.error(err));
        })
    }, [socket, Conv]);
    
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
        .put(`http://localhost:5000/Users/${Destinataire}`,{Message:{Emetteur:connectedUser,Body:message,uniqueId:Date.now()+Math.random(),Room:room,TimeStamp:TimeStamp}})
        .then((response)=>{(console.log(response.data))  
            console.log("il est bien dans le message user")
        })
        .catch(error => {
        console.log(error);
        alert("Oops!voyageur sans ticket débarqué!")
        })

      if(room!==""){
        socket.emit("join_room",room)
      }
      if (message.trim()){
        socket.emit('message', {
          text: message,
          name:connectedUser,
          nickName:NomEmetteur,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
          room,
          TimeStamp:TimeStamp
        });
      }
      setMessage('');
      setLastMessage(TimeStamp)
      setMapConv(false)
      setWriteOn(false)
    };

     //set la Room unique pour l'envoyer dans le tableau message par la suite
     const joinRoom=(hookRoom,hookdesti,desti,hookNickName,NickName)=>{

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
                    console.log(NumRoom)
                    hookRoom(NumRoom.toString())
                    console.log("je suis dans la condition 0")
                    
            }
            else{
                for(let i=0;i<res.data.Message.length;i++){
                    console.log("je rentre dans la boucle")
                    if( res.data.Message[i].Destinataire===desti || res.data.Message[i].Emetteur===desti){
                        hookRoom(res.data.Message[i].Room)
                        console.log("je suis là")
                        break
                    }
                   else{
                        let NumRoom=Math.random()*Math.random()+Date.now()
                        let textRoom=NumRoom.toString()
                        console.log(textRoom) 
                        console.log(NumRoom)
                        hookRoom(NumRoom.toString())
                        console.log("il est rentré dans le else")
                    }
                }          
            }      
        })
        .catch((err) => console.error(err));  
        hookdesti(desti)
        setConvOn(true) 
        hookNickName(NickName)
        getConv() 
       
    }
    const WriteMessage=()=>{
        setWriteOn(true)
    }
    const goBackToContact=()=>{
        setConvOn(false)
        setWriteOn(false)
    }
    return(
        <div className="Messagerie">
            {ConvOn===false?<Navbar/>:<div className="containerArrowPMessagerie">
                <img src={arrow} className="ArrowMessagerie" onClick={()=>{goBackToContact()}}></img>
                <div className="NomPrenomConvMess">{NickName}</div>
                </div>}
            <div  className={ConvOn===false?"containerContactMap":"containerContactMapNone"}>
                {contacts.map((contact)=>
                contact.ListeUtil.Utilisateur!= connectedUser?
                   ( <div className="ContactList"  onClick={()=>{joinRoom(setRoom,setDestinataire,contact.ListeUtil.Utilisateur,setNickName,contact.ListeUtil.Prenom)}}>
                        <div className="pictoLogoEspaceProMessagerie">
                            <img src={localLogo} className='localLogoPictoMessagerie'></img>
                            <div className='ContainerInitialesMessagerie'><p className='InitialesMess'>{contact.ListeUtil.Initiales}</p></div>  
                        </div>
                        <div className="NomPreProMessagerie">
                            <p className="NomPrenomMess">{contact.ListeUtil.Prenom} {contact.ListeUtil.Nom}</p>
                            {contact.ListeUtil.Pro==="voiture"?<p className="ProMess">Ecole de conduite</p>:contact.ListeUtil.Pro==="médecin"?<p className="ProMess">Médecin</p>:<p className="ProMess">Aménageur de véhicule</p>}
                       </div>
                    </div>):console.log("hello")
                )}
            </div>

            <div className={ConvOn===true && Conv.length !=0?"containerConv":"messageContainerNone"}>
                    {Conv.map((conversation) =>
                    conversation.Destinataire === Destinataire? (
                        <div className="containerMessageSender" >
                            <div className="message__sender">
                                <p className="sender__name">You</p>
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

             
                <div className={ConvOn===true && Conv.length==0 && MapConv===false?"message__container":ConvOn===true && Conv.length!=0 && MapConv===false?"message__container2":"messageContainerNone"}>
                        {messages.map((message) =>
                        message.name === connectedUser && message.room===room ? (
                            <div className="containerMessageSender" key={message.id}>
                                <div className="message__sender">
                                    <p className="sender__name">You</p>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ) :message.room===room ? 
                            <div className="message__chats" key={message.id}> 
                                <div className="message__recipient">
                                    <p>{message.nickName}</p>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                            :console.log("nop on en veut pas")
                        )}
                </div>
               
            

            {WriteON===false && ConvOn===true?<div  className='buttonWriteMessage'  onClick={()=>{WriteMessage()}}><img src={Pen}  className="planeMessagerieFooter"></img></div>
            :<footer className="FooterMessagerie">
                    {ConvOn===false?<div className="containerLoupeInputMessagerieFooter">
                        <img src={Loupe} className="LoupeMessagerieFooter"></img>
                        <input type="text"  placeholder='Rechercher pro' className='inNameFinaleMessagerieFooter'></input>
                    </div>:
                    <div className= "containerLoupeInputMessagerieFooter">
                        <textarea type="area" placeholder="Ecrire réponse" className='inNameFinaleMessagerieFooterTextArea' col="80" rows="1" onChange={(e)=>{setMessage(e.target.value)}}></textarea>
                        <div  className='buttonValidMessageriConv'  onClick={()=>{handleSendMessage()}}><img src={Plane}  className="planeMessagerieFooter"></img></div>
                    </div> 
                    }
            </footer>}
        </div>
    )
}

export default ContactMessagerie