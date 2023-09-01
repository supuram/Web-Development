import React, { useState } from "react";
import './Contact.css'
import './../Home/Home.css'
import Topbar from './../Home/Topbar/Topbar.js'
import Navbar from './../Home/Button/Navbar.js'
import { firebase } from './../firebase.js'; 
import 'firebase/compat/firestore';

const db = firebase.firestore();
console.log('contact')
export default function Contact(){
    const [name, setName] = useState('')
    const [division, setDivision] = useState('')
    const [subject, setSubject] = useState('')
    const [choice, setChoice] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const today = new Date();
        const currdate = today.toISOString();
        // Create a new document in the "tasks" collection
        db.collection("userinfo")
          .add({
            Name: name,
            WhichClass: division,
            SubjectInterested: subject,
            Batch_or_OnetoOne: choice,
            CurrentDate: currdate
          })
          .then(() => {
            setName('')
            setDivision('')
            setSubject('')
            setChoice('')
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
                <form className="formdivContactus" onSubmit={handleSubmit}>
                    <input type="text" value={name} placeholder="Name" onChange={event => {
                      setName(event.target.value)
                    }}></input>
                    <input type="text" value={division} placeholder="Your Class" onChange={event => {
                      setDivision(event.target.value)
                    }}></input>
                    <input type="text" value={subject} placeholder="Subject You want classes in" onChange=  {event => { setSubject(event.target.value)
                    }}></input>
                    <input type="text" value={choice} placeholder="Batch or One-to-one lesson" onChange=  {event => { setChoice(event.target.value)
                    }}></input>
                <button>Submit</button>
                </form>
            </div>
        </div>
    )
}