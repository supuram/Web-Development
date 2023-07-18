import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordButton(){
    return(
        <div>
            <button><Link to='/ForgotPassword'>Forgot Password</Link></button>
        </div>
    )
}