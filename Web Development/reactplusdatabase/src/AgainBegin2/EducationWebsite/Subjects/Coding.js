import React, { useState } from "react";
import Navbar from "../Home/Button/Navbar.js";
import './Coding.css'
import Topbar from "../Home/Topbar/Topbar.js"
import { Navigate } from 'react-router-dom';
import Science from './Science.js'


export default function Coding(){
    const handleSubmit = () => {
        <Science />
    }
    return(
        <div className="divCoding">
            <Topbar />
            <Navbar />
            <div className="divContainerCoding">
                <div className="div3ContainerCoding" onClick={handleSubmit}>

                </div>
                <div className="div3ContainerCoding">
                    
                </div>
                <div className="div3ContainerCoding">
                    
                </div>
                <div className="div3ContainerCoding">
                    
                </div>
            </div>
        </div>
    )
}