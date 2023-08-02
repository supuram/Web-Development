/**
import React from 'react';
import Button from './Button.js';

function Navbar({ activeButton, onButtonClick }) {
  return (
    <div>
      <Button to="/coding" text="Coding" active={activeButton === '/coding'} onClick={() => onButtonClick('/coding')} />
      <Button to="/science" text="Science" active={activeButton === '/science'} onClick={() => onButtonClick('/science')} />
      <Button to='/maths' text='Maths' active={activeButton === '/maths'} onClick={() => onButtonClick('/maths')} />
      <Button to='/english' text='English' active={activeButton === '/english'} onClick={() => onButtonClick('/english')} />
      <Button to='/iitjee' text='IIT-JEE' active={activeButton === '/iitjee'} onClick={() => onButtonClick('/iitjee')} />
      <Button to='/neet' text='NEET' active={activeButton === '/neet'} onClick={() => onButtonClick('/neet')} />
      <Button to='/gre' text='GRE' active={activeButton === '/gre'} onClick={() => onButtonClick('/gre')} />
      <Button to='/foundation' text='Foundation' active={activeButton === '/foundation'} onClick={() => onButtonClick('/foundation')} />
    </div>
  );
}

export default Navbar;
 */

/**
*! activeButton: This is the state variable that holds the value of the currently active link. It is initialized with the value of location.pathname, which is the current URL path obtained from the useLocation() hook provided by react-router-dom. This sets the initial active link based on the current route.
*/


 
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
