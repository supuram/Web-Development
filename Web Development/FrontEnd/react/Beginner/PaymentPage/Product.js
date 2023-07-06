import React from "react";
import './Product.css'

export default function Product(){
    return(
        <div>
            <div className="productsdiv1">
                <div>
                    <img src="https://th.bing.com/th/id/OIP.eHVlVO985dvHg3p7-_zoxQHaGn?pid=ImgDet&rs=1" className="productImage"></img>
                </div>
                <div>
                    <h4>Mobile</h4>
                    <h4>$300</h4>
                </div>
            </div>
            <br></br>
            <div className="productsdiv1">
                <div>
                    <img src="https://i5.walmartimages.com/asr/3436c957-e6ea-4f3e-a9c8-ae88daf64726.43421cb819286971501d5d7dd9ccecb6.jpeg" className="productImage"></img>
                </div>
                <div>
                    <h4>Laptop</h4>
                    <h4>$800</h4>
                </div>
            </div><hr></hr>
        </div>
    )
}