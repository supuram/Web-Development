import React, { forwardRef, useState, useEffect } from 'react';
import './NotificationDashboard.css'
import Axios from 'axios'

const NotificationDashboard = forwardRef((props, ref) => {
  const { senderName, receiverEmail, senderEmail, messagefriend, senderNamefriend, messageinSenderDashboard } = props.message;

  const [requestAccepted, setRequestAccepted] = useState(false);
  const [localSenderName, setLocalSenderName] = useState(null);
  const [localReceiverEmail, setLocalReceiverEmail] = useState(null);
  const [localSenderEmail, setLocalSenderEmail] = useState(null);
  const [localMessagefriend, setLocalMessagefriend] = useState(null);
  const [localSenderNamefriend, setLocalSenderNamefriend] = useState(null);
  const [localMessageinSenderDashboard, setLocalMessageinSenderDashboard] = useState(null);

  // Reset state variables to null when the component mounts
  useEffect(() => {
    setLocalSenderName(null);
    setLocalReceiverEmail(null);
    setLocalSenderEmail(null);
    setLocalMessagefriend(null);
    setLocalSenderNamefriend(null);
    setLocalMessageinSenderDashboard(null);
  }, []);

  useEffect(() => {
    // Update state variables with props.message values
    setLocalSenderName(senderName || null);
    setLocalReceiverEmail(receiverEmail || null);
    setLocalSenderEmail(senderEmail || null);
    setLocalMessagefriend(messagefriend || null);
    setLocalSenderNamefriend(senderNamefriend || null);
    setLocalMessageinSenderDashboard(messageinSenderDashboard || null);
  }, [senderName, receiverEmail, senderEmail, messagefriend, senderNamefriend, messageinSenderDashboard]);

  const handleAcceptRequest = async() => {
    console.log(localSenderName, localReceiverEmail, localSenderEmail);
    await Axios.get('/acceptfriendrequest', {
      params: {
        receiverEmail: localReceiverEmail,
        senderEmail: localSenderEmail,
      }
    });
    setRequestAccepted(true);
    console.log('Exit from acceptfriendrequest');
  }

  return (
    <div className="divNotificationDashboard" ref={ref}>
      {console.log('NotificationDashboard client side ')}
      {localSenderName ? (
        requestAccepted ? (
          <p>You are now friends with {localSenderName}</p>
        ) : (
          <>
            <p>You have received a friend request from - {localSenderName}</p>
            <button onClick={ handleAcceptRequest }>Accept Request</button>
            <button>Reject Request</button>
          </>
        )
      ) : localMessagefriend ? ( 
        <p>{localMessagefriend} {localSenderNamefriend}</p> 
      ) : localMessageinSenderDashboard ? (
        <p>{localMessageinSenderDashboard}</p>
      ) : null}
    </div>
  );
});

export default NotificationDashboard;