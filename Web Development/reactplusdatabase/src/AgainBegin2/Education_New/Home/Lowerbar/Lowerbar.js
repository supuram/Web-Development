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
            <h1 style={{color:'yellow', marginTop:'2rem', marginLeft: '2rem', fontSize: '3rem', fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}>Which Course Do You Want ?</h1>

            <div className='divLowerbar'>
                <div onClick={() => handleButtonClick('/coding')} className='divchildLowerbar'>
                    <h1 className="divchildLowerbarh1">CODING</h1>
                    <ul className="divchildLowerbarul">
                        <li>Learn to build websites with our experienced teachers</li>
                        <li>Learn skills necessary to actually make your mark</li>
                    </ul>
                </div>
                <div onClick={() => handleButtonClick('/science')} className='divchildLowerbar'></div>
                <div onClick={() => handleButtonClick('/maths')} className='divchildLowerbar'></div>
                <div onClick={() => handleButtonClick('/english')} className='divchildLowerbar'></div>
                <div onClick={() => handleButtonClick('/iitjee')} className='divchildLowerbar'></div>
                <div onClick={() => handleButtonClick('/neet')} className='divchildLowerbar'></div>
                <div onClick={() => handleButtonClick('/gre')} className='divchildLowerbar'></div>
                <div onClick={() => handleButtonClick('/foundation')} className='divchildLowerbar'></div>
            </div>

                
        </div>
    )
}