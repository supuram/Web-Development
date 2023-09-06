import React, {useState, useEffect, useRef} from "react";
import notification from './image/notification.png'
import './Notification.css'
import NotificationDashboard from './NotificationDashboard.js'
import Axios from 'axios'
import { getAuthToken } from "../Frontend/AuthTokenExport.js";

export default function Notification(){
    const [isVisible, setIsVisible] = useState(false);
    const subMenuRef = useRef();
    const [senderNameinNotification, setSenderNameinNotification] = useState('');
    const [senderEmailinNotification, setSenderEmailinNotification] = useState('')
    const [receiverEmailinNotification, setReceiverEmailinNotification] = useState('')
    const [messagefriendinNotification, setMessagefriendinNotification] = useState('')
    const [senderNamefriendinNotification, setSendernamefriendinNotification] = useState('')
    const [messageinSenderDashboardinNotification, setMessageinSenderDashboardinNotification] = useState('')

    useEffect(() => {
        // Reset the variables when the component is mounted
        setSenderNameinNotification('');
        setSenderEmailinNotification('');
        setReceiverEmailinNotification('');
        setMessagefriendinNotification('');
        setSendernamefriendinNotification('');
        setMessageinSenderDashboardinNotification('');
      }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (subMenuRef.current && !subMenuRef.current.contains(event.target) &&
            event.target !== document.querySelector('.imgNotification')) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        console.log('isVisible:', isVisible);
        console.log('senderName:', senderNameinNotification);
        console.log('messagefriend and senderNamefriend:', messagefriendinNotification, senderNamefriendinNotification);
        console.log('messageinSenderDashboard:', messageinSenderDashboardinNotification);
      }, [isVisible, senderNameinNotification, senderNamefriendinNotification, messagefriendinNotification, messageinSenderDashboardinNotification]);
      

    const toggleVisibility = async() => {
        const authToken = getAuthToken();
        setSenderNameinNotification('');
        setIsVisible(prevState => !prevState.isVisible);
        console.log('Entered toggleVisibility')
        try{
            const response = await Axios.get('/friendreqcheck', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            console.log('Response came back from friendreqcheck in toggleVisibility')

            if(response.data.message == 'You are friends with'){ // *! for receiver
                console.log('You are friends with --------------------', response.data.message)
                setMessagefriendinNotification(response.data.message)
                setSendernamefriendinNotification(response.data.nameOfSender)
                try{
                    const ifBlockResponse = await Axios.get('/notificationClient', {
                        messagefriend: response.data.message,
                        sendernamefriend: response.data.nameOfSender                        
                    })
                    console.log(ifBlockResponse)
                }
                catch (error) {
                    console.log('Error sending data in if block of Notification.js:', error);
                }
            }
            else if(response.data.message == 'Your friend request has been approved'){ // *! for sender
                console.log('request has been approved @@@@@@@@@@@@@@@@@@@@@@@@@@@@', response.data.message)
                setMessageinSenderDashboardinNotification(response.data.message)
            }
            else{
                console.log('response.data.emailOfSender *************************', response.data.emailOfSender)
                setSenderNameinNotification(response.data.nameOfSender)
                setReceiverEmailinNotification(response.data.emailOfReceiver)
                setSenderEmailinNotification(response.data.emailOfSender)
            }
        }
        catch (error) {
            console.log('Error sending friend request:', error);
        }
    };
    return(
        <div className={`divNotification ${isVisible ? 'visible' : ''}`}>
            <img className='imgNotification' src={notification} alt='' onClick={toggleVisibility} style={{pointerEvents: "all"}}></img>
            {console.log('Notification client side')}
            {isVisible ? (
                senderNameinNotification ? (
                <NotificationDashboard ref={subMenuRef} style={{display:'block'}} message={{ senderName: senderNameinNotification, receiverEmail: receiverEmailinNotification, senderEmail: senderEmailinNotification }} />
                ) : messagefriendinNotification ? (
                <NotificationDashboard ref={subMenuRef} style={{display:'block'}} message={{ messagefriend: messagefriendinNotification, senderNamefriend: senderNamefriendinNotification }} />
                ) : messageinSenderDashboardinNotification ? (
                <NotificationDashboard ref={subMenuRef} style={{display:'block'}} message={{ messageinSenderDashboard: messageinSenderDashboardinNotification }} />
                ) : null
            ) : null}
        </div>
    )
}