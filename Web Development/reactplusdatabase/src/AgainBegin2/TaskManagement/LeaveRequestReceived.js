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
    } 
    catch (error) {
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

*! Q)setLeaveRequests((prevLeaveRequests) =>
*!         prevLeaveRequests.map((leaveRequest) =>
*!           leaveRequest.id === request.id ? { ...leaveRequest, approved: true } : leaveRequest
*!         ));
*! What does the above piece of code snippet do ?
Ans)Explanation -
1. `setLeaveRequests` is a state-setting function provided by the `useState` hook. It is used to update the state variable `leaveRequests`.
2. The function argument for `setLeaveRequests` is written in arrow function syntax and is used to calculate the new state value based on the previous state value (`prevLeaveRequests`).
3. `prevLeaveRequests` is an array of leave requests fetched from Firestore and stored in the `leaveRequests` state using the `useState` hook.
4. The function uses the `map` method to iterate over each element in the `prevLeaveRequests` array.
5. Inside the `map` function, for each `leaveRequest`, it checks if the `id` of the current `leaveRequest` matches the `id` of the `request` passed as an argument to the `handleLeaveApproval` or `handleLeaveDisapproval` function.
6. If the `id` matches, it creates a new object using the spread operator `{ ...leaveRequest }`, which copies all properties of the `leaveRequest` object, and then sets the `approved` property to `true`.
7. If the `id` does not match, it simply returns the `leaveRequest` object as it is, without any modifications.
8. The `map` method returns a new array with updated `leaveRequest` objects where the matching request will have `approved: true`, and all other requests will remain unchanged.
9. The new array with updated leave requests is passed to `setLeaveRequests`, which sets the state to the new array, causing React to re-render the component with the updated leave request(s).

In summary, the code snippet updates the approval status of a leave request to `true` (approved) in both the local state of the component and in the Firestore database. It achieves this by iterating over the `leaveRequests` array, finding the matching leave request based on the `id`, and updating its `approved` property to `true`.

*! Q)How does the code understands that prevLeaveRequests is an array of leaveRequests ?
Ans)The code understands that `prevLeaveRequests` is an array of leave requests because of the way the `useState` hook is used to initialize the state:

const [leaveRequests, setLeaveRequests] = useState([]);

The `useState` hook is a built-in React hook that allows functional components to have state. It takes an initial state as an argument and returns an array with two elements:

1. The first element (`leaveRequests` in this case) is the current state value, which will hold the array of leave requests.
2. The second element (`setLeaveRequests` in this case) is a function that can be used to update the state (i.e., set a new value for `leaveRequests`).

When the component is initially rendered, `leaveRequests` will be initialized as an empty array (`[]`) because `useState([])` is used. Later, when the `setLeaveRequests` function is called with a new value (an array of leave requests), it will update the `leaveRequests` state with that new array.

In this specific code snippet:

setLeaveRequests((prevLeaveRequests) =>
  prevLeaveRequests.map((leaveRequest) =>
    leaveRequest.id === request.id ? { ...leaveRequest, approved: true } : leaveRequest
  )
);

The `prevLeaveRequests` parameter is provided by React when the `setLeaveRequests` function is called. It represents the current state value of `leaveRequests`, which is an array of leave requests. When the function is executed, `prevLeaveRequests` refers to the current value of the `leaveRequests` state.

By using the `prevLeaveRequests` parameter in the arrow function, the code can safely update the state based on the previous value. The `map` function iterates over the `prevLeaveRequests` array, and based on the condition, it creates a new array with modified elements, where the `approved` property of the specific leave request is updated to `true`. This new array will then be used to update the `leaveRequests` state through `setLeaveRequests`, effectively updating the local state with the new leave request status.

*! Q)So prevLeaveRequests is predefined?
Ans)No, `prevLeaveRequests` is not predefined. It is not a keyword or a predefined variable. Instead, it is just a parameter name chosen by the developer when writing the arrow function inside the `setLeaveRequests` call.

The `prevLeaveRequests` parameter is provided by the `useState` hook when the state-setting function (`setLeaveRequests`) is called. When you use the `useState` hook, React internally keeps track of the current state value and provides that value as the first parameter to the state-setting function.

In the specific code snippet:

`setLeaveRequests` is called with an arrow function as its argument. The arrow function takes one parameter, which is `prevLeaveRequests`. This parameter represents the current state value of the `leaveRequests` state (an array of leave requests) at the time the `setLeaveRequests` function is called.

Since `prevLeaveRequests` is just a parameter name chosen for the arrow function, you can name it differently if you prefer. For example, the code would work the same way if you named it `currentLeaveRequests`:

However, it is a common convention to use the name `prevLeaveRequests` (or similar names like `prev` or `prevState`) to indicate that this parameter represents the previous state value before the update. This helps improve code readability and makes it clear that the parameter is the previous state value of the state variable being updated.

*! Q)const leaveRequestsData = snapshot.docs.map((doc) => {
*!      return { id: doc.id, ...doc.data(), approved: doc.data().approved || false }; - Explain
Ans)In the provided code, `leaveRequestsData` is an array created by mapping over the `docs` property of a `snapshot` object, which represents the result of a Firestore query. Let's break down the code step by step:

1. `snapshot.docs`: The `snapshot` object is the result of a Firestore query, and `docs` is one of its properties. It contains an array of `QueryDocumentSnapshot` objects, each representing a document retrieved from the Firestore collection.

2. `.map((doc) => { ... })`: The `map` function is used to iterate over each `QueryDocumentSnapshot` object in the `snapshot.docs` array. For each document, the function inside `map` is executed, and a new object is returned for each iteration.

3. `return { id: doc.id, ...doc.data(), approved: doc.data().approved || false }`: For each document (`doc`) in the array, this line of code returns a new object that includes:

   - `id: doc.id`: The `id` property is set to the unique identifier of the document. In Firestore, each document has a unique identifier called the document ID, and it can be accessed using the `id` property of the `QueryDocumentSnapshot` object.
   
   - `...doc.data()`: The spread operator (`...`) is used here to spread the properties of the document data (retrieved using `doc.data()`) into the new object. In Firestore, the actual data of the document is stored in the `data()` method of the `QueryDocumentSnapshot` object. By using the spread operator, all properties of the document data are included in the new object.

   - `approved: doc.data().approved || false`: The `approved` property is extracted from the document data using `doc.data().approved`. This code checks if the `approved` property exists in the document data. If it does, its value is assigned to the `approved` property of the new object. If the `approved` property does not exist (i.e., it's `undefined`), then `false` is assigned as the default value for `approved`.

In summary, this code creates a new array `leaveRequestsData` containing objects, where each object represents a document from the Firestore collection. Each object includes the document ID (`id`), all properties of the document data, and an `approved` property that is either taken from the document data or set to `false` if the `approved` property does not exist in the document data. This new array can be used to update the local state with the leave requests fetched from Firestore and set the default value for the `approved` property if it's not present in the document data.
*/