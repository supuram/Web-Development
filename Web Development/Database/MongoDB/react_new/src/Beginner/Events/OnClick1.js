import React from "react";

export default function OnClick(){
    function handleClick(){
        alert('I have been clicked')
    }
    return(
        <button onClick={handleClick}>Click Me</button>
    )
}