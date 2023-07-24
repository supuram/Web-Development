import React from "react";
import maths from './../images/maths.png'
import './Maths.css'
import Button from './../Home/Button.js'

export default function Maths(){
    return(
        <div className="divMaths">
            <div className="divchildMaths">
                <img src={maths} alt='' className="imgMaths"></img> 
                <p>In today's world, learning math online holds immense significance. Math is the backbone of various fields, including science, technology, engineering, and finance. Online platforms offer interactive resources, personalized learning, and real-world applications, making math accessible to all, fostering problem-solving skills, and preparing individuals for a data-driven and technologically advanced future.</p>
            </div>
            <Button />
        </div>
    )
}