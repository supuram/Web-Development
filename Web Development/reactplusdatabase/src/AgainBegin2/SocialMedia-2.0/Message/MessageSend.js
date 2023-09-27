import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useLocation } from "react-router-dom";

const ENDPOINT = 'http://localhost:5000/chat';
const socket = socketIOClient(ENDPOINT);

function MessageSend() {
    
    const [response, setResponse] = useState([]);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const receiverEmail = location.state?.receiverEmail;
    const senderEmail = location.state?.senderEmail;

    useEffect(() => {
        socket.emit('join', { senderEmail, receiverEmail });
        console.log('useEffect in MessageSend')
        socket.on('message', (message) => {
          setResponse((prev) => [...prev, message]);
        });
        console.log('after socket.on in useEffect in MessageSend')
        return () => {
          socket.disconnect();
        };
    }, []);      

    const sendMessage = () => {
        console.log('sendMessage in MessageSend')
        socket.emit('message', { senderEmail, receiverEmail, message });
        setMessage('');
    };

    return (
        <div>
            {response.map((msg, index) => (
                <p key={index}>{msg.receiverEmail}: {msg.message}</p>
            ))}
            {console.log('return of MessageSend')}
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
export default MessageSend;