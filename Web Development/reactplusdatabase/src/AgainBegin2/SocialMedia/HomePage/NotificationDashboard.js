import React, { forwardRef } from 'react';
import './NotificationDashboard.css'

const NotificationDashboard = forwardRef((props, ref) => {
  const {message} = props
  return (
    <div className="divNotificationDashboard" ref={ref}>
      <p>{message}</p>
    </div>
  );
});
export default NotificationDashboard