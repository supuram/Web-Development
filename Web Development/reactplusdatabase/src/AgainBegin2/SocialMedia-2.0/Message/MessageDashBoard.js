import React, { forwardRef } from "react";
import { Link } from 'react-router-dom';
import './MessageDashBoard.css';

const MessageDashBoard = forwardRef((props, ref) => {
    
    return (
        <div className="divMessageProfileDashBoard" ref={ref} >
            <Link 
                to="/fullprofile"
                style={{
                    textDecoration:'none',
                    display:'block'
                }}>Profile
            </Link>
        </div>
      
    );
})
export default MessageDashBoard;