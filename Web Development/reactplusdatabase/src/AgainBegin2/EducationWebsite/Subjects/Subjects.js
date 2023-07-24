import React, { useState } from "react";
import './Subjects.css'
import Coding from './Coding.js'
import Science from './Science.js'
import Maths from './Maths.js'
import English from './English.js'

export default function Subjects(){
    const [showCodingContent, setShowCodingContent] = useState(false);
    const [showScienceContent, setShowScienceContent] = useState(false);
    const [showMathsContent, setShowMathsContent] = useState(false);
    const [showEnglishContent, setShowEnglishContent] = useState(false);

    const handleCodingClick = () => {
        setShowCodingContent(true);
        setShowScienceContent(false);
        setShowMathsContent(false);
        setShowEnglishContent(false);
    };
    const handleScienceClick = () => {
        setShowCodingContent(false);
        setShowScienceContent(true);
        setShowMathsContent(false);
        setShowEnglishContent(false);
    };
    const handleMathsClick = () => {
        setShowCodingContent(false);
        setShowScienceContent(false);
        setShowMathsContent(true);
        setShowEnglishContent(false);
    };
    const handleEnglishClick = () => {
        setShowCodingContent(false);
        setShowScienceContent(false);
        setShowMathsContent(false);
        setShowEnglishContent(true);
    };

    return(
        <div className="divSubjects">
            <ul className="ulSubjects">
                <li onClick={handleCodingClick}>Coding</li>
                <li onClick={handleScienceClick}>Science</li>
                <li onClick={handleMathsClick}>Maths</li>
                <li onClick={handleEnglishClick}>English</li>
            </ul>
            {showCodingContent && <Coding />}
            {showScienceContent && <Science />}
            {showMathsContent && <Maths />}
            {showEnglishContent && <English />}
        </div>
    )
}