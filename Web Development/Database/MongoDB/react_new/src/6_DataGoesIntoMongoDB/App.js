import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Axios from 'axios'
import Home from './Home.js'
import About from "./About";

Axios.defaults.baseURL='http://localhost:5000'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  );
}