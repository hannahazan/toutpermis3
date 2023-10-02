import SocketIo from 'socket.io-client'
import { useEffect,useState,ChangeEvent,useContext } from 'react'
import {InscriptionContext as getConnectedUser} from '../utilitaires/InscriptionContext'
import Navbar from '../component/Navbar';
import axios from 'axios';
const socket = SocketIo.connect('http://localhost:4000');

const Messagerie=({ socket })=>{
    const{connectedUser}=useContext(getConnectedUser)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [user,setUser]=useState([])
    const [Destinataire,setDestinataire]=useState([])
    const [room,setRoom]=useState("")

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);
    
    useEffect(() => {
        socket.on('newUserResponse', (data) =>setUsers(data),console.log("ha ba ouais je passe par ici"),console.log(users));
      }, [socket]);
    useEffect(()=>{
        console.log(Destinataire)
    })
    
    const handleSendMessage = (e) => {

        axios
        .put(`http://localhost:5000/Users/${connectedUser}`,{Message:{Destinataire:Destinataire,Body:message,uniqueId:Date.now()+Math.random(),Room:room}})
        .then((response)=>{(console.log(response.data))  
            console.log("il est bien dans le message user")
        })
        .catch(error => {
        console.log(error);
        alert("Oops!voyageur sans ticket débarqué!")
        })

        axios
        .put(`http://localhost:5000/Users/${Destinataire}`,{Message:{Emetteur:connectedUser,Body:message,uniqueId:Date.now()+Math.random(),Room:room}})
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
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
          room
        });
      }
      setMessage('');
    };

    //set la Room unique pour l'envoyer dans le tableau message par la suite
    const joinRoom=(hookRoom,hookdesti,desti)=>{

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
                        console.log(NumRoom)
                        hookRoom(NumRoom.toString())
                        console.log("il est rentré dans le else")
                    }
                }          
            }      
        })
        .catch((err) => console.error(err));  
        hookdesti(desti)      
    }
    const disconnect=()=>{
        socket.disconnect()
    }
    const connect=()=>{
        socket.connect()
    }

    return(
        <div>
            <Navbar/>
            <div style={{"margin-top":"140px"}}>
                <p>hello babou</p>
                <input type='text' placeholder="message instant" onChange={(e)=>{setMessage(e.target.value)}}></input>
                <button onClick={()=>{handleSendMessage()}}></button>
                <div className="message__container">
                    {messages.map((message) =>
                    message.name === connectedUser ? (
                        <div  key={message.id}>
                        <p className="sender__name">You</p>
                        <div className="message__sender">
                            <p>{message.text}</p>
                        </div>
                        </div>
                    ) : 
                        <div className="message__chats" key={message.id}>
                        <p>{message.name}</p>
                        <div className="message__recipient">
                            <p>{message.text}</p>
                        </div>
                        </div>
                    )}
                    <h4 className="chat__header">ACTIVE USERS</h4>
                    <div className="chat__users">
                        {users.map((user) => (
                            <div>
                                <p style={{color:'pink'}} key={user.socketID}>{user.userName}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>Amis</div>
                <input type='submit'  value="uncoeur@hotmail.fr"  onClick={(e)=>{joinRoom(setRoom,setDestinataire,e.target.value)}}></input>
                <input type='submit'  value="kfgzhxbeafj@hotmail.fr"  onClick={(e)=>{joinRoom(setRoom,setDestinataire,e.target.value)}}></input>
                <input type='submit'  value="njnvuorebug@hotmail.fr"  onClick={(e)=>{joinRoom(setRoom,setDestinataire,e.target.value)}}></input>
                <input type='submit' value="déconnecter" onClick={()=>{disconnect()}}></input>
                <input type='submit' value="se connecter" onClick={()=>{connect()}}></input>   
            </div>
        </div>
    )
}

export default Messagerie