import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedIn, setLoggedIn } = useAuth(); // Access the loggedIn state and setter

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLoginStatus = () => {
    setLoggedIn(!loggedIn); // Toggle the login status for demonstration
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
          {loggedIn && (
            <NavLink to="/dashboard" className="nav-link" onClick={toggleMenu}>Dashboard</NavLink>
          )}
          <NavLink to="/auth" className="nav-link" onClick={toggleLoginStatus}>
            {loggedIn ? 'Logout' : 'Login/Register'}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

