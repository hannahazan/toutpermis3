import SocketIo from 'socket.io-client'
import { useEffect,useState,ChangeEvent,useContext } from 'react'
import {InscriptionContext as getConnectedUser} from '../utilitaires/InscriptionContext'
import Navbar from '../component/Navbar';
const socket = SocketIo.connect('http://localhost:4000');

const Messagerie=({ socket })=>{
    const{connectedUser}=useContext(getConnectedUser)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [Destinataire,setDestinataire]=useState(null)

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);
    
    useEffect(() => {
        socket.on('newUserResponse', (data) =>setUsers(data),console.log("ha ba ouais je passe par ici"),console.log(users));
      }, [socket, users]);
    useEffect(()=>{
        console.log(Destinataire)
    })
    
    const handleSendMessage = (e) => {
      if (message.trim()){
        socket.emit('message', {
          text: message,
          name:connectedUser,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      }
      setMessage('');
    };


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
                    ) : message.name === Destinataire?(
                        <div className="message__chats" key={message.id}>
                        <p>{message.name}</p>
                        <div className="message__recipient">
                            <p>{message.text}</p>
                        </div>
                        </div>
                    ):console.log("ba non")
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
                <input type='submit'  value="ndzoebf@hotmail.fr"  onClick={(e)=>{setDestinataire(e.target.value)}}></input>
                <input type='submit'  value="fnzeuobg@hotmail.fr"  onClick={(e)=>{setDestinataire(e.target.value)}}></input>
                <input type='submit'  value="nxaobfuo@hotmail.fr"  onClick={(e)=>{setDestinataire(e.target.value)}}></input>
            </div>
        </div>
    )
}

export default Messagerie