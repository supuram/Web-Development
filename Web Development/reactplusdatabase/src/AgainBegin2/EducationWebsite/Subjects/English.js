import React from "react";
import reading from './../images/reading.png'
import './English.css'
import Button from './../Home/Button.js'
import Navbar from "../Home/Button/Navbar.js";
import Topbar from "../Home/Topbar/Topbar.js";

export default function English(){
    return(
        <div className="divEnglish">
            <Topbar />
            <Navbar />
            <div className="divchildEnglish">
                <img src={reading} alt='' className="imgEnglish"></img>
                <p>In today's interconnected world, learning English online holds immense significance. As the global lingua franca, English facilitates seamless communication, expanding opportunities for personal and professional growth. Online platforms provide accessible and convenient language learning options, enabling individuals to enhance their skills, engage with diverse cultures, and thrive in an increasingly interconnected global landscape.</p> 
            </div>
            <Button />
        </div>
    )
}