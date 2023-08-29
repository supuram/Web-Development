import React, { forwardRef } from 'react';
import './NotificationDashboard.css'
import { useAuth } from './AuthContext.js';

const NotificationDashboard = forwardRef((props, ref) => {
  const { receiver, sender } = props;
  // const { currentUser, userProfile } = useAuth();
  // const isReceiver = currentUser.email === receiver;
  return (
    <div className="divNotificationDashboard" ref={ref}>
      
        <div>
          <p>Received friend request from {sender}</p>
           
        </div>
     
    </div>
  );
});
export default NotificationDashboard