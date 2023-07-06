import React from "react";
import Product from './Product.js'
import Total from './Total.js'

export default function Summary(){
    return(
        <div>
            <h2 style={{
                marginBottom:-6,
                paddingBottom:0
            }}>Summary</h2><hr style={{width:300}}></hr>
            <Product />
            <Total />
        </div>
    )
}