import React from "react";
import chicken from './../images/1.png'

export default function Topbar(){
    return(
        <div className="divTopbar">
            
            <img src={chicken} alt='' className="imgTopbar"></img>
        </div>
    )
}