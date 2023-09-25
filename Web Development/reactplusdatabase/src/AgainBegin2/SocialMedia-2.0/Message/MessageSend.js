import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useLocation } from "react-router-dom";

const ENDPOINT = 'http://localhost:5000/LoggedInHomePage/messagesend/chat';

function MessageSend() {
    
    const [response, setResponse] = useState([]);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const receiverEmail = location.state?.receiverEmail;
    const senderEmail = location.state?.senderEmail;
    let socket;

    useEffect(() => {
        socket = socketIOClient(ENDPOINT);
        socket.emit('join', { senderEmail, receiverEmail });
      
        socket.on('message', (message) => {
          setResponse((prev) => [...prev, message]);
        });
      
        return () => {
          socket.disconnect();
        };
    }, []);      

    const sendMessage = () => {
        const socket = socketIOClient(ENDPOINT);
        socket.emit('message', { senderEmail, receiverEmail, message });
        setMessage('');
    };

    return (
        <div>
            {response.map((msg, index) => (
                <p key={index}>{msg.receiverEmail}: {msg.message}</p>
            ))}
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
export default MessageSend;