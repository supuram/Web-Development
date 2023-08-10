import React from "react";
import './English.css'
import Navbar from "../Home/Button/Navbar.js";
import Topbar from "../Home/Topbar/Topbar.js";
import './../Home/Home.css'

export default function English(){
    return(
        <div className="divEnglish">
            <div className="fixeddivHome">
                <Topbar />
                <Navbar />
            </div>
           
        </div>
    )
}