import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Profile from './Profile.js'
import TasksAssignedByOthers from './TasksAssignedByOthers';
import TasksGivenToOthers from './TasksGivenToOthers'
import Brainstorm from './Brainstorm.js'
import EmployeeList from './EmployeeList.js'
import CodeOfConduct from './CodeOfConduct.js'
import LeaveApplication from './LeaveApplication'
import {LeaveRequestReceived} from './LeaveRequestReceived.js'

const db = firebase.firestore();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
        // Get the user's email address
        const email = user.email;
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
      } 
      else {
        setIsLoggedIn(false); // User is not logged in
        setCurrentUsername("");
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/forgot-password">Forgot Password</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/home/profile' element={<Profile />} />
          <Route path='/home/tabo' element={<TasksAssignedByOthers currentUser={currentUsername} />} />
          <Route path='/home/tgto' element={<TasksGivenToOthers currentUser={currentUsername} />} />
          <Route path='/home/brainstorm' element={<Brainstorm />} />
          <Route path='/home/employeelist' element={<EmployeeList />} />
          <Route path='/home/codeofconduct' element={<CodeOfConduct />} />
          <Route path='/home/leave' element={<LeaveApplication currentUser={currentUsername} />} />
          <Route path='/home/lrr' element={<LeaveRequestReceived />} />
          {isLoggedIn && <Route path="/home" element={<Home />} />} 
        </Routes>
      </div>
    </Router>
  );
};
export default App;