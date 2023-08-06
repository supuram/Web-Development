// Button.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'

function Button({ to, text, active }) {
  return (
    <Link to={to} className={active ? 'nav-link active' : 'nav-link'}>
      {text}
    </Link>
  );
}
export default Button;