import React from "react";
import './Home.css'
import Topbar from "./Topbar/Topbar.js";
import Middlebar from "./Middlebar/Middlebar.js";
import Lowerbar from "./Lowerbar/Lowerbar.js";
import Navbar from './Button/Navbar.js'

export default function Home(){
    return(
        <div>
            <Topbar />
            <Navbar />
            <Middlebar />
            <Lowerbar />
        </div>
    )
}