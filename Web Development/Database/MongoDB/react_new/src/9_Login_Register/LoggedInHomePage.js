import React from "react";
import TopBar from './TopBar'
import Logout_Button from "./Logout_Button";

export default function LogInHome(){
    return(
        <div>
            <hi>This is your New Home Page, Welcome to Javascript World</hi>
            <TopBar />
            <Logout_Button />
            <p>lorem ipsum</p>
        </div>
    )
}