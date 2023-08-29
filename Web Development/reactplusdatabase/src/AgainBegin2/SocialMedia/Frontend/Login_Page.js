import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import Register_Button from "./Register_Button.js";
import ForgotPasswordButton from './ForgotPasswordButton.js'
import { setAuthToken } from "./AuthTokenExport.js";

export default function Login_Page(){
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        Axios.post('/Login-Page-Form', {email, password})
        .then(response => {
            if(response.data.token){
                setAuthToken(response.data.token)
                document.cookie = `authToken = ${response.data.token}; path=/` /* The path attribute 
specifies the URL path for which the cookie should be sent, not the URL to which the user should be 
redirected */
                /** Store user data in Local Storage  */
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userToken', response.data.token);
                navigate('/LoggedInHomePage')
                console.log(getCookie('authToken'))
                Axios.get('/protected-route', {
                    headers: {
                      Authorization: `Bearer ${getCookie('authToken')}`
                    }
                })
            }
        })
        .catch(err => console.log(err))
   }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={email}
                    placeholder="Email"
                    onChange={event => {
                        setEmail(event.target.value)
                    }}>
                </input>
                <input 
                    type="password" 
                    value={password}
                    placeholder="Password"
                    onChange={event => {
                        setPassword(event.target.value)
                    }}>
                </input>
                <button>Submit</button>
                <Register_Button />
                <ForgotPasswordButton />
            </form>
        </div>
    )
}