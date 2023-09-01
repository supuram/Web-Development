import React, { forwardRef } from 'react';
import './NotificationDashboard.css'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest } from '../Redux/friendRequestAction.js';

const NotificationDashboard = forwardRef((props, ref) => {
  const { senderName, receiverEmail, senderEmail, messagefriend, senderNamefriend } = props.message || {}
  const dispatch = useDispatch();
  const requestAccepted = useSelector(state => state.friendRequest.accepted);

  const handleAcceptRequest = async() => {
    console.log(senderName, receiverEmail, senderEmail)
    await Axios.get('/acceptfriendrequest', {
      params: {
        receiverEmail: receiverEmail,
        senderEmail: senderEmail,
      }
    })
    console.log('Exit from acceptfriendrequest')
    dispatch(acceptFriendRequest());
  }

  return (
    <div className="divNotificationDashboard" ref={ref}>
      {senderName ? (
        <>
          <p>You have received a friend request from - {senderName}</p>
          <button onClick={ handleAcceptRequest }>Accept Request</button>
          <button>Reject Request</button>
        </>
      ) : ( <p>{ messagefriend } { senderNamefriend }</p> )}
    </div>
  );
});
export default NotificationDashboard