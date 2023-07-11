import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './LoginPage2';
import Register from './RegisterPage2';

export default function Home(){
    return(
        <div>
            <h1>Hi Welcome</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}