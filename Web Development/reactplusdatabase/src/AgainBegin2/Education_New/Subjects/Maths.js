import React from "react";
import './Maths.css'
import Navbar from "../Home/Button/Navbar.js";
import Topbar from "../Home/Topbar/Topbar.js";
import './../Home/Home.css'
import { useNavigate } from 'react-router-dom';

export default function Maths(){
    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(path)
    };
    return(
        <div className="divMaths">
            <div className="fixeddivHome">
                <Topbar />
                <Navbar />
            </div>
            <div className="divContainerScience">
                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">PRIMARY</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Basic Mathematics and build your concepts with a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">MIDDLE  SCHOOL</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Mathematics with endless joy and a unique teaching method</p>
                    </div>
                </div>



                <div className="divContainerScienceagain" onClick={() => handleButtonClick('/contactus')}>
                    <div className="childdivContainerScience">
                        <h2 className="h2childdivContainerScience">
                            <span className="span1childdivContainerScience">SECONDARY</span>
                        </h2>
                        <p className="p1childdivContainerScience">Ace your school exams with our experienced tutors and carefully curated syllabus</p>
                        <p className="p2childdivContainerScience">Learn Higher Mathematics with endless joy and a unique teaching method</p>
                    </div>
                </div>
            </div>
        </div>
    )
}