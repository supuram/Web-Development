import React from "react";
import { Link } from "react-router-dom";

export default function Register_Button(){
    return(
        <div>
            <button><Link to='/RegisterPage'>Register</Link></button>
        </div>
    )
}