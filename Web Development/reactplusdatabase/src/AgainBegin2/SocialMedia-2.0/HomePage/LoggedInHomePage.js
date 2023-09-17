import React, { useEffect } from "react";
import TopBar from '../HomePage/TopBar.js'
import { setAuthToken, getAuthToken } from "./../Frontend/AuthTokenExport.js";
import UploadImages from "./UploadImages.js";
import SearchTab from "../Message/SearchTab.js";
import { Link } from 'react-router-dom';

export default function LogInHome(){
    useEffect(() => {
        let authToken = getAuthToken();
        if (!authToken) {
            console.log(document.cookie)
            const value = `; ${document.cookie}`;
            const parts = value.split(`; authToken=`);
            if (parts.length === 2) {
                authToken = parts.pop().split(';').shift();
                setAuthToken(authToken);
                console.log(authToken)
            }
        }
    }, []);

    return(
        <div>
            <TopBar />
            <UploadImages />
            <Link 
                to="/LoggedInHomePage/messagereceived"
                style={{
                    textDecoration:'none',
                    display:'block', 
                    fontSize: '4rem',
                    color: 'black'
                }}>MessageReceived
            </Link>
            <SearchTab />
        </div>
    )
}