import React from "react"
import Home from './Home/Home.js'
import Coding from './Subjects/Coding/Coding.js'
import Science from "./Subjects/Science/Science.js"
import Maths from './Subjects/Maths/Maths.js'
import Arts from './Subjects/Arts/Arts.js'
import JeeNeet from './Subjects/JeeNeet/JeeNeet.js'
import Contact from "./Contact/Contact.js"
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App(){
    return(
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/contactus' element={<Contact />}></Route>
                    <Route path='/coding' element={<Coding />}></Route>
                    <Route path='/science' element={<Science />}></Route>
                    <Route path='/maths' element={<Maths />}></Route>
                    <Route path='/arts' element={<Arts />}></Route>
                    <Route path='/jeeneet' element={<JeeNeet />}></Route>
                </Routes>
            </Router>
        </div>
    )
}