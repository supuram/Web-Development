import React from "react";
import './Lowerbar.css';
import { Link } from 'react-router-dom'

export default function Lowerbar(){
    return(
        <div className="divmainLowerbar">
            <h1>Which Course Do You Want ?</h1>
            <div className="divLowerbar">
                <button className="codingLowerbar buttonLowerbar"><Link to='/coding' className="navButtonLowerbar">Coding</Link></button>
                <button className="scienceLowerbar buttonLowerbar"><Link to='/science' className="navButtonLowerbar">Science</Link></button>
                <button className="mathsLowerbar buttonLowerbar"><Link to='/maths' className="navButtonLowerbar">Maths</Link></button>
                <button className="englishLowerbar buttonLowerbar"><Link to='/english' className="navButtonLowerbar">English</Link></button>
                <button className="jeeLowerbar buttonLowerbar"><Link to='/iitjee' className="navButtonLowerbar">IIT-JEE</Link></button>
                <button className="neetLowerbar buttonLowerbar"><Link to='/neet' className="navButtonLowerbar">NEET</Link></button>
                <button className="greLowerbar buttonLowerbar"><Link to='/gre' className="navButtonLowerbar">GRE</Link></button>
                <button className="foundationLowerbar buttonLowerbar"><Link to='/foundation' className="navButtonLowerbar">Foundation</Link></button>
            </div>
        </div>
    )
}