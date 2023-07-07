import React, { useState } from 'react';
import Top from './Top'
import './LeftSide.css'

const ListItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={`toggle-list ${isOpen ? 'open' : ''}`} onClick={toggleList}>
      <span className="arrow">{isOpen ? '▼' : '▶'}</span> {title}
      {isOpen && <ul className="nested-list">{children}</ul>}
    </li>
  );
};

const LeftSide = () => {
  return (
    <>
    <Top/>
    <ul>
      <ListItem title="Quick Start">
        <li>Tutorial: Tic-Tac-Toe</li>
        <li>Thinking in React</li>
      </ListItem>
      <ListItem title="Installation">
        <li>Start a New React Project</li>
        <li>Add React to an existing Project</li>
        <li>Editor Setup</li>
        <li>React Developer Tools</li>
      </ListItem>
    </ul>
    </>
  );
};

export default LeftSide;