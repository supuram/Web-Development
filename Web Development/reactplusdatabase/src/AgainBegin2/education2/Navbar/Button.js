import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'

export default function Button({ to, text, active }) {
  return (
    <Link to={to} className={active ? 'nav-link active' : 'nav-link'}>
      {text}
    </Link>
  );
}