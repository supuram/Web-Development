import React, { useEffect } from "react";
import TopBar from '../HomePage/TopBar.js'
import { setAuthToken, getAuthToken } from "./../Frontend/AuthTokenExport.js";
import UploadImages from "./UploadImages.js";

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
        </div>
    )
}