import React, {useState, useEffect} from "react";
import { getAllUsernames } from "./DropdownMenuinTaskAssignedTo";

export default function EmployeeList(){
    const [usernames, setUsernames] = useState([]);
    useEffect(() => {
        const fetchUsernames = async () => {
          const usernames = await getAllUsernames();
          setUsernames(usernames);
        };  
        fetchUsernames();
    }, []);
    return(
        <div>
            <h2>Employee List</h2>
            <ul>
                {usernames.map((username, index) => (
                <li key={index}>{username}</li>
                ))}
            </ul>
        </div>
    )
}