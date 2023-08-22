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
            <img src={student1} alt='' className="imgMiddlebar"></img>
            <div className="textOverlaydivMiddlebar">
                <h4 className="animatedHeadingMiddlebar">BUILD</h4>
                <h4 className="animatedHeadingMiddlebar">CREATE</h4>
                <h4 className="animatedHeadingMiddlebar">THINK</h4>
            </div>
        </div>
    )
}