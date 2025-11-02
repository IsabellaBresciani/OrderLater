import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Adjust the path to your AuthContext file

const NavBar = ({ role }) => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand/Logo that redirects to home */}
        <Link className="navbar-brand" to="/">
          Order Later
        </Link>

        {/* Hamburger Button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsable Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* --- Menu for Client (user) --- */}
            {role === 'user' && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/shops">
                    Shops
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/orders">
                    Mis Órdenes
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/settings">
                    Configuración
                  </NavLink>
                </li>
              </>
            )}

            {/* --- Menu for Owner (business_owner) --- */}
            {role === 'business_owner' && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/shops">
                    Mis Comercios
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/settings">
                    Configuración
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
