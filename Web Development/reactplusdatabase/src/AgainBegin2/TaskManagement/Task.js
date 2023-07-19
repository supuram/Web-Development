import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import DropdownMenuinTask from "./DropDownMenuinTask";
import UserProfile from "./UserProfile";

const db = firebase.firestore();
export default function Task(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Create a new document in the "tasks" collection
        db.collection("tasks")
          .add({
            name,
            description,
            date,
            priority,
          })
          .then(() => {
            console.log("Task added to Firestore");
            // Reset form fields
            setName("");
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
            <DropdownMenuinTask />
            <form onSubmit={handleSubmit}>
                <label>Enter the name of the Employee</label>
                <input type="name" value={name} onChange={event => {
                    setName(event.target.value)
                }}></input>
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