import React, { useState } from "react";
import './Contact.css'
import './../Home/Home.css'
import Topbar from './../Home/Topbar/Topbar.js'
import Navbar from './../Home/Button/Navbar.js'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

export default function Contact(){
    const [name, setName] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const today = new Date();
        const currdate = today.toISOString();
        // Create a new document in the "tasks" collection
        db.collection("userinfo")
          .add({
            Name: name,
            CurrentDate: currdate
          })
          .then(() => {
            setName('')
          })
          .catch((error) => {
            console.error("Error adding task to Firestore: ", error);
          });
    };
    return(
        <div>
            <div className="fixeddivHome">
                <Topbar />
                <Navbar />
            </div>
            <div className="divContactus">
                <h3 className="h3divContactus">Call Us - 91-7002561074 , 91-8250192710 , 91-9101043181</h3>
                <h3 className="h3divContactus">Our gmail - tutorverse.info@gmail.com</h3>
                <form onSubmit={handleSubmit}>
                    <input type="name" value={name} placeholder="Name" onChange={event => {
                    setName(event.target.value)
                }}></input>
                <button>Submit</button>
                </form>
            </div>
        </div>
    )
}