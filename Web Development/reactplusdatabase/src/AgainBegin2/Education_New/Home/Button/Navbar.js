/*import React from 'react';
import Button from './Button.js';
import { useLocation } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    const location = useLocation();

    return (
        <div className='divNavbar'>
            <Button to="/coding" text="Coding" active={location.pathname.startsWith('/coding')} />
            <Button to="/science" text="Science" active={location.pathname.startsWith('/science')} />
            <Button to='/maths' text='Maths' active={location.pathname.startsWith('/maths')} />
            <Button to='/english' text='English' active={location.pathname.startsWith('/english')} />
            <Button to='/iitjee' text='IIT-JEE' active={location.pathname.startsWith('/iitjee')} />
            <Button to='/neet' text='NEET' active={location.pathname.startsWith('/neet')} />
            <Button to='/gre' text='GRE' active={location.pathname.startsWith('/gre')} />
            <Button to='/foundation' text='Foundation' active={location.pathname.startsWith('/foundation')} />
        </div>
    );
}
export default Navbar;*/
import React, { useState } from 'react';
import Button from './Button.js';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='divNavbar'>
            {/* Hamburger menu icon */}
            <div className='hamburger' onClick={toggleMenu}>
                <div className={`bar ${menuOpen ? 'open' : ''}`} />
                <div className={`bar ${menuOpen ? 'open' : ''}`} />
                <div className={`bar ${menuOpen ? 'open' : ''}`} />
            </div>

            {/* Navigation links */}
            <div className={`navLinks ${menuOpen ? 'open' : ''}`}>
                <Button to="/coding" text="Coding" active={location.pathname.startsWith('/coding')} />
                <Button to="/science" text="Science" active={location.pathname.startsWith('/science')} />
                <Button to='/maths' text='Maths' active={location.pathname.startsWith('/maths')} />
                <Button to='/english' text='English' active={location.pathname.startsWith('/english')} />
                <Button to='/iitjee' text='IIT-JEE' active={location.pathname.startsWith('/iitjee')} />
                <Button to='/neet' text='NEET' active={location.pathname.startsWith('/neet')} />
                <Button to='/gre' text='GRE' active={location.pathname.startsWith('/gre')} />
                <Button to='/foundation' text='Foundation' active={location.pathname.startsWith('/foundation')} />
            </div>
        </div>
    );
}

export default Navbar;