import React from "react";
import scientist from './../images/scientist.png'
import './Coding.css'
import Button from './../Home/Button.js'

export default function Coding(){
    return(
        <div className="divCoding">
            <div className="divchildCoding">
                <img src={scientist} alt='' className="imgCoding"></img>
                <p>In today's world, learning to code is of paramount importance. It equips individuals with essential skills to navigate the digital landscape, fostering innovation, problem-solving, and creativity. With technology permeating every industry, coding empowers individuals to shape the future, bridging the gap between ideas and implementation, and opening up countless opportunities for personal and professional growth. Learn HTML, CSS, Javascript, React, MongoDB, NodeJS, Java, Python, C++, Flutter, React Native, Machine Learning, Data Science in details with us</p>
            </div>
            <Button />
        </div>
    )
}