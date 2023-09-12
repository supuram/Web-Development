import React from "react";

export default function Google_Button(){
    const handleClick = async() => {
        console.log('Client side')
        window.location.href = 'http://localhost:5000/auth/google';
    }
    return(
        <div>
            <button onClick={handleClick}>Sign in with Google</button>
        </div>
    )
}