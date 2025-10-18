import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ role }) => {
  const ownerShops = ['Mi Negocio 1', 'Super Negocio', 'Tienda Rápida'];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand/Logo que redirige al inicio */}
        <Link className="navbar-brand" to="/">Order Later</Link>

        {/* Botón Hamburguesa para móvil */}
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

        {/* Contenido Colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* --- Menú para Cliente (user) --- */}
            {role === 'user' && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/shops">Shops</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-orders">Mis Órdenes</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/settings">Configuración</NavLink>
                </li>
              </>
            )}

            {/* --- Menú para Owner (business_owner) --- */}
            {role === 'business_owner' && (
              <>
                {ownerShops.map((shopName) => (
                  <li className="nav-item" key={shopName}>
                    <NavLink
                      className="nav-link"
                      to={`/shop/${shopName.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {shopName}
                    </NavLink>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
