import React, { forwardRef } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import './UserProfileDashBoard.css';
import Logout_Button from './../Frontend/Logout_Button.js'

const UserProfileDashBoard = forwardRef((props, ref) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        Axios.get('/logout')
        .then(() => {
            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            // Clear Local Storage data
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userToken');
            navigate('/')
        })
        .catch((err) => console.log(err));
    }
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
            <Logout_Button onLogout={handleLogout}/>
        </div>
      
    );
})
export default UserProfileDashBoard;