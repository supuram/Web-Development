import React from "react";
import { Link } from "react-router-dom";

export default function Login_Button(){
    return(
        <div>
            <button><Link to='/LoginPage'>Login</Link></button>
        </div>
    )
}