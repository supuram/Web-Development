import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const db = firebase.firestore();

export function LeaveRequestReceived({ currentUser }) {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    // Fetch leave requests that match the current user's username as employeeName or leaveby
    const fetchLeaveRequests = async () => {
      const snapshot = await db
        .collection("leaveRequests")
        .where("employeeName", "==", currentUser)
        .get();

      const leaveRequestsData = snapshot.docs.map((doc) => doc.data());
      setLeaveRequests(leaveRequestsData);
    };

    fetchLeaveRequests();
  }, [currentUser]);

  return (
    <div>
      {leaveRequests.map((request, index) => {
        const { employeeName, reason, fromDate, toDate, leaveby } = request;
        return (
          <div key={index}>
            <p>{`Leave Request Applied To - ${employeeName}`}</p>
            <p>{`Reason for Leave - ${reason}`}</p>
            <p>{`Begin Date for Leave - ${fromDate}`}</p>
            <p>{`End Date for Leave - ${toDate}`}</p>
            <p>{`Leave applied by - ${leaveby}`}</p>
            <button>Approve Leave</button>
          </div>
        );
      })}
    </div>
  );
}