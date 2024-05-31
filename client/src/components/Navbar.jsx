import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedIn, user, logout } = useAuth(); // Destructure loggedIn, user, and logout from useAuth

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar-header">
      <div className="brand">
        <NavLink to="/" className="logo-link">
          <img src="react.svg" alt="Logo" className="logo" />
        </NavLink>

        <button className="hamburger" onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
          <NavLink to="/about" className="nav-link" onClick={toggleMenu}>About Us</NavLink>
          {loggedIn ? (
            <>
              <NavLink to="/dashboard" className="nav-link" onClick={toggleMenu}>Dashboard</NavLink>
              <button className="nav-link" onClick={() => { logout(() => toggleMenu()); }}>Logout</button>
            </>
          ) : (
            <NavLink to="/auth" className="nav-link" onClick={toggleMenu}>Login/Register</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;