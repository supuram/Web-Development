import React from "react";
import TopBar from './TopBar'
import Logout_Button from "./Logout_Button";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

export default function LogInHome(){
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
    return(
        <div>
            <h1>This is your New Home Page, Welcome to Javascript World</h1>
            <TopBar />
            <Logout_Button onLogout={handleLogout} />
            <p>lorem ipsum</p>
        </div>
    )
}