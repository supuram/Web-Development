import React from "react";
import scientist1 from './../images/scientist1.png'
import './Science.css'
import Button from './../Home/Button.js'
import Navbar from "../Home/Button/Navbar.js";
import Topbar from "../Home/Topbar/Topbar.js";

export default function Science(){
    return(
        <div className="divScience">
            <Topbar />
            <Navbar />
            <div className="divchildScience">
                <img src={scientist1} alt='' className="imgScience"></img>   
                <p>In today's world, the significance of learning science online cannot be overstated. Online education offers unparalleled accessibility, enabling learners to explore diverse scientific disciplines conveniently. It fosters curiosity, critical thinking, and problem-solving skills, nurturing the next generation of scientists. With vast resources and interactive tools, online science education empowers individuals to contribute meaningfully to scientific advancements and address global challenges.</p>     
            </div>
            <Button />
        </div>
    )
}