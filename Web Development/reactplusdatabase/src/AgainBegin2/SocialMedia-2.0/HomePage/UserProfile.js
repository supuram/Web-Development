import React, { useState, useEffect, useRef } from "react";
import UserProfileDashBoard from './UserProfileDashBoard.js';
import './UserProfile.css';

const UserProfile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const subMenuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState.isVisible);
  };

  return (
    <div className={`divUserProfile ${isVisible ? 'visible' : ''}`}>
      <button className="buttonUserProfile" onClick={toggleVisibility}>Profile</button>
      {isVisible && (
        <UserProfileDashBoard ref={subMenuRef} style={{display:'block'}}/>
      )}
    </div>
  );
};
export default UserProfile;