import React from "react";
import './CardDetails.css'

export default function CardDetails(){
    return(
        <div className="cardDetailsdiv">
            <label htmlFor="cardNumberInput">Credit Card</label><br></br>
            <div className="subDiv1">
                <input 
                    type="text"
                    id="input1carddetails"
                    placeholder="1234 5678 9786 3412"
                ></input>
                <input
                    type="text"
                    id="input2carddetails"
                    placeholder="MM/YYYY"></input>
                <input
                    type="text"
                    id="input3carddetails"
                    placeholder="CVV"></input>
            </div>
            <div className="subDiv2">
                <input 
                    type="text"
                    placeholder="Card Holder Name"
                ></input>
            </div>
        </div>
    )
}