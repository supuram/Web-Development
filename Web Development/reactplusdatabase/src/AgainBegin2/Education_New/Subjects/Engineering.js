import React from "react";
import Navbar from "../Home/Button/Navbar.js";
import './../Home/Home.css'
import Topbar from "../Home/Topbar/Topbar.js"
import './Engineering.css'
import { useNavigate } from 'react-router-dom';

export default function Engineering(){
    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(path)
    };
    return(
        <div>
            <div className="fixeddivHome">
                <Topbar />
                <Navbar />
            </div>
            <div className="divContainerScience">
                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(114, 100, 18)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">MECHANICAL ENGINEERING</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your college exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Mechanical Engineering and build your concepts with a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(174, 10, 18)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">CIVIL ENGINEERING</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your college exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Civil Engineering with endless joy and a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(14, 100, 189)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">CHEMICAL ENGINEERING</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your college exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Chemical Engineering with endless joy and a unique teaching method</p>
                    </div>
                </div>
            </div>
        </div>
    )
}