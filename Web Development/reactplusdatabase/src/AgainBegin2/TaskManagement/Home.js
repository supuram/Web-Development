import React from 'react';
import { auth } from './firebase';
import Task from './Task.js'

const Home = () => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Log out successful, perform any additional actions if needed
      })
      .catch((error) => {
        // Handle error if logout fails
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Hi, This is Firebase</h1>
      <Task />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Home;