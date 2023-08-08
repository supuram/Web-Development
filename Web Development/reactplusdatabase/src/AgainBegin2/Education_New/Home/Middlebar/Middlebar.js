import React, { useEffect } from "react";
import './Middlebar.css'
import student1 from './../../images/1.svg'

export default function Middlebar(){
    useEffect(() => {
        // Add the "active" class to the h1 elements after a delay
        const headings = document.querySelectorAll('.animatedHeadingMiddlebar');
        headings.forEach((heading, index) => {
          setTimeout(() => {
            heading.classList.add('active1');
          }, index * 1000); // Adjust the delay as needed for your desired animation effect
        });
      }, []);
    return(
        <div className="divMiddlebar">
            <img src={student1} alt='' style={{width:'79rem', marginTop:'1rem'}}></img>
            <div className="textOverlaydivMiddlebar">
                <h1 className="animatedHeadingMiddlebar">BUILD</h1>
                <h1 className="animatedHeadingMiddlebar">CREATE</h1>
                <h1 className="animatedHeadingMiddlebar">THINK</h1>
            </div>
        </div>
    )
}