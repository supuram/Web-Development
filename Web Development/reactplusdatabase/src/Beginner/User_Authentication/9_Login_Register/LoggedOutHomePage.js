import React from "react";
import TopBar from './TopBar'
import Login_Button from "./Login_Button";
import Register_Button from "./Register_Button";

export default function Home(){
    return(
        <div>
            <TopBar />
            <Login_Button />
            <Register_Button />
        </div>
    )
}