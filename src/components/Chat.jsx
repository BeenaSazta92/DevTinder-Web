import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket.jsx';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant.jsx';

const Chat = () => {
    const {toUserId} = useParams();
    const [messages,setMessages] = useState([{text: "Hello there!"}])
    const [newMessage, setNewMessage] = useState('');
    const [chat, setChat] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    useEffect(() => {

        if(!userId) return 
        fetchChatMessages()
        // as soon as the page loaded the socket connection is mADE AND JOIN CHAT EVENT EMITTED
        const socket = createSocketConnection();
        socket.emit('joinChat', { firstName: user?.firstName,userId, toUserId })
        // called when component unmount==== (it will disconect socket)

        socket.on("messageReceived", ({firstName,lastName,text}) =>{
            setMessages((messages)=>[...messages,{firstName,lastName,text}])
        })
        return () => {socket.disconnect()};

    },[userId,toUserId])

    const sendMessage = ()=>{
        const socket = createSocketConnection();
        socket.emit("sendMessage",
            {
            firstName:user?.firstName,
            lastName: user?.lastName,
            userId,
            toUserId,
            text:newMessage
        })
        setNewMessage("")
    }
    
    const fetchChatMessages = async () =>{
        try{
            const chat =  await axios.get(`${BASE_URL}/chat/${toUserId}`,
                {withCredentials: true}
            )
            const chatMessages = chat?.data?.messages.map((msg)=>{
                return {
                    firstName: msg?.senderId?.firstName,
                    lastName: msg?.senderId.lastName,
                    text:msg?.text
                };
            });
            setMessages(chatMessages);
        }catch (err){
        }
    }
    return (
        <>
            {user ? (
                <div className='w-1/2 mx-auto border border-grey-100 m-5 h-[70vh] flex flex-col'>
                    <h1 className='p-3 border-b border-grey-600'>Chat</h1>
                    <div className='flex-1 overflow-scroll p-5'>
                        {/* display messages */}
                        {messages?.map((msg, index) => (
                            <div key={index} className={
                                "chat "+ 
                                (user?.firstName == msg?.firstName ? "chat-end" : "chat-start")}>
                                <div className="chat-header">
                                    {`${msg.firstName}  ${msg?.lastName}`}
                                    <time className="text-xs opacity-50">2 hours ago</time>
                                </div>
                                <div className="chat-bubble">{msg?.text}</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                        ))}
                    </div>
                    <div className='p-5 border-t border-grey-600 flex items-center gap-2'>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="input flex-1 text-white p-2 border-grey-500 rounded"
                            placeholder="Write Here....."
                        />
                        <button className='btn btn-primary' onClick={() => sendMessage()}>Send</button>
                    </div>
                </div>
            ) : (
                <h1>Loading.....</h1>
            )}
        </>
    );

}

export default Chat