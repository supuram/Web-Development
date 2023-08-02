import React from "react";
import './WebDev.css'
import Navbar from "../Home/Button/Navbar.js";
import Topbar from "../Home/Topbar/Topbar.js";

export default function WebDev(){
    return(
        <div>
            <Topbar />
            <Navbar />
            <h1>This is good</h1>
        </div>
    )
}