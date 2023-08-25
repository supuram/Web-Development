import React, { forwardRef, useState, useEffect } from 'react';
import './NotificationDashboard.css'
import { receiver } from './SearchTab.js'
import { initializeSocket, getSocket } from '../Frontend/Socket';

const NotificationDashboard = forwardRef((props, ref) => {
  const [sendernew, setSendernew] = useState('')
  const [receivernew, setReceivernew] = useState('')
  
  useEffect(() => {
    setReceivernew(receiver)
    initializeSocket(receivernew)
    const ws = getSocket(receivernew);
    const handleMessage = (event) => {
      const data = JSON.parse(event.data); // used to parse JSON string into a JS object
      // update state here
      setSendernew(data);
    };
    ws.addEventListener('message', handleMessage);
    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [receiver, receivernew]);

  return (
    <div className="divNotificationDashboard" ref={ref}>
      <p>{sendernew}</p>
    </div>
  );
});
export default NotificationDashboard