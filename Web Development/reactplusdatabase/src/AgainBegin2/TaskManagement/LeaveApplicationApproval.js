import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const db = firebase.firestore();

const LeaveApplicationApproval = ({ currentUser }) => {
  const [approvedLeaveRequests, setApprovedLeaveRequests] = useState([]);

  useEffect(() => {
    // Fetch leave requests where approved is true and the currentUser is the leaveby user
    const fetchApprovedLeaveRequests = async () => {
      const snapshot = await db
        .collection("leaveRequests")
        .where("approved", "==", true)
        .where("leaveby", "==", currentUser)
        .get();

      const approvedLeaveRequestsData = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setApprovedLeaveRequests(approvedLeaveRequestsData);
    };

    fetchApprovedLeaveRequests();
  }, [currentUser]);

  return (
    <div>
      {approvedLeaveRequests.length > 0 ? (
        <div>
          <h2>Approved Leave Requests:</h2>
          <ul>
            {approvedLeaveRequests.map((request) => (
              <li key={request.id}>
                {`Leave Request Approved by: ${request.employeeName}, from ${request.fromDate}, to ${request.toDate}`}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No approved leave requests found for your account.</p>
      )}
    </div>
  );
};
export default LeaveApplicationApproval;