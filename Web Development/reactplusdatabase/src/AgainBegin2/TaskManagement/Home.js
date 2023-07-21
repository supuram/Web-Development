import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Task from './Task.js'
import LeftDashBoard from './LeftDashBoard.js'
import './Home.css'

const auth = firebase.auth();
const db = firebase.firestore();

const Home = () => {
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        // Get the user's email address
        const email = user.email;

        // Query the Firestore database to get the current user's username
        db.collection('users')
          .where('email', '==', email)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              // Get the first document in the query result
              const doc = querySnapshot.docs[0];
              // Get the data of the document
              const data = doc.data();
              // Get the username from the data
              const username = data.username;
              // Update the currentUsername state with the current user's username
              setCurrentUsername(username);
            }
          })
          .catch((error) => {
            console.error("Error getting current user's username: ", error);
          });
      } else {
        // User is signed out
        setCurrentUsername("");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className='divHome'>
      <LeftDashBoard />
      <Task currentUser={currentUsername} />
    </div>
  );
};
export default Home;