import React, { useState, useEffect } from "react";
import { getAllUsernames } from "./DropdownMenuinTaskAssignedTo";

export default function LeaveApplication({setLeaveRequestData, onFormSubmit}){
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
       
         // Pass the values up to the App component using the setLeaveRequestData function
         setLeaveRequestData({ employeeName: employeeNameValue, reason: reasonValue, fromDate: fromDateValue, toDate: toDateValue, leaveby: leavebyValue });
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