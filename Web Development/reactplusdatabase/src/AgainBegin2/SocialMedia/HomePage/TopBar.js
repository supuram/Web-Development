import React from "react";
import './TopBar.css'
import UserProfile from './UserProfile.js'
import SearchTab from "./SearchTab.js";

export default function TopBar(){
    return(
        <div>
            <UserProfile />
            <SearchTab />
        </div>
    )
}