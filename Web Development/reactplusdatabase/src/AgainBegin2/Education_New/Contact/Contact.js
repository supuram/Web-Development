import React from "react";
import './Contact.css'
import './../Home/Home.css'
import Topbar from './../Home/Topbar/Topbar.js'
import Navbar from './../Home/Button/Navbar.js'

export default function Contact(){
    return(
        <div>
            <div className="fixeddivHome">
                <Topbar />
                <Navbar />
            </div>
            <div className="divContactus">
                <h3 className="h3divContactus">Call Us - 7002561074 , 8250192710 , 9101043181</h3>
                <div className="divchildContactus">
                    <h2>Teachers available all the time</h2>
                    <h2>Dedicated teachers with carefully curated curriculum</h2>
                    <h2>Awesone Teacher-Student relation</h2>
                    <h2>Great understanding of even difficult concept</h2>
                </div>
            </div>
        </div>
    )
}