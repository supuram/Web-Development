import React, { forwardRef, useContext } from 'react';
import './NotificationDashboard.css'

const NotificationDashboard = forwardRef((props, ref) => {
  const { sender } = props;
  return (
    <div className="divNotificationDashboard" ref={ref}>
      <div>
        <p>Received friend request from {sender}</p>   
      </div>
    </div>
  );
});
export default NotificationDashboard