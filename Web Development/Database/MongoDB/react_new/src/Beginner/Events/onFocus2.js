import React from "react";

export default function MyInput(){
    function handleFocus(){
        console.log('hmm')
    }
    return(
        <div>
            <input 
                type="text"
                onFocus={handleFocus}
            ></input>
            <input 
                type="text"
                onFocus={handleFocus}
            ></input>
        </div>
    )
}