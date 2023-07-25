import React from "react";
import './Button.css'
import { Link } from 'react-router-dom'

export default function Button(){
    return(
        <div>
            <button className="buttonMiddlebar"><Link to='/contactus' className="navButton">BOOK TRIAL</Link></button>
        </div>
    )
}