import React from "react";
import './Maths.css'
import Navbar from "../Home/Button/Navbar.js";
import Topbar from "../Home/Topbar/Topbar.js";
import './../Home/Home.css'

export default function Maths(){
    return(
        <div className="divMaths">
            <div className="fixeddivHome">
                <Topbar />
                <Navbar />
            </div>
            
        </div>
    )
}