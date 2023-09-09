import React from "react";
import Axios from 'axios'

export default function Facebook_Button(){
    const handleClick = async() => {
        try{
            await Axios.get('/auth/facebook', { withCredentials: true })
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <div>
            <button onClick={handleClick}>Sign in with Facebook</button>
        </div>
    )
}