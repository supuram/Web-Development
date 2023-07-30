import React from "react";
import TopBar from './TopBar.js'
import Login_Button from "./Login_Button.js";
import Register_Button from "./Register_Button.js";

export default function Home(){
    return(
        <div>
            <TopBar />
            <Login_Button />
            <Register_Button />
        </div>
    )
}