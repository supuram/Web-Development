import React from "react";

export function LeaveRequestReceived({ employeeName, reason, fromDate, toDate, leaveby, currentUser }) {
  // Check if all props are defined and match the provided employeeName and leaveby
  if (employeeName && reason && fromDate && toDate && leaveby) {
    console.log(employeeName)
    // Check if the current leave request matches the provided employeeName and leaveby
    if (employeeName === currentUser) {
      // All props are defined and the employeeName and leaveby match the provided values, so we can render the content
      return (
        <div>
          <p>{`Leave Request Applied To - ${employeeName}`}</p>
          <p>{`Reason for Leave - ${reason}`}</p>
          <p>{`Begin Date for Leave - ${fromDate}`}</p>
          <p>{`End Date for Leave - ${toDate}`}</p>
          <p>{`Leave applied by - ${leaveby}`}</p>
          <button>Approve Leave</button>
        </div>
      );
    } else {
      // Some props are defined, but the employeeName or leaveby do not match the provided values, so we render nothing
      return null;
    }
  } else {
    // Some props are undefined, so we render nothing
    return null;
  }
}