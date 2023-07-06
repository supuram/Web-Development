import React from "react";

export default function MiddleBar(){
    return(
        <div>
            <ul style={{
                listStyleType:"none",
                display:"flex",
                justifyContent:"space-around",
                fontSize:25
            }}>
                <li>1.Shopping Cart</li>
                <li>2.Shipping Details</li>
                <li>3.Payment Options</li>
            </ul>
        </div>
    )
}