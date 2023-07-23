import React from "react";
import './Home.css'
import Topbar from "./Topbar/Topbar.js";
import Middlebar from "./Middlebar/Middlebar.js";

export default function Home(){
    return(
        <div>
            <Topbar />
            <Middlebar />
        </div>
    )
}