import React from "react";
import './Contact.css'
import smartphone from './../images/smartphone.png'

export default function Contact(){
    return(
        <div className="divContactus">
            <h1>Contact Us to BOOK TRIAL</h1>
            <div className="divchildContactus">
                <div className="imgandpindivContactus">
                    <img src={smartphone} alt='' className="imgContactus"></img>
                    <p>8250777256</p>
                </div>
                <div className="imgandpindivContactus">
                    <img src={smartphone} alt='' className="imgContactus"></img>
                    <p>7867635538</p>
                </div>
                <h1 className="h1Contactus">Open 24 X 7</h1>
                <h1 className="h1Contactus">Best Service among all Online Platforms</h1>
                <h1 className="h1Contactus">Student Centric Approach With Modern Pedagogical Methodology</h1>
            </div>
        </div>
    )
}