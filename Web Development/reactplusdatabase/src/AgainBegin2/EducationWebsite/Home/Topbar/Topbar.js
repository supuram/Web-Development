import React from "react";
import squirrel from './../../images/squirrel.png'
import './Topbar.css'
import { Link } from 'react-router-dom'

export default function Topbar(){
    return(
        <div className="divTopbar">
            <img src={squirrel} alt='' className="iconTopbar"></img>
        </div>
    )
}