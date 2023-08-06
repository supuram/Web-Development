import React from "react";
import './Lowerbar.css';
import { useNavigate } from 'react-router-dom';
import st1 from './../../images/Lowerbar/1.svg'
import st2 from './../../images/Lowerbar/2.svg'
import st3 from './../../images/Lowerbar/3.svg'
import st4 from './../../images/Lowerbar/4.svg'
import st5 from './../../images/Lowerbar/5.svg'
import st6 from './../../images/Lowerbar/6.svg'
import st7 from './../../images/Lowerbar/7.svg'
import st8 from './../../images/Lowerbar/8.svg'

export default function Lowerbar(){
    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(path)
    };
    return(
        <div className="divmainLowerbar">
            <h1 style={{color:'yellow', marginTop:'2rem', marginLeft: '2rem', fontSize: '3rem', fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}>Which Course Do You Want ?</h1>
            
                <img src={st1} alt='' onClick={() => handleButtonClick('/coding')}  className='imgLowerbar'></img>
                <img src={st2} alt='' onClick={() => handleButtonClick('/science')} className='imgLowerbar'></img>
                <img src={st3} alt=''  onClick={() => handleButtonClick('/maths')} className='imgLowerbar'></img>

                <img src={st4} alt='' onClick={() => handleButtonClick('/english')}  className='imgLowerbar'></img>
                <img src={st5} alt='' onClick={() => handleButtonClick('/iitjee')} className='imgLowerbar'></img>
                <img src={st6} alt=''  onClick={() => handleButtonClick('/neet')} className='imgLowerbar'></img>

                <img src={st7} alt='' onClick={() => handleButtonClick('/gre')}  className='imgLowerbar'></img>
                <img src={st8} alt='' onClick={() => handleButtonClick('/foundation')} className='imgLowerbar'></img>

                
        </div>
    )
}