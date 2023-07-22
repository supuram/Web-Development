import React from "react";
import chicken1 from './../images/chicken1.jpg'
import chickenVideo from './../images/chicken.mp4'
import './Home.css'

export default function Home(){
    return(
        <div>
            <img src={chicken1} className="chicken1" alt=''></img>
            <video src={chickenVideo} className="chickenVideo" autoPlay muted loop />
        </div>
    )
}