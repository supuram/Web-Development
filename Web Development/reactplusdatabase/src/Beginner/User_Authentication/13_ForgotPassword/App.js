import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Axios from 'axios'
import Home from './LoggedOutHomePage.js'
import LogInHome from "./LoggedInHomePage.js";
import About from "./About";
import Login_Page from "./Login_Page.js";
import Register_Page from "./Register_Page.js";
import VerifyEmailPage from './verifyEmail.js'
import ForgotPassword from './ForgotPassword.js'
import PasswordResetPage from './PasswordResetPage.js'
import VerifyForgotPasswordEmail from './VerifyForgotPasswordEmail.js'
import EmailContext from './EmailContext';

Axios.defaults.baseURL='http://localhost:5000'

export default function App() {
  const [email, setEmail] = useState('');
  return (
    <Router>
      <EmailContext.Provider value={{ email, setEmail }}>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/LoginPage" element={<Login_Page/>} />
        <Route path="/RegisterPage" element={<Register_Page/>} />
        <Route path="/LoggedInHomePage" element={<LogInHome/>} />
        <Route path="/verify/:token" element={<VerifyEmailPage/>} />
        <Route path='/ForgotPassword' element={<ForgotPassword/>} />
        <Route path='/PasswordResetPage' element={<PasswordResetPage />} />
        <Route path="/verify-forgot-password-email/:token" element={<VerifyForgotPasswordEmail />} />
      </Routes>
      </EmailContext.Provider>
    </Router>
  );
}