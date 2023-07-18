import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import Register_Button from "./Register_Button";

export default function Login_Page(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        Axios.post('/Login-Page-Form', {email, password})
            .then(response => {
                console.log(response)
                navigate('/LoggedInHomePage')
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
            </form>
        </div>
    )
}