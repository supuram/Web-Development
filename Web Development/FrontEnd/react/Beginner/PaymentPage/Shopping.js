import React from "react";
import TopBar from './TopBar'
import MiddleBar from './MiddleBar'
import Payment from './Payment'
import Summary from './Summary'

export default function Shopping(){
    return(
        <>
            <TopBar /><hr></hr>
            <MiddleBar /><hr></hr>
            <div style={{
                display:"flex",
                justifyContent:"space-around"
            }}>
                <Payment />
                <Summary />
            </div>
        </>
    )
}