import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Ad from './../GiveAd/Ad.js'
import VerifiedAd from './../GiveVerifiedAd/VerifiedAd.js'
import Home from './Home.js'
import Axios from 'axios'
Axios.defaults.baseURL='http://localhost:5000'

export default function App(){
    return(
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/giveinfo' element={<Ad />}></Route>
                    <Route path='/giveinfoverified' element={<VerifiedAd />}></Route>
                </Routes>
            </Router>
        </div>
    )
}