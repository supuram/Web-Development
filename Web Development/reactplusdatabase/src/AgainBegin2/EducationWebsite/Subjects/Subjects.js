import React, { useState} from "react";
import './Subjects.css'
import Coding from './Coding.js'
import Science from './Science.js'
import Maths from './Maths.js'
import English from './English.js'

export default function Subjects(){
    return(
        <div>
            <ul className="ulSubjects">
                <li>Coding</li>
                <li>Science</li>
                <li>Maths</li>
                <li>English</li>
            </ul>
        </div>
    )
}