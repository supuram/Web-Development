import React from "react";
import squirrel from './../../images/squirrel.png'
import './Topbar.css'
import { useNavigate } from 'react-router-dom';

export default function Topbar(){
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path)
    }
    return(
        <div className="divTopbar">
            <img src={squirrel} alt='' className="iconTopbar"></img>
            <div className="divchildTopbar" style={{left:'80%'}} onClick={() => handleClick('/')}>
                <span className="spandivchildTopbar" style={{left:'21.5px', }}>HOME</span>
            </div>
            <div className="divchildTopbar" onClick={() => handleClick('/contactus')}><span                  className="spandivchildTopbar">CONTACT</span>
            </div>
        </div>
    )
}