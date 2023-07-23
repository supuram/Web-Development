import React from "react";
import learning from './../../images/learning.png'
import './Middlebar.css'

export default function Middlebar(){
    return(
        <div className="divMiddlebar">
            <div className="childdivMiddlebar">
                <img src={learning} alt='' className="imgMiddlebar"></img>
                <div className="childdivchilddivMiddlebar">
                    <h2>Education for All</h2>
                    <p>And we must evolve alongside it. We believe that effective education is rooted in proper understanding of the subject material, and subsequent application in real-world scenarios.</p>
                </div>
            </div>
            <button className="buttonMiddlebar">BOOK TRIAL</button>
        </div>
    )
}