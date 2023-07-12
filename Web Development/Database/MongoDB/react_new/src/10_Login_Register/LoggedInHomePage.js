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
            navigate('/')
        })
        .catch((err) => console.log(err));
    }
    return(
        <div>
            <hi>This is your New Home Page, Welcome to Javascript World</hi>
            <TopBar />
            <Logout_Button onLogout={handleLogout} />
            <p>lorem ipsum</p>
        </div>
    )
}