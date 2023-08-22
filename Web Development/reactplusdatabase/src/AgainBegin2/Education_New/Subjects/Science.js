import React from "react";
import './Science.css'
import Navbar from "../Home/Button/Navbar.js";
import Topbar from "../Home/Topbar/Topbar.js";
import './../Home/Home.css'
import { useNavigate } from 'react-router-dom';

export default function Science(){
    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(path)
    };
    return(
        <div className="divScience">
            <div className="fixeddivHome">
                <Topbar />
                <Navbar />
            </div>
            <div className="divContainerScience">
                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(174, 0, 148)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">PHYSICS</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Physics with endless joy and a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(14, 0, 148)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">CHEMISTRY</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Chemistry with endless joy and a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(174, 100, 18)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">BIOLOGY</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Biology with endless joy and a unique teaching method</p>
                    </div>
                </div>
            </div>
        </div>
    )
}