import React, { useState } from 'react';
import Button from './Button.js';
import { useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const [activeButton, setActiveButton] = useState(location.pathname);

    return (
        <div>
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
export default Navbar;
