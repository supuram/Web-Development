import React, { useState, useEffect } from "react";
import { getAllUsernames } from "./DropdownMenuinTaskAssignedTo";
import { handleLeaveRequest } from './LeaveRequestReceived'

export default function LeaveApplication({currentUser}){
    const [text, setText] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [employeeName, setEmployeeName] = useState("");
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
        handleLeaveRequest(employeeName, text, fromDate, toDate, currentUser);
    }
    return(
        <div>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
                <select id="employeeName" onChange={e => setEmployeeName(e.target.value)}>
                    <label>Addressed To</label>
                    <option value="">Select an employee</option>
                    {usernames.map((username1) => (
                        <option key={username1} value={username1}>
                        {username1}
                        </option>
                    ))}
                </select>
                <input
                    type='text'
                    value={text}
                    onChange={e => setText(e.target.value)}
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
                <button>Submit</button>
            </form>
        </div>
    )
}