import React, { useEffect, useState } from "react";
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';

export default function MessageReceived(){
    const [response, setResponse] = useState([]);
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('message', (message) => {
            setResponse((prev) => [...prev, message]);
        });
      
        return () => {
            socket.disconnect();
        };
    }, []);

    return(
        <div>
            
        </div>
    )
}
// LoggedInHomePage/messagereceived