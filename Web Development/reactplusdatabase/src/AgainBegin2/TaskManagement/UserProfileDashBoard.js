import React, { forwardRef } from "react";
import { Link } from 'react-router-dom';
import './UserProfileDashBoard.css';
import Logout from "./Logout";

const UserProfileDashBoard = forwardRef((props, ref) => {
    return (
      
        <div className="divUserProfileDashBoard" ref={ref}>
            <Link to="/home/profile">Profile</Link>
            <Logout />
        </div>
      
    );
})
export default UserProfileDashBoard;