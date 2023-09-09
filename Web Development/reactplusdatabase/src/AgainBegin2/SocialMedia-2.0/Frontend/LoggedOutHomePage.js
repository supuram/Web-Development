import React from "react";
import Login_Button from "./Login_Button.js";
import Register_Button from "./Register_Button.js";
import Google_Button from "./Google_Button.js";
import Facebook_Button from "./Facebook_Button.js";

export default function Home(){
    return(
        <div>
            <Login_Button />
            <Register_Button />
            <Google_Button />
            <Facebook_Button />
        </div>
    )
}