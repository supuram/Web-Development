import React, { useState } from "react";
import './Subjects.css'
import tutor from './../images/tutor.jpg'
import Coding from "./Coding.js";
import English from "./English.js";
import Maths from "./Maths.js";
import Science from "./Science.js";
import IITJEE from './IITJEE.js'
import Neet from './Neet.js'
import Gre from './Gre.js'
import Foundation from './Foundation.js'

export default function Subjects(){
    const [showCodingContent, setShowCodingContent] = useState(false);
    const [showScienceContent, setShowScienceContent] = useState(false);
    const [showMathsContent, setShowMathsContent] = useState(false);
    const [showEnglishContent, setShowEnglishContent] = useState(false);
    const [showIITJEEContent, setShowIITJEEContent] = useState(false)
    const [showNeetContent, setShowNeetContent] = useState(false)
    const [showGreContent, setShowGreContent] = useState(false)
    const [showFoundationContent, setShowFoundationContent] = useState(false)

    const handleCodingClick = () => {
        setShowCodingContent(true);
        setShowScienceContent(false);
        setShowMathsContent(false);
        setShowEnglishContent(false);
        setShowIITJEEContent(false);
        setShowNeetContent(false);
        setShowGreContent(false);
        setShowFoundationContent(false);
    };
    const handleScienceClick = () => {
        setShowCodingContent(false);
        setShowScienceContent(true);
        setShowMathsContent(false);
        setShowEnglishContent(false);
        setShowIITJEEContent(false);
        setShowNeetContent(false);
        setShowGreContent(false);
        setShowFoundationContent(false);
    };
    const handleMathsClick = () => {
        setShowCodingContent(false);
        setShowScienceContent(false);
        setShowMathsContent(true);
        setShowEnglishContent(false);
        setShowIITJEEContent(false);
        setShowNeetContent(false);
        setShowGreContent(false);
        setShowFoundationContent(false);
    };
    const handleEnglishClick = () => {
        setShowCodingContent(false);
        setShowScienceContent(false);
        setShowMathsContent(false);
        setShowEnglishContent(true);
        setShowIITJEEContent(false);
        setShowNeetContent(false);
        setShowGreContent(false);
        setShowFoundationContent(false);
    };

    const handleIITJEEClick = () => {
        setShowCodingContent(false);
        setShowScienceContent(false);
        setShowMathsContent(false);
        setShowEnglishContent(false);
        setShowIITJEEContent(true);
        setShowNeetContent(false);
        setShowGreContent(false);
        setShowFoundationContent(false);
    }

    const handleNeetClick = () => {
        setShowCodingContent(false);
        setShowScienceContent(false);
        setShowMathsContent(false);
        setShowEnglishContent(false);
        setShowIITJEEContent(false);
        setShowNeetContent(true);
        setShowGreContent(false);
        setShowFoundationContent(false);
    }

    const handleGreClick = () => {
        setShowCodingContent(false);
        setShowScienceContent(false);
        setShowMathsContent(false);
        setShowEnglishContent(false);
        setShowIITJEEContent(false);
        setShowNeetContent(false);
        setShowGreContent(true);
        setShowFoundationContent(false);
    }

    const handleFoundationClick = () => {
        setShowCodingContent(false);
        setShowScienceContent(false);
        setShowMathsContent(false);
        setShowEnglishContent(false);
        setShowIITJEEContent(false);
        setShowNeetContent(false);
        setShowGreContent(false);
        setShowFoundationContent(true);
    }

    return(
        <div className="divCoding">
            <img src={tutor} alt='' className="iconCoding"></img>
            <ul className="ulSubjects">
                <li onClick={handleCodingClick}>Coding</li>
                <li onClick={handleScienceClick}>Science</li>
                <li onClick={handleMathsClick}>Maths</li>
                <li onClick={handleEnglishClick}>English</li>
                <li onClick={handleIITJEEClick}>IIT-JEE</li>
                <li onClick={handleNeetClick}>NEET</li>
                <li onClick={handleGreClick}>GRE</li>
                <li onClick={handleFoundationClick}>Foundation</li>
            </ul>
            {showCodingContent && <Coding />}
            {showScienceContent && <Science />}
            {showMathsContent && <Maths />}
            {showEnglishContent && <English />}
            {showIITJEEContent && <IITJEE />}
            {showNeetContent && <Neet />}
            {showGreContent && <Gre />}
            {showFoundationContent && <Foundation />}
        </div>
    )
}