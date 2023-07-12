import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Axios from 'axios'
import Home from './LoggedOutHomePage.js'
import LogInHome from "./LoggedInHomePage.js";
import About from "./About";
import Login_Page from "./Login_Page.js";
import Register_Page from "./Register_Page.js";

Axios.defaults.baseURL='http://localhost:5000'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/LoginPage" element={<Login_Page/>} />
        <Route path="/RegisterPage" element={<Register_Page/>} />
        <Route path="/LoggedInHomePage" element={<LogInHome/>} />
      </Routes>
    </Router>
  );
}