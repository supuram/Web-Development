import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './Home.js'

export default function App() {
  return (
    <BrowserRouter>
    <div>
      <h1>User Authentication Example</h1>
      <Routes>
        <Route path="/Home" element={<Home />} exact />
      </Routes>
    </div>
  </BrowserRouter>
  );
}