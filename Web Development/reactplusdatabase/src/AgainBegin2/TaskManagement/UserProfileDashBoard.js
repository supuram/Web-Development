import React, { forwardRef } from "react";
import { Link } from 'react-router-dom';
import './UserProfileDashBoard.css';
import Logout from "./Logout";

const UserProfileDashBoard = forwardRef((props, ref) => {
    return (
        <div className="divUserProfileDashBoard" ref={ref} >
            <Link 
                to="/home/profile"
                style={{
                    textDecoration:'none',
                    display:'block'
                }}>Profile
            </Link>
            <Link 
                to='/home/tabo'
                style={{
                    textDecoration:'none',
                    display:'block'
                }}>TasksAssignedByOthers
            </Link>
            <Link 
                to='/home/tgto'
                style={{
                    textDecoration:'none',
                    display:'block'
                }}>TasksGivenToOthers
            </Link>
            <Link 
                to='/home/lrr'
                style={{
                    textDecoration:'none',
                    display:'block'
                }}>LeaveRequestReceived
            </Link>
            <Logout />
        </div>
      
    );
})
export default UserProfileDashBoard;