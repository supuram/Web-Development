import React from "react";

export default function Google_Button(){
    const handleClick = async() => {
        window.location.href = '/auth/google';
    }
    return(
        <div>
            <button onClick={handleClick}>Sign in with Google</button>
        </div>
    )
}