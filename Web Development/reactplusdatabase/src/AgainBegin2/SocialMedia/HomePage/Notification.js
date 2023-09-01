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
    const [messagefriend, setMessagefriend] = useState('')
    const [senderNamefriend, setSendernamefriend] = useState('')

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
        console.log('Entered toggleVisibility')
        try{
            const response = await Axios.get('/friendreqcheck', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            console.log('Response came back from friendreqcheck in toggleVisibility')

            if(response.data.message == 'You are friends with'){
                console.log(response.data.message)
                const { messagefriend, senderNamefriend } = response.data
                setMessagefriend(messagefriend)
                setSendernamefriend(senderNamefriend)
            }
            else{
                console.log(response.data.emailOfSender)
                const { nameOfSender, emailOfReceiver, emailOfSender } = response.data;
                setSenderName(nameOfSender)
                setReceiverEmail(emailOfReceiver)
                setSenderEmail(emailOfSender)
            }
        }
        catch (error) {
            console.log('Error sending friend request:', error);
        }
    };
    return(
        <div className={`divNotification ${isVisible ? 'visible' : ''}`}>
            <img className='imgNotification' src={notification} alt='' onClick={toggleVisibility} style={{pointerEvents: "all"}}></img>
            {(isVisible && senderName) ? (
                <NotificationDashboard ref={subMenuRef} style={{display:'block'}} message={{ senderName: senderName, receiverEmail: receiverEmail, senderEmail: senderEmail }} />
            ) : (isVisible && messagefriend) ? (
                <NotificationDashboard ref={subMenuRef} style={{display:'block'}} message={{ messagefriend: messagefriend, senderNamefriend: senderNamefriend }} />) : null}
        </div>
    )
}