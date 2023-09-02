import React, { forwardRef } from 'react';
import './NotificationDashboard.css'
import Axios from 'axios'

const NotificationDashboard = forwardRef((props, ref) => {
  const { senderName, receiverEmail, senderEmail, messagefriend, senderNamefriend, messageinSenderDashboard } = props.message || {}

  const handleAcceptRequest = async() => {
    console.log(senderName, receiverEmail, senderEmail)
    await Axios.get('/acceptfriendrequest', {
      params: {
        receiverEmail: receiverEmail,
        senderEmail: senderEmail,
      }
    })
    console.log('Exit from acceptfriendrequest')
  }

  return (
    <div className="divNotificationDashboard" ref={ref}>
      {senderName ? (
        <>
          <p>You have received a friend request from - {senderName}</p>
          <button onClick={ handleAcceptRequest }>Accept Request</button>
          <button>Reject Request</button>
        </>
      ) : messagefriend ? ( 
        <p>{ messagefriend } { senderNamefriend }</p> 
      ) : messageinSenderDashboard ? (
        <p>{messageinSenderDashboard}</p>
      ) : null}
    </div>
  );
});
export default NotificationDashboard