import React from "react";

export function LeaveRequestReceived(){
    const handleLeaveRequest = (employeeName, reason, fromDate, toDate, loggedInUser) => {
        return(
            <div>
                <p>{`${employeeName}`}</p>
                <p>{`${reason}`}</p>
                <p>{`${fromDate}`}</p>
                <p>{`${toDate}`}</p>
                <p>{`${loggedInUser}`}</p>
            </div>
        )
    }
}