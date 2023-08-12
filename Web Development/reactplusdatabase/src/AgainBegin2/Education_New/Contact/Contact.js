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
                <h3 className="h3divContactus">Call Us - 91-7002561074 , 91-8250192710 , 91-9101043181</h3>
                <h3 className="h3divContactus">Our gmail - tutorverse.info@gmail.com</h3>
                <div className="divchildContactus">
                    <h2>Teachers available all the time</h2>
                    <h2>Dedicated teachers with carefully curated curriculum</h2>
                    <h2>Awesone Teacher-Student relation</h2>
                    <h2>Great understanding of even difficult concept</h2>
                </div>
            </div>
            <div>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf0lZf_a_CneWwkYbc01uQdzv4i_lHCGwIn2RXNFuEusJq3gQ/viewform?embedded=true" width="1140" height="1350" frameborder="0" marginheight="0" marginwidth="0" >Loading…</iframe>
            </div>
        </div>
    )
}