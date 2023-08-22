import React from "react";
import Navbar from "../Home/Button/Navbar.js";
import './../Home/Home.css'
import Topbar from "../Home/Topbar/Topbar.js"
import './Humanities.css'
import { useNavigate } from 'react-router-dom';

export default function Humanities(){
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
                            <span className="span1childdivContainerScience">POLITICAL SCIENCE</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Political Science and build your concepts with a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(174, 10, 18)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">HISTORY</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn History with endless joy and a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(14, 100, 189)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">GEOGRAPHY</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Geography with endless joy and a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(14, 10, 189)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">SOCIOLOGY</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Sociology with endless joy and a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(194, 100, 19)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">PSYCHOLOGY</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Psychology with endless joy and a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')} style={{backgroundColor:'rgb(149, 20, 89)'}}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">HINDI</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Hindi with endless joy and a unique teaching method</p>
                    </div>
                </div>
            </div>
        </div>
    )
}