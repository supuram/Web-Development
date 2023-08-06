import React, { useState } from "react";
import Navbar from "../Home/Button/Navbar.js";
import './Coding.css'
import Topbar from "../Home/Topbar/Topbar.js"
import { useNavigate } from 'react-router-dom';
import code1 from './../images/4.svg'
import code2 from './../images/Coding/2.svg'
import code3 from './../images/Coding/3.svg'
import code4 from './../images/Coding/4.svg'
import code5 from './../images/Coding/5.svg'
import code6 from './../images/Coding/6.svg'
import code7 from './../images/Coding/7.svg'
import code8 from './../images/Coding/8.svg'

export default function Coding(){
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path)
    };
    
    return(
        <div className="divCoding">
            <Topbar />
            <Navbar/>



{/*
            <div className="divContainerCoding">
                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/coding/webdev')}>
                    <div className="childdivContainerCoding1">
                        <h2 className="h2childdivContainerCoding1WebDev">
                            <span className="spanchilddivContainerCoding1WebDev">FULL</span> <span>STACK</span> <span className="spanDevelopmentchilddivContainerCoding1WebDev">DEVELOPMENT</span>
                        </h2>
                        <p className="p1childdivContainerCoding1WebDev">Learn how to build awesome websites and gain skill </p>
                        <p className="p2childdivContainerCoding1WebDev">Learn from excellent teachers who will take you on a journey of something you have never experienced</p>
                    </div>
                </div>




                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/coding/reactteach')}>
                    <div className="childdivContainerCoding1">
                        <h2 className="h2childdivContainerCoding1ReactTeach">
                            <span className="spanReactchilddivContainerCoding1">REACT</span><span>FULL</span><span className="spanCoursechilddivContainerCoding1ReactTeach">COURSE</span>
                        </h2>
                        <p className="p1childdivContainerCoding1ReactTeach">Learn one of the most versatile frameworks React from our experienced teachers</p>
                        <p className="p2childdivContainerCoding1ReactTeach">Learn to build industry grade professional websites</p>
                    </div>
                </div>




                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/coding/python')}>
                    <div className="childdivContainerCoding1">

                    </div>
                </div>


                
                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/coding/javascript')}>
                    <div className="childdivContainerCoding1">

                    </div>
                </div>
            </div>
            */}
            <img src={code1} alt='' className="imgCoding"></img>
            <img src={code2} alt='' className="imgCoding"></img>
            <img src={code3} alt='' className="imgCoding"></img>
            <img src={code4} alt='' className="imgCoding"></img>
            <img src={code5} alt='' className="imgCoding"></img>
            <img src={code6} alt='' className="imgCoding"></img>
            <img src={code7} alt='' className="imgCoding"></img>
            <img src={code8} alt='' className="imgCoding"></img>
        </div>
    )
}