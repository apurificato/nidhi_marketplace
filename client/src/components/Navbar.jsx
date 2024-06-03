import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedIn, user, logout } = useAuth(); // Destructure loggedIn, user, and logout from useAuth

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar-header bg-body-info">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="Nidhi-logo.svg" height="60" alt=""/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/about" className="nav-link" onClick={toggleMenu}>About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/item-sales" className="nav-link" onClick={toggleMenu}>Buy Items</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/add-product" className="nav-link" onClick={toggleMenu}>Sell Item</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link" onClick={toggleMenu}>Account</NavLink>
              </li>
            </ul>
            {loggedIn ? (
                <>
                    <button className="btn btn-dark px-4 py-2" onClick={() => { logout(() => toggleMenu()); }}>Logout</button>
                </>
              ) : (
                  <NavLink to="/auth" className="btn btn-dark px-4 py-2" onClick={toggleMenu}>Login</NavLink>
              )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

