import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import DropdownMenuinTask from "./DropDownMenuinTask";
import UserProfile from "./UserProfile";
import DropdownMenuinTaskAssignedTo from './DropdownMenuinTaskAssignedTo'

const db = firebase.firestore();

export default function Task({ currentUser }){
    const [selectedUsername, setSelectedUsername] = useState("");
    const [selectedUsernameAssignedBy, setSelectedUsernameAssignedBy] = useState(currentUser)
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("");

    const handleUsernameSelect = (username1) => {
        setSelectedUsername(username1); // Update the selected username state
        setSelectedUsernameAssignedBy(currentUser)
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const today = new Date();
        const currdate = today.toISOString();
        console.log(`Adding task to Firestore with AssignedTo: ${selectedUsername}`); 
        // Create a new document in the "tasks" collection
        db.collection("tasks")
          .add({
            AssignedTo:selectedUsername,
            AssignedBy:selectedUsernameAssignedBy,
            description,
            DueDate:date,
            CurrentDate:currdate,
            priority,
          })
          .then(() => {
            console.log("Task added to Firestore");
            // Reset form fields
            setSelectedUsername("");
            setSelectedUsernameAssignedBy("");
            setDescription("");
            setDate("");
            setPriority("");
          })
          .catch((error) => {
            console.error("Error adding task to Firestore: ", error);
          });
    };
    return(
        <div>
            <UserProfile />
            <form onSubmit={handleSubmit}>
                <DropdownMenuinTask currentUser={currentUser} />
                <label>Task Assigned to</label>
                <DropdownMenuinTaskAssignedTo onUsernameSelect={handleUsernameSelect}/>
                <label>Describe the Task</label>
                <input type="description" value={description} onChange={event => {
                    setDescription(event.target.value)
                }}></input>
                <label>What is the due date</label>
                <input type="date" value={date} onChange={event => {
                    setDate(event.target.value)
                }}></input>
                <label>Set the Priority</label>
                <input type="priority" value={priority} onChange={event => {
                    setPriority(event.target.value)
                }}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}