import React from "react";
import { auth } from './firebase';
import { Link } from 'react-router-dom';

export default function Logout(){
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
    return(
        <div>
            <Link 
                onClick={handleLogout}
                style={{
                    textDecoration:'none'
                }}>Logout</Link>
        </div>
    )
}