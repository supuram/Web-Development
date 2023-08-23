import React, { forwardRef, useState} from 'react';
import './NotificationDashboard.css'
import { getAuthToken } from "../Frontend/AuthTokenExport.js";
import Axios from 'axios';

const NotificationDashboard = forwardRef((props, ref) => {
  const [receiver, setReceiver] = useState(null);
  const [sender, setSender] = useState(null);

  const handleFriendRequest = async(profile) => {
    const authToken = getAuthToken();
    
    console.log('This is the client side of friendrequest and i am entering try catch block', profile)
    try {
        const response = await Axios.post('/friendrequest', profile, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        });
        console.log('Sending request to the server side from friendrequest is success and the response came back')
        setReceiver(response.data.receiver)
        setSender(response.data.sender)
    } 
    catch (error) {
        console.log('Error sending friend request:', error);
    }
  }
  return (
    <div className="divNotificationDashboard" ref={ref}>
      {handleFriendRequest && <p>You have received a friend request from {sender}</p>}
    </div>
  );
});
export {handleFriendRequest}
export default NotificationDashboard;