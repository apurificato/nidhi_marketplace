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
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">BID COVE</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/about" className="nav-link" onClick={toggleMenu}>About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/item-sales" className="nav-link" onClick={toggleMenu}>For Sale</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/add-product" className="nav-link" onClick={toggleMenu}>Add Product</NavLink>
              </li>
              {loggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/dashboard" className="nav-link" onClick={toggleMenu}>Dashboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link text-light" onClick={() => { logout(() => toggleMenu()); }}>Logout</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink to="/auth" className="nav-link" onClick={toggleMenu}>Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

