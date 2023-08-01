import React, { useState } from 'react';
import Button from './Button.js';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  return (
    <div>
      <Button to="/coding" text="Coding" active={activeButton === '/coding'} />
      <Button to="/science" text="Science" active={activeButton === '/science'} />
      <Button to='/maths' text='Maths' active={activeButton === '/maths'} />
      <Button to='/english' text='English' active={activeButton === '/english'} />
      <Button to='/iitjee' text='IIT-JEE' active={activeButton === '/iitjee'} />
      <Button to='/neet' text='NEET' active={activeButton === '/neet'} />
      <Button to='/gre' text='GRE' active={activeButton === '/gre'} />
      <Button to='/foundation' text='Foundation' active={activeButton === '/foundation'} />
    </div>
  );
}
export default Navbar;

/**
*! activeButton: This is the state variable that holds the value of the currently active link. It is initialized with the value of location.pathname, which is the current URL path obtained from the useLocation() hook provided by react-router-dom. This sets the initial active link based on the current route.
*/