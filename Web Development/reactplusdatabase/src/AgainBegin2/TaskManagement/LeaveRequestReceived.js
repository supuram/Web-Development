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

      const leaveRequestsData = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data(), approved: doc.data().approved || false }; // Include the document ID in the data and set approved to false if not present
      });
      setLeaveRequests(leaveRequestsData);
    };

    fetchLeaveRequests();
  }, [currentUser]);

  // Function to handle leave approval
  const handleLeaveApproval = async (request) => {
    try {
      // update the document with the given request.id where the userName matches the employeeName
      await db.collection("leaveRequests").doc(request.id).update({
        approved: true,
      });

      // Update the local state with the approval status
      setLeaveRequests((prevLeaveRequests) =>
        prevLeaveRequests.map((leaveRequest) =>
          leaveRequest.id === request.id ? { ...leaveRequest, approved: true } : leaveRequest
        )
      );
    } catch (error) {
      console.error("Error updating leave approval status:", error);
      // Handle error if needed
    }
  };

  // Function to handle leave disapproval
  const handleLeaveDisapproval = async (request) => {
    try {
      // Update the leave approval status in Firestore
      await db.collection("leaveRequests").doc(request.id).update({
        approved: false,
      });

      // Update the local state with the approval status
      setLeaveRequests((prevLeaveRequests) =>
        prevLeaveRequests.map((leaveRequest) =>
          leaveRequest.id === request.id ? { ...leaveRequest, approved: false } : leaveRequest
        )
      );
    } catch (error) {
      console.error("Error updating leave approval status:", error);
      // Handle error if needed
    }
  };

  return (
    <div>
      {leaveRequests.map((request, index) => {
        const { id, employeeName, reason, fromDate, toDate, leaveby, approved } = request;
        return (
          <div key={index}>
            <p>{`Leave Request Applied To - ${employeeName}`}</p>
            <p>{`Reason for Leave - ${reason}`}</p>
            <p>{`Begin Date for Leave - ${fromDate}`}</p>
            <p>{`End Date for Leave - ${toDate}`}</p>
            <p>{`Leave applied by - ${leaveby}`}</p>

            {/* Conditional rendering based on leave approval status */}
            {approved ? (
              <p>Leave is Approved.</p>
            ) : (
              <div>
                <button onClick={() => handleLeaveApproval(request)}>
                  Approve Leave
                </button>
                <button onClick={() => handleLeaveDisapproval(request)}>
                  Do not Approve Leave
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
*! Q)const leaveRequestsData = snapshot.docs.map((doc) => doc.data()); What does this line do ?
Ans)The line `const leaveRequestsData = snapshot.docs.map((doc) => doc.data());` is responsible for extracting 
the data from each document in the `snapshot` obtained from the Firestore query.

Here's a breakdown of what this line does:

1. `snapshot`: The `snapshot` variable holds the result of the Firestore query. It is an object containing 
metadata and an array of `docs`, where each `doc` represents a document matching the query.

2. `snapshot.docs`: The `docs` property of the `snapshot` contains an array of document snapshots. Each document 
snapshot represents a document in the Firestore collection that matches the query.

3. `.map((doc) => doc.data())`: The `map` function is used on the `docs` array to transform each document 
snapshot into the data of the document. The `map` function iterates over each document snapshot and applies the 
provided function `(doc) => doc.data()` to each element.

4. `(doc) => doc.data()`: This is an arrow function used as a callback for the `map` function. It takes each 
document snapshot (`doc`) and calls its `data()` method. The `data()` method retrieves the data of the document 
as an object containing key-value pairs, where the keys are the field names and the values are the field values 
stored in the document.

5. `leaveRequestsData`: The result of the `map` function is stored in the `leaveRequestsData` variable. It is an 
array that contains the data of each document matched by the query.

In summary, the line `const leaveRequestsData = snapshot.docs.map((doc) => doc.data());` transforms the array of 
document snapshots obtained from the Firestore query into an array of data objects, where each object contains 
the field-value pairs of a document. This `leaveRequestsData` array will then be used to update the component's 
state to display the relevant details of each leave request.

*! Q)what does these two line do - {leaveRequests.map((request, index) => { const { employeeName, reason, 
*! fromDate, toDate, leaveby } = request;
Ans)These two lines are part of a `map` function used to render a list of leave requests in the component. Let's 
break down what these lines do:

{leaveRequests.map((request, index) => {
  const { employeeName, reason, fromDate, toDate, leaveby } = request;
  // ... rest of the code ...
})}

1. `{leaveRequests.map((request, index) => { ... })}`: This is JSX code that uses the `map` function on the 
`leaveRequests` array to iterate over each leave request in the array and generate a list of elements based on 
the data.

2. `(request, index) => { ... }`: This is the callback function provided to the `map` function. The `map` 
function calls this function for each element in the `leaveRequests` array. The `request` parameter represents 
the current leave request object, and the `index` parameter represents the index of the current element in the 
array.

3. `const { employeeName, reason, fromDate, toDate, leaveby } = request;`: This line uses destructuring 
assignment to extract specific properties from the `request` object. The `request` object contains the data of a 
single leave request (i.e., a single document from the Firestore collection).

- `employeeName`, `reason`, `fromDate`, `toDate`, and `leaveby` are variables that will hold the corresponding 
properties extracted from the `request` object. For example, `employeeName` will hold the value of the `employee
Name` property of the `request` object, and so on.

This destructuring assignment makes it easier to access and use the properties of the `request` object within the
`map` function's callback.

After these lines, you will typically see the JSX elements that use the extracted variables (`employeeName`, 
`reason`, etc.) to display the leave request details within the list. The extracted values will be used to render
each leave request's information in the UI. However, the code you provided omits the rest of the code, so the 
specific JSX elements for rendering the leave request details are not visible.
*/