import React from "react";
import { Link } from "react-router-dom";
import './TopBar.css'

export default function TopBar(){
    return(
        <div>
             <ul className="topbarul">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li>Shop</li>
                <li>Help</li>
            </ul>
        </div>
    )
}