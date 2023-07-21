import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

export default function TasksAssignedByOthers({ currentUser }){
    const [tasks, setTasks] = useState([]);
    console.log(currentUser)
    useEffect(() => {
        // Listen for real-time updates to the tasks collection
        const unsubscribe = db.collection('tasks')
          .where('AssignedTo', '==', currentUser)
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

/**
*! VVVVVVVVVVVVI 
The TaskAssignedByOthers component does not directly receive data from the Task component. Instead, it 
listens for real-time updates to the tasks collection in the Firestore database and displays tasks that 
are assigned to a specific employee.

When a new task is added to the Firestore database using the form in the Task component, the onSnapshot 
listener in the TasksAssignedByOthers component will be triggered and update the tasks state with the 
latest data from the Firestore database. This state is then used to render the tasks in the TasksAssigned
ByOthers component.

In other words, the TaskAssignedByOthers component gets its data from the Firestore database, not directly from the Task component. The form in the Task component is used to add new tasks to the Firestore database, and these tasks are then displayed in real-time in the TasksAssignedByOthers component by listening for updates to the Firestore database.
*/