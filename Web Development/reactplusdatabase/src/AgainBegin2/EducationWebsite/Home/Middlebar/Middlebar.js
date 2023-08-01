import React from "react";
import learning from './../../images/learning.png'
import './Middlebar.css'
import { Link } from 'react-router-dom'

export default function Middlebar(){
    return(
        <div className="divMiddlebar">
            <div className="childdivMiddlebar">
                <img src={learning} alt='' className="imgMiddlebar"></img>
                <div className="childdivchilddivMiddlebar">
                    <h2>Education for All</h2>
                    <p>Online education positively transforms the future, serving as the progressive path forward. With accessibility, flexibility, and global reach, it empowers learners worldwide, bridging gaps and enabling lifelong learning, revolutionizing education.</p>
                </div>
            </div>
            <button className="buttonMiddlebar1"><Link to='/contactus' className="navButton">BOOK TRIAL</Link></button>
        </div>
    )
}