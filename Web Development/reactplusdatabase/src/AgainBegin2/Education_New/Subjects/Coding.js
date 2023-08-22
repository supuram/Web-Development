import React from "react";
import Navbar from "../Home/Button/Navbar.js";
import './Coding.css'
import './../Home/Home.css'
import Topbar from "../Home/Topbar/Topbar.js"
import { useNavigate } from 'react-router-dom';

export default function Coding(){
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path)
    };
    
    return(
        <div className="divCoding">
            <div className="fixeddivHome">
                <Topbar />
                <Navbar />
            </div>

            <div className="divContainerCoding">
                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(78, 92, 255)'}}>
                    <div className="childdivContainerCoding1">
                        <h2 className="h2childdivContainerCoding1">
                            <span className="span1childdivContainerCoding1">FULL</span> <span>STACK</span> <span className="span2childdivContainerCoding1">DEVELOPMENT</span>
                        </h2>
                        <p className="p1childdivContainerCoding1">Learn how to build awesome websites and gain skill </p>
                        <p className="p2childdivContainerCoding1">Learn from excellent teachers who will take you on a journey of something you have never experienced</p>
                    </div>
                </div>




                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(13, 98, 3)'}}>
                    <div className="childdivContainerCoding1">
                        <h2 className="h2childdivContainerCoding1">
                            <span className="span1childdivContainerCoding1">REACT</span><span>FULL</span><span className="span2childdivContainerCoding1">COURSE</span>
                        </h2>
                        <p className="p1childdivContainerCoding1">Learn one of the most versatile frameworks React from our experienced teachers</p>
                        <p className="p2childdivContainerCoding1">Learn to build industry grade professional websites</p>
                    </div>
                </div>




                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(184, 64, 4)'}}>
                    <div className="childdivContainerCoding1">
                        <h2 className="h2childdivContainerCoding1">
                            <span className="span1childdivContainerCoding1">PYTHON</span><span>FULL</span><span className="span2childdivContainerCoding1">COURSE</span>
                        </h2>
                        <p className="p1childdivContainerCoding1">Learn all about Python, build games, apps and many more</p>
                        <p className="p2childdivContainerCoding1">With our experienced tutors gain a deep understanding of Python</p>
                    </div>
                </div>


                
                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(102, 5, 110)'}}>
                    <div className="childdivContainerCoding1">
                        <h2 className="h2childdivContainerCoding1">
                            <span className="span1childdivContainerCoding1">JAVASCRIPT</span><span>FULL</span><span className="span2childdivContainerCoding1">COURSE</span>
                        </h2>
                        <p className="p1childdivContainerCoding1">Learn Javascript by building awesome projects</p>
                        <p className="p2childdivContainerCoding1">With our experienced tutors delve into the world of javascript and build awesome websites</p>
                    </div>
                </div>



                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(228, 209, 0)'}}>
                    <div className="childdivContainerCoding1">
                        <h2 className="h2childdivContainerCoding1">
                            <span className="span1childdivContainerCoding1">JAVA</span><span>FULL</span><span className="span2childdivContainerCoding1">COURSE</span>
                        </h2>
                        <p className="p1childdivContainerCoding1">Learn Java by building awesome projects</p>
                        <p className="p2childdivContainerCoding1">With our experienced tutors delve into the world of java and learn DSA</p>
                    </div>
                </div>



                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/contactus')}>
                    <div className="childdivContainerCoding1">
                        <h2 className="h2childdivContainerCoding1">
                            <span className="span1childdivContainerCoding1">C++</span><span>FULL</span><span className="span2childdivContainerCoding1">COURSE</span>
                        </h2>
                        <p className="p1childdivContainerCoding1">Learn DSA using C++</p>
                        <p className="p2childdivContainerCoding1">With our experienced tutors delve into the world of C++</p>
                    </div>
                </div>



                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(0, 211, 194)'}}>
                    <div className="childdivContainerCoding1">
                        <h2 className="h2childdivContainerCoding1">
                            <span className="span1childdivContainerCoding1">REACT</span><span>FULL</span><span className="span2childdivContainerCoding1">COURSE</span>
                        </h2>
                        <p className="p1childdivContainerCoding1">Learn Web Development using react and build powerful websites</p>
                        <p className="p2childdivContainerCoding1">With our experienced tutors delve into the world of React and build awesome websites</p>
                    </div>
                </div>



                <div className="divContainerCodingagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(174, 0, 148)'}}>
                    <div className="childdivContainerCoding1">
                        <h2 className="h2childdivContainerCoding1">
                            <span className="span1childdivContainerCoding1">ML</span><span className="span2childdivContainerCoding1">COURSE</span>
                        </h2>
                        <p className="p1childdivContainerCoding1">Learn ML, Tensorflow, Deep Learning and many more</p>
                        <p className="p2childdivContainerCoding1">With our experienced tutors delve into the world of Machine Learning by building projects</p>
                    </div>
                </div>


            </div>
            
            
        </div>
    )
}