import React from "react";
import { useLocation } from "react-router-dom";

export default function MessageSend(){
    const location = useLocation();
    console.log(location.state)
    if (!location.state) {
        return <p>No state passed</p>;
    }

    const receiverEmail = location.state.receiverEmail;
    const senderEmail = location.state.senderEmail;

    return(
        <div>
            <p>{receiverEmail}</p>
            <p>{senderEmail}</p>
        </div>
    )
}