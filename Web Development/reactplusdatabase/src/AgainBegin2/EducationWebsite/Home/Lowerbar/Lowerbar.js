import React from "react";
import './Lowerbar.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Lowerbar(){
    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(path)
    };
    return(
        <div className="divmainLowerbar">
            <h1 style={{color:'yellow', marginTop:'2rem', marginLeft: '2rem', fontSize: '3rem'}}>Which Course Do You Want ?</h1>
            <div className="divLowerbar">
                <div className="codingLowerbar buttonLowerbar"
                    onClick={() => handleButtonClick('/coding')}
                    style={{
                        width:'23rem',
                        height:'25rem',
                    }}>
                    <div className="divLowerbarHead">CODING</div>
                    <div className="divLowerbarul"><ul>
                        <li>Learn From the Best Teachers</li>
                        <li>Personal Care and attention</li>
                        <li>Learning is always fun</li></ul>
                    </div>
                </div>


                <div className="scienceLowerbar buttonLowerbar"
                    onClick={() => handleButtonClick('/science')}
                    style={{
                        width:'23rem',
                        height:'25rem',
                    }}>
                    <div className="divLowerbarHead">SCIENCE</div>
                    <div className="divLowerbarul"><ul>
                        <li>Learn From the Best Teachers</li>
                        <li>Personal Care and attention</li>
                        <li>Learning is always fun</li></ul>
                    </div>
                </div>


                <div className="mathsLowerbar buttonLowerbar"
                    onClick={() => handleButtonClick('/maths')}
                    style={{
                        width:'23rem',
                        height:'25rem',
                        
                    }}>
                    <div className="divLowerbarHead">MATHS</div>
                    <div className="divLowerbarul"><ul>
                        <li>Learn From the Best Teachers</li>
                        <li>Personal Care and attention</li>
                        <li>Learning is always fun</li></ul>
                    </div>
                </div>


                <div className="englishLowerbar buttonLowerbar"
                    onClick={() => handleButtonClick('/english')}
                    style={{
                        width:'23rem',
                        height:'25rem',
                    }}>
                    <div className="divLowerbarHead">ENGLISH</div>
                    <div className="divLowerbarul"><ul>
                        <li>Learn From the Best Teachers</li>
                        <li>Personal Care and attention</li>
                        <li>Learning is always fun</li></ul>
                    </div>
                </div>


                <div className="jeeLowerbar buttonLowerbar"
                    onClick={() => handleButtonClick('/iitjee')}
                    style={{
                        width:'23rem',
                        height:'25rem',
                    }}>
                    <div className="divLowerbarHead">IIT-JEE</div>
                    <div className="divLowerbarul"><ul>
                        <li>Learn From the Best Teachers</li>
                        <li>Personal Care and attention</li>
                        <li>Learning is always fun</li></ul>
                    </div>
                </div>


                <div className="neetLowerbar buttonLowerbar"
                    onClick={() => handleButtonClick('/neet')}
                    style={{
                        width:'23rem',
                        height:'25rem',
                    }}>
                    <div className="divLowerbarHead">NEET</div>
                    <div className="divLowerbarul"><ul>
                        <li>Learn From the Best Teachers</li>
                        <li>Personal Care and attention</li>
                        <li>Learning is always fun</li></ul>
                    </div>
                </div>


                <div className="greLowerbar buttonLowerbar"
                    onClick={() => handleButtonClick('/gre')}
                    style={{
                        width:'23rem',
                        height:'25rem',
                    }}>
                    <div className="divLowerbarHead">GRE</div>
                    <div className="divLowerbarul"><ul>
                        <li>Learn From the Best Teachers</li>
                        <li>Personal Care and attention</li>
                        <li>Learning is always fun</li></ul>
                    </div>
                </div>


                <div className="foundationLowerbar buttonLowerbar"
                    onClick={() => handleButtonClick('/foundation')}
                    style={{
                        width:'23rem',
                        height:'25rem',
                    }}>
                    <div className="divLowerbarHead">FOUNDATION</div>
                    <div className="divLowerbarul"><ul>
                        <li>Learn From the Best Teachers</li>
                        <li>Personal Care and attention</li>
                        <li>Learning is always fun</li></ul>
                    </div>
                </div>
            </div>
        </div>
    )
}