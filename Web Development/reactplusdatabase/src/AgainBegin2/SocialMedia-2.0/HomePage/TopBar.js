import React from "react";
import './TopBar.css'
import UserProfile from './UserProfile.js'
import SearchTab from "./SearchTab.js";
import Notification from "./Notification.js";

export default function TopBar(){
    return(
        <div>
            <UserProfile />
            <Notification />
            <SearchTab />
        </div>
    )
}