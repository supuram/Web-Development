import React from "react";
import { Link } from "react-router-dom";

export default function Logout_Button(){
    return(
        <div>
            <button><Link to='/'>Logout</Link></button>
        </div>
    )
}