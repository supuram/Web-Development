/*import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useLocation } from "react-router-dom";
import { io } from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:4001";

export default function MessageSend(){
    const socket = io()
    const [response, setResponse] = useState("");
    const location = useLocation();
    const receiverEmail = location.state?.receiverEmail;
    const senderEmail = location.state?.senderEmail;
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        socket.timeout(5000).emit('create-something', value, () => {
        setIsLoading(false);
        });
    }

    useEffect(() => {
        if (location.state) {
            const socket = socketIOClient(ENDPOINT);
            socket.on("chat message", data => {
                setResponse(data);
            });
            return () => socket.disconnect();
        }
    }, [location.state]);

    if (!location.state) {
        return <p>No state passed</p>;
    }

    return(
        <div>
            <form onSubmit={ onSubmit }>
                <input onChange={ e => setValue(e.target.value) } />
                <button type="submit" disabled={ isLoading }>Submit</button>
            </form>
        </div>
    )
}*/

import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useLocation } from "react-router-dom";

const ENDPOINT = 'http://localhost:5000';

function MessageSend() {
    
    const [response, setResponse] = useState([]);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const receiverEmail = location.state?.receiverEmail;
    const senderEmail = location.state?.senderEmail;

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
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
        socket.emit('message', { receiverEmail, message });
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