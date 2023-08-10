import React from "react";
import Navbar from "../Home/Button/Navbar.js";
import Topbar from "../Home/Topbar/Topbar.js";
import './../Home/Home.css'

export default function Gre(){
    return(
        <div>
            <div className="fixeddivHome">
                <Topbar />
                <Navbar />
            </div>
            <h1>hi</h1>
        </div>
    )
}