import React from "react";
import { Link } from "react-router-dom";
import './TopBar.css'
import UserProfile from './UserProfile.js'

export default function TopBar(){
    return(
        <div>
            <UserProfile />
        </div>
    )
}