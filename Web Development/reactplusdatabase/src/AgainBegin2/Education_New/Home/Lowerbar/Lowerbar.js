import React from "react";
import './Lowerbar.css';
import { useNavigate } from 'react-router-dom';

export default function Lowerbar(){
    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(path)
    };
    return(
        <div className="divmainLowerbar">
            <h1 style={{color:'black', marginTop:'2rem', marginLeft: '2rem', fontSize: '3rem', fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" }}>Which Course Do You Want ?</h1>

            <div className='divLowerbar'>
                <div onClick={() => handleButtonClick('/coding')} className='divchildLowerbar' style={{backgroundColor:'rgb(78, 92, 255)'}}>
                    <h1 className="divchildLowerbarh1">CODING</h1>
                    <ul className="divchildLowerbarul">
                        <li className="lidivchildLowerbarul">Learn to build websites with our experienced teachers</li>
                        <li>Learn skills necessary to actually make your mark</li>
                    </ul>
                </div>


                <div onClick={() => handleButtonClick('/science')} className='divchildLowerbar' style={{backgroundColor:'rgb(13, 98, 3)'}}>
                    <h1 className="divchildLowerbarh1">SCIENCE</h1>
                    <ul className="divchildLowerbarul">
                        <li className="lidivchildLowerbarul">Learn how to build a curious mind</li>
                        <li>With our experienced tutors delve into the world of Science</li>
                    </ul>
                </div>


                <div onClick={() => handleButtonClick('/maths')} className='divchildLowerbar' style={{backgroundColor:'rgb(184, 64, 4)'}}>
                    <h1 className="divchildLowerbarh1">MATHS</h1>
                    <ul className="divchildLowerbarul">
                        <li className="lidivchildLowerbarul">Build a solid understanding of Maths with our carefully curated course</li>
                        <li>With our experienced tutors delve into the world of Maths and start enjoying it</li>
                    </ul>
                </div>


                <div onClick={() => handleButtonClick('/english')} className='divchildLowerbar' style={{backgroundColor:'rgb(102, 5, 110)'}}>
                    <h1 className="divchildLowerbarh1">English</h1>
                    <ul className="divchildLowerbarul">
                        <li className="lidivchildLowerbarul">Learn English with our experienced tutors</li>
                        <li>With our experienced tutors delve into the world of English</li>
                    </ul>
                </div>


                <div onClick={() => handleButtonClick('/iitjee')} className='divchildLowerbar' style={{backgroundColor:'rgb(228, 209, 0)'}}>
                    <h1 className="divchildLowerbarh1">IIT-JEE</h1>
                    <ul className="divchildLowerbarul">
                        <li className="lidivchildLowerbarul">Crack the most toughest exam in the world with our experienced tutors</li>
                        <li>Build a solid understanding of concepts and crack JEE with ease</li>
                    </ul>
                </div>


                <div onClick={() => handleButtonClick('/neet')} className='divchildLowerbar'>
                    <h1 className="divchildLowerbarh1">NEET</h1>
                    <ul className="divchildLowerbarul">
                        <li className="lidivchildLowerbarul">Crack the most toughest medical entrance exam in the world with our experienced tutors</li>
                        <li>With our experienced tutors fulfill your dream of becoming a doctor</li>
                    </ul>
                </div>


                <div onClick={() => handleButtonClick('/gre')} className='divchildLowerbar' style={{backgroundColor:'rgb(0, 211, 194)'}}>
                    <h1 className="divchildLowerbarh1">GRE</h1>
                    <ul className="divchildLowerbarul">
                        <li className="lidivchildLowerbarul">Want to study in foreign universities ?Look no far. This is your place to be</li>
                        <li>With our experienced tutors fulfill your dream of studying abroad</li>
                    </ul>
                </div>


                <div onClick={() => handleButtonClick('/humanities')} className='divchildLowerbar' style={{backgroundColor:'rgb(174, 0, 148)'}}>
                    <h1 className="divchildLowerbarh1">HUMANITIES</h1>
                    <ul className="divchildLowerbarul">
                        <li className="lidivchildLowerbarul">Are you in class 6-12 or in College or in University ?  Do not worry. </li>
                        <li>With our experienced tutors grasp difficult concepts and be prepared for your humanities courses</li>
                    </ul>
                </div>


                <div onClick={() => handleButtonClick('/engineering')} className='divchildLowerbar' style={{backgroundColor:'rgb(45, 50, 181)'}}>
                    <h1 className="divchildLowerbarh1">ENGINEERING</h1>
                    <ul className="divchildLowerbarul">
                        <li className="lidivchildLowerbarul">Are you in class 6-12 or in College or in University ?  Do not worry. </li>
                        <li>With our experienced tutors grasp difficult concepts and be prepared for your humanities courses</li>
                    </ul>
                </div>
            </div>  
        </div>
    )
}