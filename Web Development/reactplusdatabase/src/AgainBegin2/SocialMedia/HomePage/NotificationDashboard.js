import React, { forwardRef, useState, useEffect } from 'react';
import './NotificationDashboard.css'
import { receiver } from './SearchTab.js'
import { initializeSocket, getSocket } from '../Frontend/Socket.js';
import { useSelector } from 'react-redux';

const NotificationDashboard = forwardRef(({ clientEmail }, ref) => {
  
  const [sendernew, setSendernew] = useState('')
  const clients = useSelector(state => state.clients);
  const client = clients.find(client => client.email === clientEmail);

  useEffect(() => {
    if (client) {
      const email = client.email;
      const sender = client.sender;
      setSendernew(sender)
    }
  }, [client]);

  return (
    <div className="divNotificationDashboard" ref={ref}>
      <p>{sendernew}</p>
    </div>
  );
});
export default NotificationDashboard