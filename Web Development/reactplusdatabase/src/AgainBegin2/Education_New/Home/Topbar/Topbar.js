import React from "react";
import squirrel from './../../images/squirrel.png'
import './Topbar.css'

export default function Topbar(){
    return(
        <div className="divTopbar">
            <img src={squirrel} alt='' className="iconTopbar"></img>
        </div>
    )
}