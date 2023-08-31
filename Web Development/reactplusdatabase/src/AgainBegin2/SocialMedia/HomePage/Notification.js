import React, {useState, useEffect, useRef} from "react";
import notification from './image/notification.png'
import './Notification.css'
import NotificationDashboard from './NotificationDashboard.js'
import Axios from 'axios'
import { getAuthToken } from "../Frontend/AuthTokenExport.js";

export default function Notification(){
    const [isVisible, setIsVisible] = useState(false);
    const subMenuRef = useRef();
    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('')
    const [receiverEmail, setReceiverEmail] = useState('')

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

    const toggleVisibility = async() => {
        const authToken = getAuthToken();
        setIsVisible(prevState => !prevState.isVisible);
        try{
            const response = await Axios.get('/friendreqcheck', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            const { nameOfSender, emailOfReceiver, emailOfSender } = response.data;
            setSenderName(nameOfSender)
            setReceiverEmail(emailOfReceiver)
            setSenderEmail(emailOfSender)
        }
        catch (error) {
            console.log('Error sending friend request:', error);
        }
    };
    return(
        <div className={`divNotification ${isVisible ? 'visible' : ''}`}>
            <img className='imgNotification' src={notification} alt='' onClick={toggleVisibility} style={{pointerEvents: "all"}}></img>
            {isVisible && (
                <NotificationDashboard ref={subMenuRef} style={{display:'block'}} message={{ senderName: senderName, receiverEmail: receiverEmail, senderEmail: senderEmail }} />
            )}
        </div>
    )
}