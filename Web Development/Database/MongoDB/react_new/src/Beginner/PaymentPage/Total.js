import React from "react";
import './Total.css'

export default function Total(){
    return(
        <div className="totalMainDiv">
            <div className="totalDiv">
                <h3>Subtotal</h3>
                <h3>$1100</h3>
            </div>
            <div className="totalDiv">
                <h3>Shipping</h3>
                <h3>Free</h3>
            </div>
            <div className="totalDiv">
                <h3>Taxes</h3>
                <h3>$10</h3>
            </div><hr></hr>
            <div className="totalDiv">
                <h3>Total</h3>
                <h3>$1110</h3>
            </div>
        </div>
    )
}