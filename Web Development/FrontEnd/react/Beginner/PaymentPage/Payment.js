import React from "react";
import CardDetails from './CardDetails'
import Buttons from './Buttons'

export default function Payment(){
    return(
        <div>
            <h4 style={{
                marginBottom:0,
                paddingBottom:0
            }}>Payment method</h4><hr style={{width:500}}></hr>
            <div style={{
                lineHeight:3
            }}>
                <CardDetails />
                <Buttons />
            </div>
        </div>
    )
}