import React from "react";
import chicken from './../images/1.png'

export default function Topbar(){
    return(
        <div>
            <img src={chicken} alt='' style={{position:'absolute', top:'5px', left:'10px', height:'10rem', width:'11rem'}}></img>
        </div>
    )
}