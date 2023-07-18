import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import Login_Button from "./Login_Button";

export default function Register_Page(){
    const [text, setText] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        Axios.post('/Register-Page-Form', {text, email, password})
            .then(response => {
                console.log(response)
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    placeholder="Username"
                    onChange={event => {
                        setText(event.target.value)
                    }}>
                </input>
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
                <Login_Button />
            </form>
        </div>
    )
}