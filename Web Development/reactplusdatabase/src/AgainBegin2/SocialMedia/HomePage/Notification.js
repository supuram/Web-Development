import React, {useState, useEffect, useRef} from "react";
import notification from './image/notification.png'
import './Notification.css'
import NotificationDashboard from './NotificationDashboard.js'

export default function Notification(){
    const [isVisible, setIsVisible] = useState(false);
    const subMenuRef = useRef();

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

    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState.isVisible);
    };
    return(
        <div className={`divNotification ${isVisible ? 'visible' : ''}`}>
            <img className='imgNotification' src={notification} alt='' onClick={toggleVisibility} style={{pointerEvents: "all"}}></img>
            {isVisible && (
                <NotificationDashboard ref={subMenuRef} style={{display:'block'}}/>
            )}
        </div>
    )
}