import React, { useState } from 'react';
import '../../css/elements/navbar.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Asset 1.png';

const Navbar = ({ setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const handleNavigation = (path) => {
    setIsMenuOpen(false); // Close the menu
    window.scrollTo(0, 0); // Reset scroll position
    navigate(path);
  };
  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>☰</div>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <button className="back-button" onClick={toggleMenu}>← Back</button>
          <div className="shield-icon">
            <img src={logo} alt="SHIELD Society" className="logo" />
          </div>
        </div>
        <ul>
        <li onClick={() => handleNavigation("/")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.98,8.69L15.89,1.61c-2.15-2.14-5.63-2.14-7.78,0L1.03,8.69C.37,9.35,0,10.24,0,11.17v10.38c0,1.35,1.1,2.45,2.46,2.45h19.09c1.35,0,2.45-1.1,2.45-2.45v-10.38c0-.93-.37-1.82-1.02-2.47ZM21,21h-5v-3.18c0-2.11-1.71-3.82-3.82-3.82h-.36c-2.11,0-3.82,1.71-3.82,3.82v3.18H3v-9.83c0-.13.05-.26.15-.35l7.09-7.09c.98-.98,2.56-.98,3.54,0h0s7.09,7.09,7.09,7.09c.09.09.15.22.15.35v9.83h0Z" fill="currentColor" />
              </svg>
              Home
          </li>
          <li onClick={() => handleNavigation("/aboutus")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,0C5.37,0,0,5.37,0,12s5.37,12,12,12,12-5.37,12-12C23.99,5.38,18.62,0,12,0ZM12,21c-4.97,0-9-4.03-9-9S7.03,3,12,3s9,4.03,9,9c0,4.97-4.03,8.99-9,9Z" fill="currentColor"/>
              <path d="M11.55,9.55h-.3c-.81-.02-1.51.58-1.61,1.39-.05.81.55,1.52,1.36,1.59v4.65c0,.83.67,1.5,1.5,1.5s1.5-.67,1.5-1.5v-5.18c0-1.36-1.1-2.45-2.45-2.45ZM11.83,8.47c.95,0,1.72-.77,1.72-1.72s-.77-1.72-1.72-1.72c-.95,0-1.72.77-1.72,1.72h0c0,.95.77,1.72,1.71,1.72h0Z" fill="currentColor"/>
              </svg>
              About
          </li>
          <li onClick={() => handleNavigation("/members")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21,11h-5c-1.66,0-3,1.34-3,3v7c0,1.66,1.34,3,3,3h5c1.66,0,3-1.34,3-3v-7c0-1.66-1.34-3-3-3h0ZM17,14h3c.55,0,1,.45,1,1s-.45,1-1,1h-3c-.55,0-1-.45-1-1s.45-1,1-1ZM20,20h-3c-.55,0-1-.45-1-1s.45-1,1-1h3c.55,0,1,.45,1,1h0c0,.56-.45,1-1,1ZM9,12c3.31,0,6-2.69,6-6S12.31,0,9,0,3,2.69,3,6s2.69,6,6,6ZM9,3c1.65,0,3,1.35,3,3s-1.35,3-3,3-3-1.35-3-3,1.35-3,3-3ZM11,15.47c.02.83-.64,1.51-1.47,1.53l-1.05.02c-2.9.21-5.29,2.61-5.48,5.58-.05.79-.71,1.4-1.49,1.4-.03,0-.07,0-.1,0-.83-.06-1.45-.77-1.4-1.6.3-4.46,3.88-8.06,8.34-8.38l1.13-.02c.84-.05,1.51.64,1.53,1.47h0Z" fill="currentColor" />
              </svg>
              Members
          </li>
          <li onClick={() => handleNavigation("/faq")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12,16c.83,0,1.5.67,1.5,1.5,0,.83-.67,1.5-1.5,1.5s-1.5-.67-1.5-1.5c0-.83.67-1.5,1.5-1.5h0ZM13.4,13.02s.13-.28.57-.54c1.49-.88,2.26-2.53,1.97-4.19-.28-1.62-1.61-2.94-3.23-3.23-2.17-.37-4.2,1-4.63,3.14-.17.81.36,1.6,1.17,1.77.81.17,1.6-.36,1.77-1.17h0c.11-.54.64-.89,1.18-.78.38.07.72.41.79.79.11.65-.39,1-.54,1.1-1.4.83-1.8,1.93-1.87,2.15-.25.79.18,1.67.97,1.92.16.05.32.07.47.07.64,0,1.21-.41,1.4-1.02h0ZM24,18.5v-6.18c0-3.71-1.62-7.2-4.44-9.57C16.85.48,13.43-.43,9.91.19,4.61,1.12.56,5.52.05,10.89c-.31,3.31.73,6.47,2.95,8.9,2.44,2.68,6.09,4.21,10.03,4.21h5.47c3.03,0,5.5-2.47,5.5-5.5ZM17.63,5.06c2.14,1.81,3.38,4.47,3.37,7.27v6.18c0,1.38-1.12,2.5-2.5,2.5h-5.47c-3.1,0-5.95-1.18-7.81-3.23-1.64-1.8-2.41-4.15-2.18-6.6.38-3.96,3.48-7.34,7.39-8.02.53-.09,1.07-.14,1.6-.14,2.05,0,4.04.72,5.6,2.05h0Z" fill="currentColor" />
              </svg>
              FAQ
          </li>
          <li  className='logout-button' onClick={handleLogout}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8,21H3.41c-.23,0-.41-.18-.41-.41V3.41c0-.23.18-.41.41-.41h4.59c.83,0,1.5-.67,1.5-1.5S8.83,0,8,0H3.41C1.53,0,0,1.53,0,3.41v17.18c0,1.88,1.53,3.41,3.41,3.41h4.59c.83,0,1.5-.67,1.5-1.5s-.67-1.5-1.5-1.5Z" fill="currentColor"/>
              <path d="M22.68,8.82l-3.88-3.88c-.59-.59-1.54-.59-2.12,0s-.59,1.54,0,2.12l3.41,3.41-13.59.03c-.83,0-1.5.67-1.5,1.5s.67,1.5,1.5,1.5l13.65-.02-3.47,3.47c-.56.61-.53,1.56.08,2.12.58.54,1.47.54,2.05,0l3.88-3.88c1.76-1.76,1.76-4.61,0-6.36h0s0,0,0,0h0Z" fill="currentColor"/>
              </svg>
              Log Out
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
