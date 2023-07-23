import React from "react";
import Home from "./Home/Home";
import Subjects from './Subjects/Subjects.js'
import Contact from './Contact/Contact.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App(){
    return(
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/subjects' element={<Subjects />}></Route>
                    <Route path='/contactus' element={<Contact />}></Route>
                </Routes>
            </Router>
        </div>
    )
}