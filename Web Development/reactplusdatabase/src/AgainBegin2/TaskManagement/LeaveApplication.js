import React, { useState, useEffect } from "react";
import { getAllUsernames } from "./DropdownMenuinTaskAssignedTo";

export default function LeaveApplication({onFormSubmit}){
    const [employeeName, setEmployeeName] = useState("");
    const [reason, setReason] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [leaveby, setLeaveby] = useState("")
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        const fetchUsernames = async () => {
          const usernames = await getAllUsernames();
          setUsernames(usernames);
        };  
        fetchUsernames();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()

         // Get the values from the form
        const employeeNameValue = employeeName;
        const reasonValue = reason;
        const fromDateValue = fromDate;
        const toDateValue = toDate;
        const leavebyValue = leaveby;

        //responsible for gathering the form data and passing it back to the App component through a callback prop called onFormSubmit.
        onFormSubmit({
            employeeName: employeeNameValue,
            reason: reasonValue,
            fromDate: fromDateValue,
            toDate: toDateValue,
            leaveby: leavebyValue,
        });

        setEmployeeName("");
        setReason("");
        setFromDate("");
        setToDate("");
        setLeaveby("");
    }
    return(
        <div>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
                <label>Addressed To</label>
                <select id="employeeName" onChange={e => setEmployeeName(e.target.value)}>
                    <option value="">Select an employee</option>
                    {usernames.map((username1) => (
                        <option key={username1} value={username1}>
                        {username1}
                        </option>
                    ))}
                </select>
                <input
                    type='text'
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Reason For Leave">       
                </input>
                <input 
                    type='date'
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                    placeholder="From">
                </input>
                <input 
                    type='date'
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                    placeholder="To">
                </input>
                <label>Leave Applied By</label>
                <select id="employeeName" onChange={e => setLeaveby(e.target.value)}>
                    <option value="">Select an employee</option>
                    {usernames.map((username1) => (
                        <option key={username1} value={username1}>
                        {username1}
                        </option>
                    ))}
                </select>
                <button>Submit</button>
            </form>
        </div>
    )
}

/**
In the LeaveApplication component, when the user submits the form, the handleSubmit function is called. Inside 
this function, the form data is gathered, and then the onFormSubmit callback prop (received from the parent 
component, App) is called with the formData as its argument.

Now, back in the App component, the handleFormSubmit function is defined to receive this data parameter, which 
represents the form data that was passed from the LeaveApplication component. The handleFormSubmit function then 
takes this data and adds it to the leaveRequests collection in Firestore using the db.collection("leaveRequests")
.add(data) code.

So, in summary, the data in the handleFormSubmit function comes from the form submission in the LeaveApplication 
component, and it is passed through the onFormSubmit callback prop.

Here's the flow of how the data from the form submission in the `LeaveApplication` component goes to the database
through the `handleFormSubmit` function and then back to the `App` component:

1. In the `App` component, the `handleFormSubmit` function is defined to receive form data and add it to the 
database. It's just a function defined within the `App` component, and it's not directly connected to any form.

2. The `LeaveApplication` component is rendered under the route path `/home/leave` in the `App` component. In 
the `LeaveApplication` component, there is a form with various input fields.

3. When the user submits the form in the `LeaveApplication` component (by clicking a submit button), the 
`handleSubmit` function inside the `LeaveApplication` component is triggered. This function gathers the form 
data from the input fields.

4. After gathering the form data, the `onFormSubmit` callback prop is called with the `formData` as its argument. 
The `onFormSubmit` callback prop is passed down to the `LeaveApplication` component as a prop from the `App` 
component.

5. Now, when the `onFormSubmit` callback is called, it triggers the `handleFormSubmit` function in the `App` 
component, passing the `formData` as its argument.

6. The `handleFormSubmit` function receives the `formData` as `data` parameter. It then takes this data and adds 
it to the `leaveRequests` collection in Firestore using the `db.collection("leaveRequests").add(data)` code. 
This step saves the form data in the database.

So, the data flow is like this:

`LeaveApplication` (form submission) -> `onFormSubmit` (callback prop) -> `handleFormSubmit` (in `App` component)
-> Firestore database

After the data is successfully added to the database, the whole process is complete. The data does not go back to
the `App` component again, but it remains in the Firestore database for future retrieval and usage if needed.

*! Q)Why is `onFormSubmit` a callback prop ? What is a callback prop ?
Ans)In React, a "callback prop" is a term used to describe a function that is passed as a prop from a parent 
component to a child component. The purpose of a callback prop is to allow the child component to communicate 
with the parent component. Essentially, the parent component provides a function to the child component, and the 
child component can call that function when needed, passing data or triggering specific actions in the parent 
component.

In the provided code, `onFormSubmit` is a callback prop because it is passed as a prop from the `App` component 
(parent) to the `LeaveApplication` component (child). It allows the `LeaveApplication` component to notify the 
`App` component when the form is submitted and pass the form data back to the `App` component for further 
processing, such as saving the data to the Firestore database.

Here's how the callback prop is used in the code:

In the `App` component:
```jsx
// ...
const handleFormSubmit = (data) => {
  db.collection("leaveRequests").add(data);
};

return (
  // ...
  <Route path='/home/leave' element={<LeaveApplication onFormSubmit={handleFormSubmit} />} />
  // ...
);

In the `LeaveApplication` component:
```jsx
// ...
const LeaveApplication = ({ onFormSubmit }) => {
  // ...

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gather form data
    const formData = {
      // ... gather form fields here ...
    };
    // Pass the form data back to the parent component (App) using the onFormSubmit callback
    onFormSubmit(formData);
  };

  // ...
};

In this example, `onFormSubmit` is the callback prop. It is passed to the `LeaveApplication` component as a prop 
and is assigned to the `onFormSubmit` parameter in the component function. When the form in the `LeaveApplication`
component is submitted, the `handleSubmit` function is called, and it uses the `onFormSubmit` callback prop to 
pass the form data (`formData`) back to the `App` component.

The use of callback props allows for flexible communication between components in React, enabling parent 
components to respond to events or data changes triggered by their child components. This pattern is commonly 
used to manage state and data flow in React applications.
*/