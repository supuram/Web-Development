import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

export default function TasksGivenToOthers({ currentUser }){
    const [tasks, setTasks] = useState([]);
    console.log(currentUser)
    useEffect(() => {
        // Listen for real-time updates to the tasks collection
        const unsubscribe = db.collection('tasks')
          .where('AssignedBy', '==', currentUser)
          .onSnapshot((querySnapshot) => {
            // Create an array to store the tasks
            const tasks = [];
            // Loop over each document in the query result
            querySnapshot.forEach((doc) => {
              // Get the data of the document
              const data = doc.data();
              // Add the data to the tasks array
              tasks.push(data);
            });
            // Update the tasks state with the tasks data
            setTasks(tasks);
            console.log(tasks)
          });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return(
        <div>
            {/* Render the tasks data */}
            {tasks.map((task, index) => (
                <div key={index}>
                    <h2>Task {index + 1}</h2>
                    <p>Assigned To: {task.AssignedTo}</p>
                    <p>Assigned By: {task.AssignedBy}</p>
                    <p>Description: {task.description}</p>
                    <p>Due Date: {task.DueDate}</p>
                    <p>Current Date: {task.CurrentDate}</p>
                    <p>Priority: {task.priority}</p>
                </div>
            ))}
        </div>
    )
}