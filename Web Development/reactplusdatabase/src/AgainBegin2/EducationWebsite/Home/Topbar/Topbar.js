import React from "react";
import squirrel from './../../images/squirrel.png'
import './Topbar.css'
import '@fontsource/ubuntu'
import { Link } from 'react-router-dom'

export default function Topbar(){
    return(
        <div className="divTopbar">
            <img src={squirrel} alt='' className="iconTopbar"></img>
            <ul className="ulTopbar">
                <li><Link to='/' className="navLink">Home</Link></li>
                <li><Link to='/subjects' className="navLink">Subjects</Link></li>
                <li><Link to='/contactus' className="navLink">Contact Us</Link></li>
            </ul>
        </div>
    )
}