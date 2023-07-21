import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

// Get all registered usernames
const getAllUsernames = async () => {
  // Get a reference to the "users" collection
  const usersRef = db.collection('users');

  // Get all documents in the "users" collection
  const snapshot = await usersRef.get();
  console.log(snapshot)

  // Create an array to store the usernames
  const usernames = [];

  // Loop over each document in the snapshot
  snapshot.forEach((doc) => {
    // Get the data of the document
    const data = doc.data();

    // Get the username from the data
    const username = data.username;

    // Add the username to the array
    usernames.push(username);
  });

  // Return the array of usernames
  return usernames;
};
export { getAllUsernames };

const DropdownMenuinTaskAssignedTo = ({ onUsernameSelect }) => {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernames = await getAllUsernames();
      setUsernames(usernames);
    };

    fetchUsernames();
  }, []);

  return (
    <div>
        <select id="employeeName" onChange={(e) => onUsernameSelect(e.target.value)}>
            <option value="">Select an employee</option>
            {usernames.map((username1) => (
                <option key={username1} value={username1}>
                {username1}
            </option>
            ))}
        </select>
    </div>
  );
};
export default DropdownMenuinTaskAssignedTo;